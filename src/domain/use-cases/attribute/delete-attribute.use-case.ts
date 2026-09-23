import { AttributeEntity, AttributeRepository } from '../..';

export class DeleteAttribute {
  constructor(private readonly repository: AttributeRepository) {}
  execute(id: number): Promise<AttributeEntity> {
    return this.repository.deleteById(id);
  }
}
