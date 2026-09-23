export class UpdateAttributeValueDto {
  private constructor(
    public readonly id: number,
    public readonly valueName?: string,
    public readonly shortName?: string,
    public readonly colorHex?: string | null,
    public readonly sequence?: number,
    public readonly available?: boolean,
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};
    if (this.valueName !== undefined) returnObj.valueName = this.valueName.trim();
    if (this.shortName !== undefined) returnObj.shortName = this.shortName.trim().toUpperCase();
    if (this.colorHex !== undefined) returnObj.colorHex = this.colorHex ? this.colorHex.trim() : null;
    if (this.sequence !== undefined) returnObj.sequence = this.sequence;
    if (this.available !== undefined) returnObj.available = this.available;
    return returnObj;
  }

  static create(props: { [key: string]: any }): [string | undefined, UpdateAttributeValueDto | undefined] {
    const { id, valueName, shortName, colorHex, sequence, available } = props;

    if (!id || isNaN(Number(id))) return ['id must be a valid number', undefined];

    if (colorHex !== undefined && colorHex !== null && colorHex !== '') {
      const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
      if (!hexRegex.test(colorHex)) {
        return ['colorHex must be a valid HEX color code (e.g., #FFFFFF)', undefined];
      }
    }

    let parsedSequence: number | undefined;
    if (sequence !== undefined) {
      parsedSequence = Number(sequence);
      if (isNaN(parsedSequence)) return ['Sequence must be a valid number', undefined];
    }

    let parsedAvailable: boolean | undefined;
    if (available !== undefined) {
      parsedAvailable = typeof available === 'string' ? available === 'true' : Boolean(available);
    }

    return [
      undefined,
      new UpdateAttributeValueDto(
        Number(id),
        valueName,
        shortName,
        colorHex,
        parsedSequence,
        parsedAvailable
      ),
    ];
  }
}