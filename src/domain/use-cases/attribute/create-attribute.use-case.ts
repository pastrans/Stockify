import { AttributeEntity, AttributeRepository, CreateAttributeDto } from '../..';

export class CreateAttribute {
  constructor(private readonly repository: AttributeRepository) {}
  execute(dto: CreateAttributeDto): Promise<AttributeEntity> {
    return this.repository.create(dto);
  }
}