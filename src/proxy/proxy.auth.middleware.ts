/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';

@Injectable()
export class ProxyAuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}
  async use(req: any, res: any, next: () => void) {
    try {
      const explodeUrl = req.path.split('/');

      const route = explodeUrl.slice(0, 2).join('/');

      if (route === '/authorize' && req.method === 'POST') {
        const response = await this.authService.execute(req.body);
        return res.status(response.status).json(response.body);
      }

      if (route === '/me' && req.method === 'GET') {
        const response = await this.authService.me(req.headers);
        return res.status(response.status).json(response.body);
      }

      return res.status(404).json({
        statusCode: 404,
        message: `Cannot ${req.method} ${req.originalUrl}`,
        error: 'Not Found',
      });
    } catch (error) {
      return res
        .status(error.response?.status || 500)
        .json(error.response?.data || { message: 'Error on api gateway' });
    }
  }
}
