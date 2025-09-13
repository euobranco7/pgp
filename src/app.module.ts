import { Module } from '@nestjs/common';
import { PaymentsModule } from './payments/payments.module';
import { TransactionsModule } from './transactions/transactions.module';
import { WebhooksModule } from './webhooks/webhooks.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [PaymentsModule, TransactionsModule, WebhooksModule],
  providers: [PrismaService],
})
export class AppModule {}
