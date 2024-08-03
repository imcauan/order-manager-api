import { Module } from "@nestjs/common";
import { MealsController } from "./meals.controller";
import { MealsService } from "./meals.service";
import { PrismaModule } from "src/infra/prisma/prisma.module";
import { FileModule } from "../file/file.module";
import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../user/user.module";

@Module({
    imports: [PrismaModule, FileModule, AuthModule, UserModule],
    controllers: [MealsController],
    exports: [MealsService],
    providers: [MealsService]
})
export class MealsModule {}