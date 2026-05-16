import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';

@Module({
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const host = config.get<string>('SMTP_HOST');
        const port = Number(config.get<string>('SMTP_PORT') ?? 2525);
        const user = config.get<string>('SMTP_USER');
        const pass = config.get<string>('SMTP_PASS');

        // If SMTP not set, don't crash: it will just output JSON
        const transport = host
          ? { host, port, auth: { user, pass } }
          : { jsonTransport: true };

        return {
          transport,
          defaults: {
            from: config.get<string>('MAIL_FROM') ?? 'no-reply@gms.com',
          },
        };
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
