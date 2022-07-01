export namespace GenerateJwtDto {
  export type Input = {
    user: any;
    aditionalData?: Record<string, any>;
  };

  export type Output = {
    token: string;
  };
}
