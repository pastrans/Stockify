import { AttributeValueEntity } from './attribute-value.entity';

export type DisplayType = 'select' | 'pills' | 'radio' | 'color';
export type VariantCreation = 'instantly' | 'dynamically' | 'never';

export class AttributeEntity {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly sequence: number,
    public readonly displayType: DisplayType,
    public readonly variantCreation: VariantCreation,
    public readonly available: boolean,
    public readonly isDeletable: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly values: AttributeValueEntity[] = [],
  ) {}

  public static fromObject(object: { [key: string]: any }): AttributeEntity {
    const {
      id,
      name,
      sequence = 0,
      displayType = 'radio',
      variantCreation = 'instantly',
      available = true,
      isDeletable = true,
      createdAt,
      updatedAt,
      values = [],
    } = object;

    if (!id || isNaN(Number(id))) throw 'Missing or invalid attribute id';
    if (!name) throw 'Missing attribute name';

    return new AttributeEntity(
      Number(id),
      String(name).trim(),
      Number(sequence),
      displayType.toLowerCase() as DisplayType,
      variantCreation.toLowerCase() as VariantCreation,
      Boolean(available),
      Boolean(isDeletable),
      createdAt ? new Date(createdAt) : new Date(),
      updatedAt ? new Date(updatedAt) : new Date(),
      Array.isArray(values) ? values.map((val) => AttributeValueEntity.fromObject(val)) : []
    );
  }
}