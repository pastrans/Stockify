import {
  UserRepository,
  UserDatasource,
  UserEntity,
  CreateUserDto,
  UpdateUserDto,
} from '../../domain';
import { PaginatedResult } from '../../domain/interfaces/paginated-result.interface';
import { UserQueryOptions } from '../../domain/interfaces/query-options.interface';

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly datasource: UserDatasource) {}

  create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.datasource.create(createUserDto);
  }
  

  getAll(paginationDto: UserQueryOptions): Promise<PaginatedResult<UserEntity>> {
    return this.datasource.getAll(paginationDto);
  }

  findById(id: number): Promise<UserEntity> {
    return this.datasource.findById(id);
  }

  findByEmail(email: string): Promise<UserEntity | null> {
    return this.datasource.findByEmail(email);
  }

  updateById(updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return this.datasource.updateById(updateUserDto);
  }

  deleteById(id: number): Promise<UserEntity> {
    return this.datasource.deleteById(id);
  }
}