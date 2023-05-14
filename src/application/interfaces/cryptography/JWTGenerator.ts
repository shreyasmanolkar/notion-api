export interface IJWTGenerator {
  generate(payload: string): Promise<string>;
}
