export namespace ValidateUserDto {
  export type Input = {
    email: string;
  };

  export type Output = {
    user: object;
    aditionalData?: any;
  };
}
