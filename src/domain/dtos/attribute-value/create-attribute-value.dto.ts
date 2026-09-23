export class CreateAttributeValueDto {
  private constructor(
    public readonly attributeId: number,
    public readonly valueName: string,
    public readonly shortName: string,
    public readonly sequence: number,
    public readonly colorHex?: string,
  ) {}

  static create(props: { [key: string]: any }): [string | undefined, CreateAttributeValueDto | undefined] {
    const { attributeId, valueName, shortName, sequence = 0, colorHex } = props;

    if (!attributeId || isNaN(Number(attributeId))) {
      return ['attributeId must be a valid number', undefined];
    }

    if (!valueName || typeof valueName !== 'string' || valueName.trim().length === 0) {
      return ['valueName is required', undefined];
    }

    if (!shortName || typeof shortName !== 'string' || shortName.trim().length === 0) {
      return ['shortName is required for SKU generation (e.g., "XL", "NEG")', undefined];
    }

    if (colorHex) {
      const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
      if (!hexRegex.test(colorHex)) {
        return ['colorHex must be a valid HEX color code (e.g., #FFFFFF)', undefined];
      }
    }

    return [
      undefined,
      new CreateAttributeValueDto(
        Number(attributeId),
        valueName.trim(),
        shortName.trim().toUpperCase(),
        Number(sequence) || 0,
        colorHex ? colorHex.trim() : undefined
      ),
    ];
  }
}