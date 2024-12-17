import { Injectable } from '@nestjs/common';
import { AuthService } from '../services/auth.service';


@Injectable()
export default class SignInUc {
  constructor(private readonly authService: AuthService) {}

  async execute(idToken: string) {
    const jwtToken = await this.authService.authenticateWithGoogle(idToken);
    return jwtToken;
  }
}
