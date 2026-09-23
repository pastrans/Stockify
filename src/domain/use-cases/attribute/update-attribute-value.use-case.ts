import { AttributeValueEntity, AttributeRepository, UpdateAttributeValueDto } from '../..';

export class UpdateAttributeValue {
  constructor(private readonly repository: AttributeRepository) {}
  execute(dto: UpdateAttributeValueDto): Promise<AttributeValueEntity> {
    return this.repository.updateValue(dto);
  }
}