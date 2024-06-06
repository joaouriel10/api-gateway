import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthService {
  async execute(body: any) {
    const response = await axios.post('http://localhost:3010/authorize', body);

    return { status: response.status, body: response.data };
  }

  async me(headers = {}) {
    const response = await axios.get('http://localhost:3010/me', { headers });

    return { status: response.status, body: response.data };
  }
}
