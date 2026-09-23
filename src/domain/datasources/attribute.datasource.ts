import { AttributeEntity } from '../entities/attribute.entity';
import { AttributeValueEntity } from '../entities/attribute-value.entity';
import { CreateAttributeDto } from '../dtos/attribute/create-attribute.dto';
import { UpdateAttributeDto } from '../dtos/attribute/update-attribute.dto';
import { CreateAttributeValueDto } from '../dtos/attribute-value/create-attribute-value.dto';
import { UpdateAttributeValueDto } from '../dtos/attribute-value/update-attribute-value.dto';
import { PaginationDto } from '../dtos/shared/pagination.dto';
import { SoftDeleteFilterDto } from '../dtos/shared/soft-delete-filter.dto';

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

  abstract addValue(attributeId: number, dto: CreateAttributeValueDto): Promise<AttributeValueEntity>;
  abstract updateValue(dto: UpdateAttributeValueDto): Promise<AttributeValueEntity>;
  abstract deleteValue(valueId: number): Promise<AttributeValueEntity>;
}