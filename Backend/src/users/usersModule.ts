import { Module } from "@nestjs/common";
import { UsersService } from "./usersService";
import { UsersController } from "./usersController";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "../auth/jwtStrategy";
@Module({
  imports: [JwtModule.register({})],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
})
export class UsersModule { }