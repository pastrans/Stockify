import {
  AttributeRepository,
  AttributeDatasource,
  AttributeEntity,
  CreateAttributeDto,
  UpdateAttributeDto,
  AttributeQueryOptions,
  PaginatedResult,
  CreateAttributeValueDto,
  UpdateAttributeValueDto,
  AttributeValueEntity
} from '../../domain';

export class AttributeRepositoryImpl implements AttributeRepository {
  constructor(private readonly datasource: AttributeDatasource) {}

  create(createAttributeDto: CreateAttributeDto): Promise<AttributeEntity> {
    return this.datasource.create(createAttributeDto);
  }

  getAll(options: AttributeQueryOptions): Promise<PaginatedResult<AttributeEntity>> {
    return this.datasource.getAll(options);
  }

  findById(id: number): Promise<AttributeEntity> {
    return this.datasource.findById(id);
  }

  updateById(updateAttributeDto: UpdateAttributeDto): Promise<AttributeEntity> {
    return this.datasource.updateById(updateAttributeDto);
  }

  deleteById(id: number): Promise<AttributeEntity> {
    return this.datasource.deleteById(id);
  }

  addValue(attributeId: number, dto: CreateAttributeValueDto): Promise<AttributeValueEntity> {
    return this.datasource.addValue(attributeId, dto);
  }

  updateValue(dto: UpdateAttributeValueDto): Promise<AttributeValueEntity> {
    return this.datasource.updateValue(dto);
  }

  deleteValue(valueId: number): Promise<AttributeValueEntity> {
    return this.datasource.deleteValue(valueId);
  }
}