import { Controller, Post, Body, Param, UseGuards, Req, Get } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwtAuthGuard";
import { CommentsService } from "./commentsService";
import { CreateCommentDto } from "./dto/createCommentDto";
import { Request } from "express";
@Controller("posts/:postId/comments")
export class CommentsController {
  constructor(private commentsService: CommentsService) { }
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Req() req: Request,
    @Param("postId") postId: string,
    @Body() dto: CreateCommentDto,
  ) {
    const user = req.user as { id: string };
    return this.commentsService.create(user.id, postId, dto);
  }
  @Get()
  findByPost(@Param("postId") postId: string) {
    return this.commentsService.findByPost(postId);
  }
}