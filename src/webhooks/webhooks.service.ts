import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class WebhooksService {
  constructor(private prisma: PrismaService) {}

  async handleMercadoPagoWebhook(rawBody: Buffer, signature: string) {
    const secret = process.env.MERCADO_PAGO_WEBHOOK_SECRET || '';
    const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
    if (expected !== signature) return;

    const body = JSON.parse(rawBody.toString());
    if (body.type === 'payment' && body.data && body.data.id) {
      await this.prisma.transaction.updateMany({
        where: { status: 'pending' },
        data: { status: 'approved' }
      });
      await this.prisma.user.update({
        where: { id: 'user-id-teste' },
        data: { balance: { increment: 10 } }
      });
    }
  }
}
