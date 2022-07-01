export namespace LoginUserDto {
  export type Input = {
    login: string;
    password: string;
  };

  export type Output = {
    user: any;
  };
}
