import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prismaService";
import { UpdateUserDto } from "./dto/updateUserDto";
import * as bcrypt from "bcrypt";
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }
  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });
    if (!user) throw new NotFoundException("User not found");
    return user;
  }
  async updateMe(userId: string, dto: UpdateUserDto) {
    const updateData: { name?: string; password?: string } = {
      name: dto.name,
    };
    if (dto.password) {
      const hash = await bcrypt.hash(dto.password, 10);
      updateData.password = hash;
    }
    return this.prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }
}