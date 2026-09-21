import { prisma } from '../../data/postgres';
import {
  UserDatasource,
  UserEntity,
  CreateUserDto,
  UpdateUserDto,
  CustomError,
} from '../../domain';
import { PaginatedResult } from '../../domain/interfaces/paginated-result.interface';
import { UserQueryOptions } from '../../domain/interfaces/query-options.interface';
import { Prisma } from '@prisma/client';

export class UserDatasourceImpl implements UserDatasource {
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { name, email, password, role } = createUserDto;
    
    const existingUser = await this.findByEmail(email);
    if (existingUser) throw CustomError.badRequest('User with this email already exists');

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        ...(role && { role }),
      },
    });

    return UserEntity.fromObject(user);
  }

  async getAll(options: UserQueryOptions): Promise<PaginatedResult<UserEntity>> {
    const { pagination, softDelete, filters } = options;
    const { page, limit } = pagination;

    // 1. Cláusula base con soft-delete compartido
    const where: Prisma.UserWhereInput = {};

    if (softDelete.available !== undefined) {
      where.available = softDelete.available;
    }

    if (filters?.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { email: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    // 2. Ejecución paginada
    const [total, users] = await Promise.all([
      prisma.user.count({ where }),
      prisma.user.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      total,
      page,
      limit,
      totalPages,
      prev: page > 1 ? String(page - 1) : null,
      next: page < totalPages ? String(page + 1) : null,
      //prev: page > 1 ? `/api/users?page=${page - 1}&limit=${limit}${searchParam}` : null,
      //next: page < totalPages ? `/api/users?page=${page + 1}&limit=${limit}${searchParam}` : null,
      data: users.map(UserEntity.fromObject),
    };
  }
  

  async findById(id: number): Promise<UserEntity> {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw CustomError.notFound(`User with id ${id} not found`);
    return UserEntity.fromObject(user);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    return UserEntity.fromObject(user);
  }

  async updateById(updateUserDto: UpdateUserDto): Promise<UserEntity> {
    await this.findById(updateUserDto.id);

    const updatedUser = await prisma.user.update({
      where: { id: updateUserDto.id },
      data: updateUserDto.values,
    });

    return UserEntity.fromObject(updatedUser);
  }

  async deleteById(id: number): Promise<UserEntity> {
    await this.findById(id);

    const deleted = await prisma.user.update({
      where: { id },
      data: { available: false },
    });

    return UserEntity.fromObject(deleted);
  }
}