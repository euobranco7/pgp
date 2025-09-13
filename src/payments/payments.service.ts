import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async createPix(userId: string, amount: number) {
    const response = await axios.post('https://api.mercadopago.com/v1/payments', {
      transaction_amount: amount,
      payment_method_id: 'pix',
      payer: { email: 'test_user@test.com' },
      notification_url: process.env.WEBHOOK_URL || 'https://seu-dominio.com/webhooks/mercadopago'
    }, {
      headers: { Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}` }
    });

    const payment = await this.prisma.transaction.create({
      data: {
        userId,
        amount,
        type: 'deposit',
        status: 'pending'
      }
    });

    return { pix_qr: response.data.point_of_interaction.transaction_data.qr_code_base64, payment };
  }
}
