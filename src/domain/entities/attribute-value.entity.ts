export class AttributeValueEntity {
  constructor(
    public id: number,
    public name: string,
    public sequence: number,
    public attributeId: number,
    public available: boolean,
    public createdAt: Date,
    public updatedAt: Date,
    public htmlColor?: string | null,
  ) {}

  public static fromObject(object: { [key: string]: any }): AttributeValueEntity {
    const { id, name, sequence, attributeId, available, createdAt, updatedAt, htmlColor } = object;

    if (!id) throw 'Missing value id';
    if (!name) throw 'Missing value name';
    if (!attributeId) throw 'Missing attributeId';

    return new AttributeValueEntity(
      Number(id),
      name,
      sequence ?? 0,
      Number(attributeId),
      available ?? true,
      createdAt,
      updatedAt,
      htmlColor || null
    );
  }
}