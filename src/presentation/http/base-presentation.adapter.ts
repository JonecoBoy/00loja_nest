export interface IBasePresentationAdapter<I, R> {
  modelToResponse(input: I): R;
  requestToModel(input: R): I;
}
