import { IBaseUseCase } from '../../base.usecase';
import * as bcrypt from 'bcrypt';
export class HashPasswordUsecase
  implements IBaseUseCase<string, Promise<string>>
{
  async execute(input: string): Promise<string> {
    //random salt
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(input, salt);
    return hash;
  }
}
