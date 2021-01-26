import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO, SignUpDTO } from './model/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async signUp(@Body(ValidationPipe) signupDTO: SignUpDTO) {
    return await this.authService.signUp(signupDTO);
  }

  @Post('/sign-in')
  async signIn(
    @Body(ValidationPipe) signInDTO: SignInDTO,
  ): Promise<{ accessToken: string }> {
    return await this.authService.signIn(signInDTO);
  }

}
