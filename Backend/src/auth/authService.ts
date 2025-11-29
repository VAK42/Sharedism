import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prismaService";
import { RegisterDto } from "./dtos/authDto";
import { User } from "@prisma/client";
import { hash, compare } from "bcrypt";
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) { }
  register = async (userData: RegisterDto): Promise<User> => {
    const user: User | null = await this.prismaService.user.findUnique({
      where: {
        email: userData.email,
      },
    });
    if (user) {
      throw new HttpException(
        { message: "Email Already In Use" },
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await hash(userData.password, 10);
    const res = await this.prismaService.user.create({
      data: { ...userData, password: hashPassword },
    });
    return res;
  };
  login = async (data: {
    email: string;
    password: string;
  }): Promise<{ accessToken: string; refreshToken: string }> => {
    const user: User | null = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      throw new HttpException(
        { message: "Account Not Found" },
        HttpStatus.UNAUTHORIZED,
      );
    }
    const verify = await compare(data.password, user.password);
    if (!verify) {
      throw new HttpException(
        { message: "Incorrect Password" },
        HttpStatus.UNAUTHORIZED,
      );
    }
    const payload = { id: user.id, name: user.name, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: "1ba64dd24667468c1c763d111d7d37db2028e9f53a0c1626792dd4d3472c30ee7fb80d8b5681aea49dbb5ee338757607d486d08cf2fa759b25e5eb597e8b44f9",
      expiresIn: "1h",
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: "1ba64dd24667468c1c763d111d7d37db2028e9f53a0c1626792dd4d3472c30ee7fb80d8b5681aea49dbb5ee338757607d486d08cf2fa759b25e5eb597e8b44f9",
      expiresIn: "7d",
    });
    return {
      accessToken,
      refreshToken,
    };
  };
}