import { AttributeValueEntity } from './attribute-value.entity';

export type AttributeDisplayType = 'RADIO' | 'SELECT' | 'COLOR' | 'PILLS';

export class AttributeEntity {
  constructor(
    public id: number,
    public name: string,
    public displayType: AttributeDisplayType,
    public sequence: number,
    public available: boolean,
    public createdAt: Date,
    public updatedAt: Date,
    public values: AttributeValueEntity[] = [],
  ) {}

  public static fromObject(object: { [key: string]: any }): AttributeEntity {
    const {
      id,
      name,
      displayType = 'RADIO',
      sequence = 0,
      available = true,
      createdAt,
      updatedAt,
      values = [],
    } = object;

    if (!id) throw 'Missing attribute id';
    if (!name) throw 'Missing attribute name';

    return new AttributeEntity(
      Number(id),
      name,
      displayType,
      Number(sequence),
      available,
      createdAt,
      updatedAt,
      Array.isArray(values) ? values.map((val) => AttributeValueEntity.fromObject(val)) : []
    );
  }
}