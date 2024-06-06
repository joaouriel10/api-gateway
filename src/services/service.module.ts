import { Global, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { TasksService } from './tasks.service';

@Global()
@Module({
  providers: [UsersService, AuthService, TasksService],
  exports: [UsersService, AuthService, TasksService],
})
export class ServiceModule {}
