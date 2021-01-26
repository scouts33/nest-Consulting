import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { SignInDTO, SignUpDTO } from './user.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(signUpDTO: SignUpDTO): Promise<User> {
    const { name, password, age, email, mobile, sex } = signUpDTO;

    const salt = await bcrypt.genSalt();
    const user = new User();
    user.name = name;
    user.password = await this.hashPassword(password, salt);
    user.email = email;
    user.age = age;
    user.mobile = mobile;
    user.sex = sex;
    user.salt = salt;
    try {
      await user.save();
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('이미 사용중인 email 입니다.');
      }
      throw new InternalServerErrorException();
    }
    return user;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async signIn(signinDTO: SignInDTO): Promise<User> {
    const { email, password } = signinDTO;
    const user = await this.findOne({ email });
    if (user && (await user.validatePassword(password))) {
      return user;
    }

    return null;
  }
}
