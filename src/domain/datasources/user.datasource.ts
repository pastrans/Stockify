import { CreateUserDto, UpdateUserDto } from '../dtos';
import { UserEntity } from '../entities/user.entity';
import { PaginatedResult } from '../interfaces/paginated-result.interface';
import { UserQueryOptions } from '../interfaces/query-options.interface';

export interface UserPaginatedResult {
  users: UserEntity[];
  total: number;
}

export abstract class UserDatasource {
  abstract create(createUserDto: CreateUserDto): Promise<UserEntity>;
  abstract getAll(options: UserQueryOptions): Promise<PaginatedResult<UserEntity>>;
  abstract findById(id: number): Promise<UserEntity>;
  abstract findByEmail(email: string): Promise<UserEntity | null>;
  abstract updateById(updateUserDto: UpdateUserDto): Promise<UserEntity>;
  abstract deleteById(id: number): Promise<UserEntity>;
}