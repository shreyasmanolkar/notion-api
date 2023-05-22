export interface JWTGenerator {
  generateAccessToken(payload: string): Promise<string>;
  generateRefreshToken(payload: string): Promise<string>;
}
