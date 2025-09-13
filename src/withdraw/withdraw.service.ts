import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class WithdrawService {
  constructor(private prisma: PrismaService) {}

  async withdraw(userId: string, amount: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user || user.balance < amount) throw new Error('Saldo insuficiente');

    await this.prisma.user.update({
      where: { id: userId },
      data: { balance: { decrement: amount } }
    });

    return this.prisma.transaction.create({
      data: { userId, amount, type: 'withdraw', status: 'completed' }
    });
  }
}
