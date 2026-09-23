export class UpdateAttributeValueDto {
  private constructor(
    public readonly id: number,
    public readonly name?: string,
    public readonly htmlColor?: string | null,
    public readonly sequence?: number,
    public readonly available?: boolean,
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};
    if (this.name !== undefined) returnObj.name = this.name.trim();
    if (this.htmlColor !== undefined) returnObj.htmlColor = this.htmlColor ? this.htmlColor.trim() : null;
    if (this.sequence !== undefined) returnObj.sequence = this.sequence;
    if (this.available !== undefined) returnObj.available = this.available;
    return returnObj;
  }

  static create(props: { [key: string]: any }): [string | undefined, UpdateAttributeValueDto | undefined] {
    const { id, name, htmlColor, sequence, available } = props;

    if (!id || isNaN(Number(id))) return ['id must be a valid number', undefined];

    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim().length === 0) {
        return ['Name must be a non-empty string', undefined];
      }
    }

    if (htmlColor !== undefined && htmlColor !== null && htmlColor !== '') {
      const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
      if (!hexRegex.test(htmlColor)) {
        return ['htmlColor must be a valid HEX color code', undefined];
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
        name,
        htmlColor,
        parsedSequence,
        parsedAvailable
      ),
    ];
  }
}