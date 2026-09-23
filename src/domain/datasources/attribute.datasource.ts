import { AttributeEntity } from '../entities/attribute.entity';
import { AttributeValueEntity } from '../entities';
import { UpdateAttributeValueDto, 
        CreateAttributeDto, 
        UpdateAttributeDto, 
        PaginationDto, 
        SoftDeleteFilterDto, 
        CreateAttributeValueDto} 
from '../dtos';

export interface PaginatedResult<T> {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  prev: string | null;
  next: string | null;
  data: T[];
}

export interface AttributeQueryOptions {
  pagination: PaginationDto;
  softDelete: SoftDeleteFilterDto;
}

export abstract class AttributeDatasource {
  abstract create(createAttributeDto: CreateAttributeDto): Promise<AttributeEntity>;
  abstract getAll(options: AttributeQueryOptions): Promise<PaginatedResult<AttributeEntity>>;
  abstract findById(id: number): Promise<AttributeEntity>;
  abstract updateById(updateAttributeDto: UpdateAttributeDto): Promise<AttributeEntity>;
  abstract deleteById(id: number): Promise<AttributeEntity>;

  // Métodos específicos para AttributeValue
  abstract addValue(attributeId: number, dto: CreateAttributeValueDto): Promise<AttributeValueEntity>;
  abstract updateValue(dto: UpdateAttributeValueDto): Promise<AttributeValueEntity>;
  abstract deleteValue(valueId: number): Promise<AttributeValueEntity>;
}