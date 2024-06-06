/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { UsersService } from 'src/services/users.service';

@Injectable()
export class ProxyUsersMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}
  async use(req: any, res: any, next: () => void) {
    try {
      const explodeUrl = req.path.split('/');

      const queryParams = req.query;
      const route = explodeUrl.slice(0, 2).join('/');
      const params = explodeUrl.slice(2);

      if (route === '/users' && req.method === 'POST') {
        const response = await this.usersService.create(req.body);
        return res.status(response.status).send();
      }

      // Rotas que necessitam autenticação
      if (route === '/users' && req.method === 'GET' && params.length === 0) {
        const response = await this.usersService.findAll(
          queryParams,
          req.headers,
        );
        return res.status(response.status).json(response.body);
      }

      if (route === '/users' && req.method === 'GET' && params) {
        const response = await this.usersService.findById(params, req.headers);
        return res.status(response.status).json(response.body);
      }

      if (route === '/users' && req.method === 'DELETE' && params) {
        const response = await this.usersService.delete(params, req.headers);
        return res.status(response.status).json(response.body);
      }

      if (route === '/users' && req.method === 'PATCH') {
        const response = await this.usersService.update(
          params,
          req.body,
          req.headers,
        );

        if (response.body) {
          return res.status(response.status).json(response.body);
        } else {
          return res.status(response.status).send();
        }
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
