import { prisma } from '../../data/postgres';
import { seedData } from './data';
import { bcryptAdapter } from '../../config';
import {
  CreateUserDto,
} from '../../domain';
import {

  UserDatasourceImpl,
} from '../../infrastructure';


(async()=> {
  try {
    await main();
  } catch (error) {
    console.error('Error durante el proceso de seeding:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    process.exit()
  }
})();


async function main() {

  // 0. Borrar todos los datos (en orden para evitar conflictos de FK)
  console.log('Borrando registros existentes...');
  await prisma.user.deleteMany();


  // 1. Crear usuarios
  const userDatasource = new UserDatasourceImpl();
  const userCreationPromises = seedData.users.map(async(user) => {
    const [error, createUserDto] = CreateUserDto.create({
      ...user,
      password: await bcryptAdapter.hash( user.password ), // Resolvemos la promesa del hash
    });
    if (error) throw new Error(`Error en DTO de usuario: ${error}`);
    return userDatasource.create(createUserDto!);
  });

  const users = await Promise.all(userCreationPromises);
  console.log('Usuarios creados!');


  console.log('SEEDED');
}
