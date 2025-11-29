import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prismaService";
import { CreateCommentDto } from "./dto/createCommentDto";
@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) { }
  async create(userId: string, postId: string, dto: CreateCommentDto) {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });
    if (!post) throw new NotFoundException("Post Not Found");
    if (dto.parentId) {
      const parent = await this.prisma.comment.findUnique({
        where: { id: dto.parentId },
      });
      if (!parent) throw new NotFoundException("Parent Comment Not Found");
    }
    return this.prisma.comment.create({
      data: {
        content: dto.content,
        postId,
        userId,
        parentId: dto.parentId || null,
      },
      include: { user: true, replies: true },
    });
  }
  async findByPost(postId: string) {
    return this.prisma.comment.findMany({
      where: { postId, parentId: null },
      include: {
        user: true,
        replies: {
          include: { user: true },
        },
      },
      orderBy: { createdAt: "asc" },
    });
  }
}