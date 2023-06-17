import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  Validate,
} from 'class-validator';

import { EmailUniqueValidator } from 'src/core/validators';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  name: string;
}

export interface LoginResponse {
  status: number;
  error: string[];
  token: string;
}

export interface ValidateRequest {
  id: string;
}

export class RegisterRequestDto implements RegisterRequest {
  @Validate(EmailUniqueValidator)
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  public readonly email: string;

  @IsString()
  @IsNotEmpty()
  public readonly name: string;
}

export class LoginRequestDto implements LoginRequest {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  public readonly email: string;

  @IsString()
  @IsNotEmpty()
  public readonly password: string;
}

export class ValidateRequestDto implements ValidateRequest {
  @IsString()
  @IsUUID()
  public readonly id: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export class AuthUserDto implements AuthUser {
  public readonly id: string;
  public readonly email: string;
  public readonly name: string;
}
