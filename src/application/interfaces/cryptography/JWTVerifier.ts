export interface JWTVerifier {
  verifyAccessToken(jwt: string): Promise<string | null>;
  verifyRefreshToken(jwt: string): Promise<string | null>;
}
