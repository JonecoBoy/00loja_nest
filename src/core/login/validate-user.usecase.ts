import { UsersRepository } from 'src/infra/repositories/users.repository';
import { PrismaStrategy } from 'src/infra/strategies/prisma/prisma.strategy';
export class ValidateUserUseCase {
  //   implements
  //     IBaseUseCase<ValidateUserDto.Input, Promise<ValidateUserDto.Output>>
  constructor(
    private prisma: PrismaStrategy,
    private usersRepository: UsersRepository
  ) {
    this.prisma = new PrismaStrategy();
    this.usersRepository = new UsersRepository(this.prisma);
  }
  async execute(payload) {
    return this.usersRepository.findOneByEmail(payload.email);
  }
}
