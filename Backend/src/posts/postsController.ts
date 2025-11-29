import { Controller, Post, Body, UseGuards, Req, Get, Query, Param, Patch, Delete } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwtAuthGuard";
import { PostsService } from "./postsService";
import { CreatePostDto } from "./dto/createPostDto";
import { Request } from "express";
@Controller("posts")
export class PostsController {
  constructor(private postsService: PostsService) { }
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: Request, @Body() dto: CreatePostDto) {
    const user = req.user as { id: string };
    return this.postsService.create(user.id, dto);
  }
  @Get()
  findAll(@Query("page") page = 1, @Query("pageSize") pageSize = 10) {
    return this.postsService.findAll(Number(page), Number(pageSize));
  }
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.postsService.findOne(id);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(
    @Req() req: Request,
    @Param("id") id: string,
    @Body() dto: CreatePostDto,
  ) {
    const user = req.user as { id: string };
    return this.postsService.update(user.id, id, dto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Req() req: Request, @Param("id") id: string) {
    const user = req.user as { id: string };
    return this.postsService.remove(user.id, id);
  }
  @Get("search")
  search(
    @Query("q") q: string,
    @Query("page") page = 1,
    @Query("pageSize") pageSize = 10,
  ) {
    return this.postsService.search(q, Number(page), Number(pageSize));
  }
}