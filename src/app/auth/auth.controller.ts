import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";
import { User } from "src/decorators/user.decorator";
import { AuthGuard } from "src/guards/auth.guard";
import { AuthLoginDto } from "./dtos/auth-login.dto";
import { AuthRegisterDto } from "./dtos/auth-register.dto";

@Controller("auth")
export class AuthController {
    constructor (
        private readonly authService: AuthService,
    ) {}

    @Post("signin")
    async login(@Body() body: AuthLoginDto) {
        return this.authService.login(body);
    }

    @Post("signup")
    async register(@Body() body: AuthRegisterDto) {
        return this.authService.register(body);
    }

    // @Post("forget")
    // async forget(@Body() body: AuthForgetDto) {
    //     return this.authService.forget(body.email);
    // }

    // @Post("reset")
    // async reset(@Body() body: AuthResetDto) {
    //     return this.authService.reset(body.password, body.token);
    // }

    @UseGuards(AuthGuard)
    @Post("me")
    async me(@User() user) {
        return {
            me: 'ok',
            user
        };
    }
}