import { TokenPayload } from 'google-auth-library';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import GoogleOAuthRepository from '../repositories/google-oauth.repository';
import UserRepository from '../repositories/user.repository';
import { JwtService } from '@infra/services/jwt/services/jwt.service';

@Injectable()
export class AuthService {
  constructor(private readonly googleOAuthRepository: GoogleOAuthRepository, private readonly userRepository: UserRepository, private readonly jwtService: JwtService) {}

  // 체크 후 토큰 발급하는 이름으로 변경
  async authenticateWithGoogle(idToken: string) {
    const userInfo = await this.googleOAuthRepository.getUserInfoByGoogleIdToken(idToken);

    // const user = await this.userRepository.getUserByEmail(userInfo.email);
    // if (!user) {
    //   await this.createOrGetUser(userInfo);
    // }

    const jwtToken = this.jwtService.generate(userInfo);
    return jwtToken;
  }

  async createOrGetUser(userInfo: TokenPayload) {}

  async refreshToken(refreshToken: string): Promise<string> {
    try {
      // 리프레시 토큰 검증
      const payload = this.jwtService.verify(refreshToken);
      
      if (!payload.sub) {
        throw new UnauthorizedException('유효하지 않은 토큰입니다.');
      }

      // 새로운 액세스 토큰 발급
      return this.jwtService.refreshAccessToken(payload.sub);
    } catch (error) {
      throw new UnauthorizedException('토큰 갱신에 실패했습니다.');
    }
  }

}
