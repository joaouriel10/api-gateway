import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ServiceModule } from './services/service.module';
import { ProxyUsersMiddleware } from './proxy/proxy.users.middleware';
import { ProxyAuthMiddleware } from './proxy/proxy.auth.middleware';
import { ProxyTasksMiddleware } from './proxy/proxy.tasks.middleware';

@Module({
  imports: [ServiceModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ProxyUsersMiddleware)
      .forRoutes({ path: '/users*', method: RequestMethod.ALL });
    consumer
      .apply(ProxyAuthMiddleware)
      .forRoutes({ path: '/authorize*', method: RequestMethod.ALL });
    consumer
      .apply(ProxyAuthMiddleware)
      .forRoutes({ path: '/me*', method: RequestMethod.ALL });
    consumer
      .apply(ProxyTasksMiddleware)
      .forRoutes({ path: '/tasks*', method: RequestMethod.ALL });
  }
}
