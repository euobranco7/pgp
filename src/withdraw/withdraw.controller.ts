import { Controller, Post, Body } from '@nestjs/common';
import { WithdrawService } from './withdraw.service';

@Controller('withdraw')
export class WithdrawController {
  constructor(private readonly withdrawService: WithdrawService) {}

  @Post()
  withdraw(@Body() body: { userId: string; amount: number }) {
    return this.withdrawService.withdraw(body.userId, body.amount);
  }
}
