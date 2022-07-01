export interface IBaseUseCase<I, R> {
  execute(input: I): R;
}
