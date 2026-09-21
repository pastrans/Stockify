import { PaginationDto } from '../../dtos';
import { UserEntity } from '../../entities';
import { UserRepository } from '../../repositories';
import { PaginatedResponse } from '../../interfaces/paginated-response.interface';
import { UserQueryOptions } from '../../interfaces/query-options.interface';
import { PaginatedResult } from '../../interfaces/paginated-result.interface';

export interface GetUsersUseCase {
  execute(paginationDto: PaginationDto): Promise<PaginatedResponse<UserEntity>>;
}

export class GetUsers {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(options: UserQueryOptions): Promise<PaginatedResult<UserEntity>> {
    return this.userRepository.getAll(options);
  }
}