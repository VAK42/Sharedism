import { Module, ValidationPipe } from "@nestjs/common";
import { AuthModule } from "./auth/authModule";
import { APP_PIPE } from "@nestjs/core";
import { UsersModule } from "./users/usersModule";
import { PrismaModule } from "./prisma/prismaModule";
import { PostsModule } from "./posts/postsModule";
import { CommentsModule } from "./comments/commentsModule";
@Module({
  imports: [AuthModule, UsersModule, PrismaModule, PostsModule, CommentsModule],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule { }