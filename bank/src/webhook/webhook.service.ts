// src/webhooks/simple-webhook.service.ts
import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as crypto from 'node:crypto';

@Injectable()
export class WebhookService {
    private readonly logger = new Logger(WebhookService.name);
    private readonly url = process.env.WEBHOOK_URL;
    private readonly secret = process.env.WEBHOOK_SECRET || '';

    private sign(payload: string) {
        return crypto.createHmac('sha256', this.secret).update(payload).digest('hex');
    }

    async notify(payload: any) {
        if (!this.url) {
            this.logger.warn('No WEBHOOK_URL configured, skipping notification');
            return;
        }
        const body = JSON.stringify(payload);
        const signature = this.sign(body);
        const headers = {
            'Content-Type': 'application/json',
            'x-webhook-signature': signature,
            'x-webhook-event': 'operation.created',
            'x-webhook-timestamp': new Date().toISOString(),
        };

        const maxAttempts = 3;
        let attempt = 0;
        while (attempt < maxAttempts) {
            try {
                attempt++;
                const res = await axios.post(this.url, payload, { headers, timeout: 5000 });
                this.logger.log(`Webhook sent, status ${res.status}`);
                return;
            } catch (err: any) {
                this.logger.warn(`Webhook attempt ${attempt} failed: ${err.message}`);
                if (attempt >= maxAttempts) throw err;
                await new Promise(r => setTimeout(r, 500 * attempt));
            }
        }
    }
}
