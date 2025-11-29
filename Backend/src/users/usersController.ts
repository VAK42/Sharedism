import { Controller, Get, Patch, Body, UseGuards, Req } from "@nestjs/common";
import { UsersService } from "./usersService";
import { JwtAuthGuard } from "../auth/jwtAuthGuard";
import { Request } from "express";
import { UpdateUserDto } from "./dto/updateUserDto";
@Controller("users")
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  @Get("me")
  getMe(@Req() req: Request) {
    const user = req.user as { id: string };
    return this.usersService.getMe(user.id);
  }
  @Patch("me")
  updateMe(@Req() req: Request, @Body() dto: UpdateUserDto) {
    const user = req.user as { id: string };
    return this.usersService.updateMe(user.id, dto);
  }
}