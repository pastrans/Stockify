import { CreateUserDto, UpdateUserDto, PaginationDto } from '../dtos';
import { UserEntity } from '../entities/user.entity';
import { UserQueryOptions } from '../interfaces/query-options.interface';
import { PaginatedResult } from '../interfaces/paginated-result.interface';

export abstract class UserRepository {
  abstract create(createUserDto: CreateUserDto): Promise<UserEntity>;
  abstract getAll(options: UserQueryOptions): Promise<PaginatedResult<UserEntity>>;
  abstract findById(id: number): Promise<UserEntity>;
  abstract findByEmail(email: string): Promise<UserEntity | null>;
  abstract updateById(updateUserDto: UpdateUserDto): Promise<UserEntity>;
  abstract deleteById(id: number): Promise<UserEntity>;
}