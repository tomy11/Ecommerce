export class RegisterDto {
  name?: string;
  email?: string;
  password?: string;
  isActive?: boolean;
}

export class LoginDto {
  email?: string;
  password?: string;
}
