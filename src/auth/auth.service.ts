import { Injectable } from '@nestjs/common';
import { UserRepository } from './model/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDTO } from './model/user.dto';
import { User } from './model/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async signUp(signUpDTO: SignUpDTO): Promise<User> {
    return await this.userRepository.signUp(signUpDTO);
  }
}
