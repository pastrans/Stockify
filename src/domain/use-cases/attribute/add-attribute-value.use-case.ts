import { AttributeValueEntity, AttributeRepository, CreateAttributeValueDto } from '../..';

export class AddAttributeValue {
  constructor(private readonly repository: AttributeRepository) {}
  execute(attributeId: number, dto: CreateAttributeValueDto): Promise<AttributeValueEntity> {
    return this.repository.addValue(attributeId, dto);
  }
}