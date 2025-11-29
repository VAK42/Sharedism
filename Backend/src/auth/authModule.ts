import { Module } from "@nestjs/common";
import { AuthService } from "./authService";
import { AuthController } from "./authController";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwtStrategy";
import { PassportModule } from "@nestjs/passport";
@Module({
  imports: [PassportModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule { }