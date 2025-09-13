import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('pix')
  createPix(@Body() body: { userId: string; amount: number }) {
    return this.paymentsService.createPix(body.userId, body.amount);
  }
}
