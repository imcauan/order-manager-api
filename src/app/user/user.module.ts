import { forwardRef, Module } from "@nestjs/common";
import { CryptoModule } from "src/infra/crypto/Crypto.module";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { PrismaModule } from "src/infra/prisma/prisma.module";
import { AuthModule } from "../auth/auth.module";

@Module({
    imports: [CryptoModule, PrismaModule, forwardRef(() => AuthModule)],
    controllers: [UserController],
    exports: [UserService],
    providers: [UserService]
})
export class UserModule {}