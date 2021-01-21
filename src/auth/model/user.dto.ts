import { IsEmail, IsEmpty, IsInt, IsString, Max, Min } from 'class-validator';

export enum Sex {
  MALE = 0,
  FEMALE = 1,
}

export class signInDTO {
  @IsEmail()
  email: string;

  @IsString()
  @IsEmpty()
  @Min(8)
  @Max(16)
  password: string;
}

export class signUpDTO {
  @IsEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsEmpty()
  @Min(8)
  @Max(16)
  password: string;

  @IsString()
  @IsEmpty()
  @Min(2)
  @Max(4)
  name: string;

  @IsInt()
  @IsEmpty()
  @Min(10)
  @Max(11)
  mobile: number;

  @IsInt()
  @IsEmpty()
  @Max(2)
  age: number;

  @IsString()
  @IsEmpty()
  sex: Sex;
}
