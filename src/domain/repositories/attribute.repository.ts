import { AttributeEntity } from '../entities/attribute.entity';
import { AttributeQueryOptions, PaginatedResult } from '../datasources/attribute.datasource';
import { AttributeValueEntity } from '../entities';
import { CreateAttributeDto, UpdateAttributeDto, CreateAttributeValueDto, UpdateAttributeValueDto,  } from '../dtos';

export abstract class AttributeRepository {
  abstract create(createAttributeDto: CreateAttributeDto): Promise<AttributeEntity>;
  abstract getAll(options: AttributeQueryOptions): Promise<PaginatedResult<AttributeEntity>>;
  abstract findById(id: number): Promise<AttributeEntity>;
  abstract updateById(updateAttributeDto: UpdateAttributeDto): Promise<AttributeEntity>;
  abstract deleteById(id: number): Promise<AttributeEntity>;
  abstract addValue(attributeId: number, dto: CreateAttributeValueDto): Promise<AttributeValueEntity>;
  abstract updateValue(dto: UpdateAttributeValueDto): Promise<AttributeValueEntity>;
  abstract deleteValue(valueId: number): Promise<AttributeValueEntity>;
}