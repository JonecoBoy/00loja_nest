import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsUUID,
  Length,
  UUIDVersion
} from 'class-validator';
import { Role } from '@prisma/client';

export namespace UpdateUserDto {
  export class RequestParam {
    @ApiProperty({
      required: true,
      example: '057e0255-e3fa-4a6f-8101-510c8e6b060b',
      description: 'User ID - uuid'
    })
    @IsUUID()
    id: string;
  }
  export class RequestBody {
    @ApiProperty({
      required: false,
      example: 'joneco@hotmail.com',
      description: 'First Name of the User'
    })
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiProperty({
      required: false,
      example: 'senhaUltraMegaSuperSegura01',
      description: 'First Name of the User'
    })
    @Length(6, 22, { message: 'Password must have between 6 to 22 characters' })
    @IsOptional()
    password?: string;

    @ApiProperty({
      required: false,
      example: 'Jonas',
      description: 'First Name of the User'
    })
    @Length(2, 15)
    @IsOptional()
    first_name?: string;

    @ApiProperty({
      required: false,
      example: 'Nunes',
      description: 'First Name of the User'
    })
    @Length(2, 25)
    @IsOptional()
    last_name?: string;
  }
  export class Response {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    roles: Role[];
  }
}
