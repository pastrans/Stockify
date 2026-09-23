import { Router } from 'express';
import { AttributeController } from './controller';
import { AttributeDatasourceImpl, AttributeRepositoryImpl } from '../../infrastructure';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { UserDatasourceImpl, UserRepositoryImpl } from '../../infrastructure';

export class AttributeRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new AttributeDatasourceImpl();
    const repository = new AttributeRepositoryImpl(datasource);
    const controller = new AttributeController(repository);

    // Todas las rutas de catálogo requieren autenticación
    const userRepository = new UserRepositoryImpl(new UserDatasourceImpl());
    const requireAdmin = AuthMiddleware.validateJWT(userRepository,'ADMIN');
    router.use(requireAdmin);

    router.post('/', controller.createAttribute);      // Crea atributo (+ valores opcionales)
    router.get('/', controller.getAttributes);         // Listado con valores
    router.get('/:id', controller.getAttributeById);   // Detalle con valores
    router.put('/:id', controller.updateAttribute);    // Actualiza solo metadata del atributo
    router.delete('/:id', controller.deleteAttribute); // Soft delete de atributo

    // --- Rutas granulares de Valores ---
    router.post('/:id/values', controller.addValue);          // Añadir un valor
    router.put('/values/:valueId', controller.updateValue);    // Modificar un valor
    router.delete('/values/:valueId', controller.deleteValue); // Soft delete de un valor
    return router;
  }
}