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
    const html = await this.renderTemplate('order-confirmed', data);
    return this.safeSend({
      to,
      subject: `Order Confirmed - #${data.orderId}`,
      html,
    });
  }

  async sendOrderStatusUpdated(to: string, data: any) {
    const html = await this.renderTemplate('order-status-updated', data);
    return this.safeSend({
      to,
      subject: `Your Order #${data.orderId} is ${data.status}`,
      html,
    });
  }

  async sendLowStockAlert(to: string[], data: any) {
    if (!to.length) return null;
    const html = await this.renderTemplate('low-stock-alert', data);
    return this.safeSend({
      to,
      subject: `Low Stock Alert - ${data.productName}`,
      html,
    });
  }

  async sendRestockLogged(to: string[], data: any) {
    if (!to.length) return null;
    const html = await this.renderTemplate('restock-logged', data);
    return this.safeSend({
      to,
      subject: `Restock Logged - ${data.productName}`,
      html,
    });
  }

  private async renderTemplate(templateName: string, context: any) {
    // try src path (dev), fallback dist path (prod)
    const devPath = join(process.cwd(), 'src', 'mail', 'templates', `${templateName}.hbs`);
    const distPath = join(__dirname, 'templates', `${templateName}.hbs`);

    let file: string;
    try {
      file = await readFile(devPath, 'utf8');
    } catch {
      file = await readFile(distPath, 'utf8');
    }

    const compiled = Handlebars.compile(file);
    return compiled(context);
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
