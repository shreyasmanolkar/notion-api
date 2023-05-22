import jwt from 'jsonwebtoken';
import { JWTVerifier } from '@application/interfaces/cryptography/JWTVerifier';
import { JWTGenerator } from '@application/interfaces/cryptography/JWTGenerator';

export class JWTAdapter implements JWTGenerator, JWTVerifier {
  constructor(
    private readonly accessTokenSecret: string,
    private readonly refreshTokenSecret: string
  ) {}

  async generateAccessToken(payload: string): Promise<string> {
    return jwt.sign({ userId: payload }, this.accessTokenSecret, {
      expiresIn: '15m',
    });
  }

  async generateRefreshToken(payload: string): Promise<string> {
    return jwt.sign({ userId: payload }, this.refreshTokenSecret);
  }

  async verifyAccessToken(token: string): Promise<string | null> {
    try {
      return jwt.verify(token, this.accessTokenSecret) as string;
    } catch (error) {
      return null;
    }
  }

  async verifyRefreshToken(token: string): Promise<string | null> {
    try {
      return jwt.verify(token, this.refreshTokenSecret) as string;
    } catch (error) {
      return null;
    }
  }
}
