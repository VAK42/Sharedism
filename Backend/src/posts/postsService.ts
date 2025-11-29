import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prismaService";
import { CreatePostDto } from "./dto/createPostDto";
import { PostStatus } from "@prisma/client";
@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) { }
  async create(userId: string, dto: CreatePostDto) {
    const tags = dto.tags || [];
    const tagRecords: { id: string }[] = await Promise.all(
      tags.map((name) =>
        this.prisma.tag.upsert({
          where: { name },
          update: {},
          create: { name },
        }),
      ),
    );
    return this.prisma.post.create({
      data: {
        title: dto.title,
        content: dto.content,
        status: dto.status || PostStatus.Draft,
        userId,
        postTags: {
          create: tagRecords.map((tag) => ({
            tagId: tag.id,
          })),
        },
      },
      include: { postTags: { include: { tag: true } } },
    });
  }
  async findAll(page = 1, pageSize = 10) {
    const [posts, total] = await Promise.all([
      this.prisma.post.findMany({
        where: { status: PostStatus.Published },
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { createdAt: "desc" },
        include: { user: true, postTags: { include: { tag: true } } },
      }),
      this.prisma.post.count({ where: { status: PostStatus.Published } }),
    ]);
    return { posts, total, page, pageSize };
  }
  async findOne(id: string) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        user: true,
        postTags: { include: { tag: true } },
        comments: true,
      },
    });
    if (!post || post.status !== PostStatus.Published)
      throw new NotFoundException("Post Not Found");
    return post;
  }
  async update(userId: string, id: string, dto: CreatePostDto) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) throw new NotFoundException("Post Not Found");
    if (post.userId !== userId) throw new ForbiddenException("Not Your Post");
    let postTagsData: { create: any } | undefined = undefined;
    if (dto.tags) {
      const tagRecords: { id: string }[] = await Promise.all(
        dto.tags.map((name) =>
          this.prisma.tag.upsert({
            where: { name },
            update: {},
            create: { name },
          }),
        ),
      );
      await this.prisma.postTag.deleteMany({ where: { postId: id } });
      postTagsData = {
        create: tagRecords.map((tag) => ({
          tagId: tag.id,
        })),
      };
    }
    return this.prisma.post.update({
      where: { id },
      data: {
        title: dto.title,
        content: dto.content,
        status: dto.status,
        ...(postTagsData && { postTags: postTagsData }),
      },
      include: { postTags: { include: { tag: true } } },
    });
  }
  async remove(userId: string, id: string) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) throw new NotFoundException("Post Not Found");
    if (post.userId !== userId) throw new ForbiddenException("Not Your Post");
    await this.prisma.postTag.deleteMany({ where: { postId: id } });
    await this.prisma.comment.deleteMany({ where: { postId: id } });
    return this.prisma.post.delete({ where: { id } });
  }
  async search(q: string, page = 1, pageSize = 10) {
    const where = q
      ? {
        status: PostStatus.Published,
        OR: [{ title: { contains: q } }, { content: { contains: q } }],
      }
      : { status: PostStatus.Published };
    const [posts, total] = await Promise.all([
      this.prisma.post.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { createdAt: "desc" },
        include: { user: true, postTags: { include: { tag: true } } },
      }),
      this.prisma.post.count({ where }),
    ]);
    return { posts, total, page, pageSize };
  }
}