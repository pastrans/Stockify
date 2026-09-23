import { AttributeEntity, AttributeRepository, AttributeQueryOptions, PaginatedResult } from '../..';

export class GetAttributes {
  constructor(private readonly repository: AttributeRepository) {}
  execute(options: AttributeQueryOptions): Promise<PaginatedResult<AttributeEntity>> {
    return this.repository.getAll(options);
  }
}