import { HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TasksService {
  async create(body: any, headers: any) {
    if (headers.authorization) {
      const response = await axios.post('http://localhost:3011/tasks', body, {
        headers: { Authorization: headers.authorization },
      });

      return { status: response.status, body: false };
    } else {
      return {
        status: HttpStatus.UNAUTHORIZED,
        body: {
          statusCode: 401,
          message: 'Unauthorized',
        },
      };
    }
  }

  async findAll(query?: any, headers = {}) {
    const response = await axios.get('http://localhost:3011/tasks', {
      params: query,
      headers,
    });

    return { status: response.status, body: response.data };
  }

  async findById(id: string, headers = {}) {
    const response = await axios.get(`http://localhost:3011/tasks/${id}`, {
      headers,
    });

    return { status: response.status, body: response.data };
  }

  async delete(id: any, headers = {}) {
    const response = await axios.delete(`http://localhost:3011/tasks/${id}`, {
      headers: { host: 'localhost:3011', ...headers },
    });

    return { status: response.status, body: {} };
  }

  async update(id: any, data: any, headers: any) {
    if (headers.authorization) {
      const response = await axios.patch(
        `http://localhost:3011/tasks/${id}`,
        data,
        { headers: { Authorization: headers.authorization } },
      );

      return { status: response.status, body: false };
    } else {
      return {
        status: HttpStatus.UNAUTHORIZED,
        body: {
          statusCode: 401,
          message: 'Unauthorized',
        },
      };
    }
  }
}
