import { IsEmail, IsString, MaxLength } from 'class-validator';
const STRING_MAX_LENGTH = 255;

export class CreateUserDto {
  @IsEmail()
  @MaxLength(STRING_MAX_LENGTH)
  email: string;

  @IsString()
  @MaxLength(STRING_MAX_LENGTH)
  name: string;
}
