import { AttributeEntity, AttributeRepository } from '../..';

export class GetAttributeById {
  constructor(private readonly repository: AttributeRepository) {}
  execute(id: number): Promise<AttributeEntity> {
    return this.repository.findById(id);
  }
}
