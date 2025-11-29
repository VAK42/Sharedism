import { Controller, Post, Body, Req, Res } from "@nestjs/common";
import { AuthService } from "./authService";
import { RegisterDto, LoginDto } from "./dtos/authDto";
import { User } from "@prisma/client";
import { Request, Response } from "express";
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) { }
  @Post("register")
  register(@Body() body: RegisterDto): Promise<User> {
    return this.authService.register(body);
  }
  @Post("login")
  login(@Body() body: LoginDto): Promise<any> {
    return this.authService.login(body);
  }
  @Post("logout")
  logout(@Req() req: Request, @Res() res: Response) {
    return res.status(200).json({ message: "Logged Out Successfully" });
  }
}