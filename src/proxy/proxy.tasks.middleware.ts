/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { TasksService } from 'src/services/tasks.service';

@Injectable()
export class ProxyTasksMiddleware implements NestMiddleware {
  constructor(private readonly tasksService: TasksService) {}
  async use(req: any, res: any, next: () => void) {
    try {
      const explodeUrl = req.path.split('/');

      const queryParams = req.query;
      const route = explodeUrl.slice(0, 2).join('/');
      const params = explodeUrl.slice(2);

      if (route === '/tasks' && req.method === 'POST') {
        const response = await this.tasksService.create(req.body, req.headers);

        if (response.body) {
          return res.status(response.status).json(response.body);
        } else {
          return res.status(response.status).send();
        }
      }

      if (route === '/tasks' && req.method === 'GET' && params.length === 0) {
        const response = await this.tasksService.findAll(
          queryParams,
          req.headers,
        );
        return res.status(response.status).json(response.body);
      }

      if (route === '/tasks' && req.method === 'GET' && params) {
        const response = await this.tasksService.findById(params, req.headers);
        return res.status(response.status).json(response.body);
      }

      if (route === '/tasks' && req.method === 'DELETE' && params) {
        const response = await this.tasksService.delete(params, req.headers);
        return res.status(response.status).json(response.body);
      }

      if (route === '/tasks' && req.method === 'PATCH') {
        const response = await this.tasksService.update(
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
