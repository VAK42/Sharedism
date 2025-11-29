import { Module } from "@nestjs/common";
import { PostsService } from "./postsService";
import { PostsController } from "./postsController";
import { PrismaService } from "../prisma/prismaService";
@Module({
  controllers: [PostsController],
  providers: [PostsService, PrismaService],
})
export class PostsModule { }