import { AttributeValueEntity, AttributeRepository } from '../..';

export class DeleteAttributeValue {
  constructor(private readonly repository: AttributeRepository) {}
  execute(valueId: number): Promise<AttributeValueEntity> {
    return this.repository.deleteValue(valueId);
  }
}