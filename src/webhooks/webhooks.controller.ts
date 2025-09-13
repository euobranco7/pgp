import { Controller, Post, Req, Res, Headers } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';

@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @Post('mercadopago')
  handle(@Req() req, @Res() res, @Headers('x-signature') signature: string) {
    const rawBody = req.rawBody;
    this.webhooksService.handleMercadoPagoWebhook(rawBody, signature);
    res.sendStatus(200);
  }
}
