export interface BaseAdapter<I, R> {
  toCore(input: I): R;
  fromCore(input: I): R;
}
