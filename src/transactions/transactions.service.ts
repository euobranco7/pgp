import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async list(userId: string) {
    return this.prisma.transaction.findMany({ where: { userId } });
  }
}
