export class AttributeValueEntity {
  constructor(
    public readonly id: number,
    public readonly valueName: string,
    public readonly shortName: string,
    public readonly sequence: number,
    public readonly attributeId: number,
    public readonly available: boolean,
    public readonly isDeletable: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly colorHex?: string | null,
  ) {}

  public static fromObject(object: { [key: string]: any }): AttributeValueEntity {
    const {
      id,
      valueName,
      shortName,
      sequence = 0,
      attributeId,
      available = true,
      isDeletable = true,
      colorHex,
      createdAt,
      updatedAt,
    } = object;

    if (!id || isNaN(Number(id))) throw 'Missing or invalid value id';
    if (!valueName) throw 'Missing valueName';
    if (!shortName) throw 'Missing shortName for SKU assembly';
    if (!attributeId || isNaN(Number(attributeId))) throw 'Missing or invalid attributeId';

    return new AttributeValueEntity(
      Number(id),
      String(valueName).trim(),
      String(shortName).trim().toUpperCase(),
      Number(sequence),
      Number(attributeId),
      Boolean(available),
      Boolean(isDeletable),
      createdAt ? new Date(createdAt) : new Date(),
      updatedAt ? new Date(updatedAt) : new Date(),
      colorHex || null
    );
  }
}