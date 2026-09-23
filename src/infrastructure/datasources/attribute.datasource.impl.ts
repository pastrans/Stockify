import { Prisma } from '@prisma/client';
import { prisma } from '../../data/postgres';
import {
  AttributeDatasource,
  AttributeEntity,
  AttributeValueEntity,
  CreateAttributeDto,
  UpdateAttributeDto,
  CreateAttributeValueDto,
  UpdateAttributeValueDto,
  AttributeQueryOptions,
  PaginatedResult,
  CustomError,
} from '../../domain';

export class AttributeDatasourceImpl implements AttributeDatasource {

  async create(createAttributeDto: CreateAttributeDto): Promise<AttributeEntity> {
  try {
    const data: Prisma.AttributeCreateInput = {
      name: createAttributeDto.name,
      sequence: createAttributeDto.sequence,
      displayType: createAttributeDto.displayType,
      variantCreation: createAttributeDto.variantCreation,
    };

    if (createAttributeDto.values.length > 0) {
      data.values = {
        create: createAttributeDto.values.map((v, index) => ({
          valueName: v.valueName,
          shortName: v.shortName,
          colorHex: v.colorHex ?? null,
          sequence: v.sequence ?? index,
        })),
      };
    }

    const attribute = await prisma.attribute.create({
      data,
      include: {
        values: {
          where: { available: true },
          orderBy: { sequence: 'asc' },
        },
      },
    });

    return AttributeEntity.fromObject({
      ...attribute,
      isDeletable: true, // Recién creado no tiene dependencias
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      throw CustomError.badRequest('Attribute name or value shortName/name already exists');
    }
    throw CustomError.internalServer('Error creating attribute');
  }
}
  async getAll(options: AttributeQueryOptions): Promise<PaginatedResult<AttributeEntity>> {
    const { pagination, softDelete } = options;
    const { page, limit } = pagination;
    const { available } = softDelete;

    const where: Prisma.AttributeWhereInput = {};

    if (available !== undefined) {
      where.available = available;
    }

    const [total, attributes] = await Promise.all([
      prisma.attribute.count({ where }),
      prisma.attribute.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          values: {
            where: { available: true },
            orderBy: { sequence: 'asc' },
          },
        },
        orderBy: { sequence: 'asc' },
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      total,
      page,
      limit,
      totalPages,
      prev: page > 1 ? String(page - 1) : null,
      next: page < totalPages ? String(page + 1) : null,
      data: attributes.map((attr) => AttributeEntity.fromObject(attr)),
    };
  }

  async findById(id: number): Promise<AttributeEntity> {
    const attribute = await prisma.attribute.findUnique({
      where: { id },
      include: {
        values: {
          where: { available: true },
          orderBy: { sequence: 'asc' },
        },
      },
    });

    if (!attribute) {
      throw CustomError.notFound(`Attribute with id ${id} not found`);
    }

    return AttributeEntity.fromObject(attribute);
  }

  async updateById(updateAttributeDto: UpdateAttributeDto): Promise<AttributeEntity> {
    await this.findById(updateAttributeDto.id);

    try {
      const attribute = await prisma.attribute.update({
        where: { id: updateAttributeDto.id },
        data: updateAttributeDto.values,
        include: {
          values: {
            where: { available: true },
            orderBy: { sequence: 'asc' },
          },
        },
      });

      return AttributeEntity.fromObject(attribute);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw CustomError.badRequest('Attribute with this name already exists');
      }
      throw CustomError.internalServer('Error updating attribute');
    }
  }

  async deleteById(id: number): Promise<AttributeEntity> {
    await this.findById(id);

    const attribute = await prisma.attribute.update({
      where: { id },
      data: { available: false },
      include: {
        values: {
          orderBy: { sequence: 'asc' },
        },
      },
    });

    return AttributeEntity.fromObject(attribute);
  }

  // --- MÉTODOS DE SUB-RECURSO ATTRIBUTE VALUE ---

  async addValue(attributeId: number, dto: CreateAttributeValueDto): Promise<AttributeValueEntity> {
    await this.findById(attributeId);

    try {
      const value = await prisma.attributeValue.create({
        data: {
          attributeId,
          valueName: dto.valueName,
          shortName: dto.shortName,
          colorHex: dto.colorHex ?? null,
          sequence: dto.sequence,
        },
      });

      return AttributeValueEntity.fromObject(value);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw CustomError.badRequest(`Value "${dto.valueName}" already exists for this attribute`);
      }
      throw CustomError.internalServer('Error adding attribute value');
    }
  }

  async updateValue(dto: UpdateAttributeValueDto): Promise<AttributeValueEntity> {
    const existingValue = await prisma.attributeValue.findUnique({ where: { id: dto.id } });
    if (!existingValue) {
      throw CustomError.notFound(`AttributeValue with id ${dto.id} not found`);
    }

    try {
      const updated = await prisma.attributeValue.update({
        where: { id: dto.id },
        data: dto.values,
      });

      return AttributeValueEntity.fromObject(updated);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw CustomError.badRequest('A value with this name already exists in this attribute');
      }
      throw CustomError.internalServer('Error updating attribute value');
    }
  }

  async deleteValue(valueId: number): Promise<AttributeValueEntity> {
    const existingValue = await prisma.attributeValue.findUnique({ where: { id: valueId } });
    if (!existingValue) {
      throw CustomError.notFound(`AttributeValue with id ${valueId} not found`);
    }

    const disabled = await prisma.attributeValue.update({
      where: { id: valueId },
      data: { available: false },
    });

    return AttributeValueEntity.fromObject(disabled);
  }
}