export class CreateAttributeValueDto {
  private constructor(
    public readonly attributeId: number,
    public readonly name: string,
    public readonly sequence: number,
    public readonly htmlColor?: string,
  ) {}

  static create(props: { [key: string]: any }): [string | undefined, CreateAttributeValueDto | undefined] {
    const { attributeId, name, sequence = 0, htmlColor } = props;

    if (!attributeId || isNaN(Number(attributeId))) return ['attributeId must be a valid number', undefined];
    if (!name || typeof name !== 'string' || name.trim().length === 0) return ['Name is required', undefined];

    if (htmlColor !== undefined && htmlColor !== null && htmlColor !== '') {
      const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
      if (!hexRegex.test(htmlColor)) {
        return ['htmlColor must be a valid HEX color code (e.g., #FFFFFF or #FFF)', undefined];
      }
    }

    return [
      undefined,
      new CreateAttributeValueDto(Number(attributeId), name.trim(), Number(sequence) || 0, htmlColor || undefined),
    ];
  }
}