import { HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class UsersService {
  async create(body: any) {
    const response = await axios.post('http://localhost:3010/users', body);

    return { status: response.status, body: {} };
  }

  async findAll(query?: any, headers = {}) {
    const response = await axios.get('http://localhost:3010/users', {
      params: query,
      headers,
    });

    return { status: response.status, body: response.data };
  }

  async findById(id: string, headers = {}) {
    const response = await axios.get(`http://localhost:3010/users/${id}`, {
      headers,
    });

    return { status: response.status, body: response.data };
  }

  async delete(id: any, headers = {}) {
    const response = await axios.delete(`http://localhost:3010/users/${id}`, {
      headers: { host: 'localhost:3010', ...headers },
    });

    return { status: response.status, body: {} };
  }

  async update(id: any, data: any, headers: any) {
    if (headers.authorization) {
      const response = await axios.patch(
        `http://localhost:3010/users/${id}`,
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
