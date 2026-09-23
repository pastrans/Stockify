import { AttributeEntity, AttributeRepository,UpdateAttributeDto } from '../..';

export class UpdateAttribute {
  constructor(private readonly repository: AttributeRepository) {}
  execute(dto: UpdateAttributeDto): Promise<AttributeEntity> {
    return this.repository.updateById(dto);
  }
}
