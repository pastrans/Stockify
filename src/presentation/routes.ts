import { Router } from 'express';
import { UserRoutes } from './users/routes';
import { ErrorMiddleware } from './middlewares';
import { AuthRoutes } from './auth/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/v1/users', UserRoutes.routes);
    router.use('/api/v1/auth', AuthRoutes.routes);
    router.use(ErrorMiddleware.handleError); 
    
    return router;
  }
}