import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './model/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInDTO, SignUpDTO } from './model/user.dto';
import { User } from './model/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDTO: SignUpDTO): Promise<User> {
    return await this.userRepository.signUp(signUpDTO);
  }

  async signIn(signinDTO: SignInDTO): Promise<{ accessToken: string }> {
    const user = await this.userRepository.signIn(signinDTO);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const userId = user.id;
    const accessToken = await this.jwtService.sign({ userId });

    return { accessToken };
  }
}
