import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { JwtModule } from "@nestjs/jwt";
import { ENV } from "src/common/constants";

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>(ENV.JWT_SECRET),
        signOptions: { expiresIn: configService.get<string>(ENV.JWT_EXPIRE) },
      }),
      inject: [ConfigService],
    }),
    CqrsModule,
  ],
  exports: [JwtModule, CqrsModule],
})
export class GlobalModule {}
