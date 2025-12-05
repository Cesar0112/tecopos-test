import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterDto {
    @ApiProperty({ example: 'user@example.com', description: 'Correo electrónico' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'StrongP@ssw0rd', description: 'Contraseña' })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}

export class LoginDto extends RegisterDto {

}