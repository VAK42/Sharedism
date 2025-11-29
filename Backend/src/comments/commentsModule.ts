import { Module } from "@nestjs/common";
import { CommentsService } from "./commentsService";
import { CommentsController } from "./commentsController";
import { PrismaService } from "../prisma/prismaService";
@Module({
  controllers: [CommentsController],
  providers: [CommentsService, PrismaService],
})
export class CommentsModule { }