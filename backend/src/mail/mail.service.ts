import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { readFile } from 'fs/promises';
import { join } from 'path';
import * as Handlebars from 'handlebars';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly mailer: MailerService) {}

  async sendOrderConfirmed(to: string, data: any) {
    const html = await this.renderTemplateSafe('order-confirmed', data);
    return this.safeSend({ to, subject: `Order Confirmed - #${data.orderId}`, html });
  }

  async sendOrderStatusUpdated(to: string, data: any) {
    const html = await this.renderTemplateSafe('order-status-updated', data);
    return this.safeSend({ to, subject: `Your Order #${data.orderId} is ${data.status}`, html });
  }

  async sendLowStockAlert(to: string[], data: any) {
    if (!to.length) return null;
    const html = await this.renderTemplateSafe('low-stock-alert', data);
    return this.safeSend({ to, subject: `Low Stock Alert - ${data.productName}`, html });
  }

  async sendRestockLogged(to: string[], data: any) {
    if (!to.length) return null;
    const html = await this.renderTemplateSafe('restock-logged', data);
    return this.safeSend({ to, subject: `Restock Logged - ${data.productName}`, html });
  }

  async sendPasswordReset(to: string, data: any) {
    const html = await this.renderTemplateSafe('password-reset', data);
    return this.safeSend({ to, subject: 'Password Reset Request', html });
  }

  private async renderTemplateSafe(templateName: string, context: any) {
    try {
      const devPath = join(process.cwd(), 'src', 'mail', 'templates', `${templateName}.hbs`);
      const file = await readFile(devPath, 'utf8');
      return Handlebars.compile(file)(context);
    } catch (e: any) {
      this.logger.warn(`Template missing/failed (${templateName}). Using fallback HTML. ${e?.message ?? e}`);
      return `<pre>${escapeHtml(JSON.stringify(context, null, 2))}</pre>`;
    }
  }

  private async safeSend(options: any) {
    try {
      const info = await this.mailer.sendMail(options);
      this.logger.log(`Mail sent: ${options.subject}`);
      return info;
    } catch (e: any) {
      this.logger.error(`Mail failed: ${options.subject}`, e?.message ?? e);
      return null;
    }
  }
}

function escapeHtml(s: string) {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
