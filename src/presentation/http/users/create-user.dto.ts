import { ApiProperty } from '@nestjs/swagger';
import { Length, IsEmail } from 'class-validator';
export namespace CreateUserDto {
  export class Request {
    @ApiProperty({
      required: true,
      example: 'joneco@hotmail.com',
      description: 'First Name of the User'
    })
    @IsEmail()
    email: string;

    @ApiProperty({
      required: true,
      example: 'senhaUltraMegaSuperSegura01',
      description: 'First Name of the User'
    })
    @Length(6, 22, { message: 'Password must have between 6 to 22 characters' })
    password: string;

    @ApiProperty({
      required: true,
      example: 'Jonas',
      description: 'First Name of the User'
    })
    @Length(2, 15)
    first_name: string;

    @ApiProperty({
      required: true,
      example: 'Nunes',
      description: 'First Name of the User'
    })
    @Length(2, 25)
    last_name: string;
  }

  export class Response {
    status: 'ok';
    email: string;
    first_name: string;
    last_name: string;
  }
}
