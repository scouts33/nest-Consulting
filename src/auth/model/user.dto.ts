import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export enum Sex {
  male, //남성
  female, //여성
}

export class SignInDTO {
  @IsEmail()
  @IsNotEmpty({ message: 'email은 필수값입니다.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'password는 필수값입니다.' })
  @MinLength(8)
  @MaxLength(16)
  password: string;
}

export class SignUpDTO extends SignInDTO {
  @IsString()
  @IsNotEmpty({ message: '이름은 필수값입니다.' })
  @MinLength(2, { message: '최소 길이는 2자 이상입니다.' })
  @MaxLength(4, { message: '최대 길이는 4자 이하입니다.' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: '핸드폰 번호는 필수값 입니다.' })
  @MinLength(10, { message: '최소 길이는 10자 이상입니다.' })
  @MaxLength(11, { message: '최대 길이는 11자 이하입니다.' })
  mobile: string;

  @IsInt()
  @IsNotEmpty({ message: '나이는 필수값 입니다.' })
  @Min(13, { message: '최소 나이는 1살 보다 많아야 합니다.' })
  @Max(99, { message: '나이는 99세 미만이어야 합니다.' })
  age: number;

  @IsInt()
  @IsNotEmpty({
    message: '남자, 여자중 하나의 성을 가저야합니다. 중간은없어 새끼야.',
  })
  sex: Sex;
}
