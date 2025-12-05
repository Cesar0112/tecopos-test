import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterDto {
    @ApiProperty({ example: 'user@example.com', description: 'Correo electrónico' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'StrongP@ssw0rd', description: 'Contraseña' })
    @IsString()
    @MinLength(8)
    password: string;
}

export class LoginDto extends RegisterDto {

}