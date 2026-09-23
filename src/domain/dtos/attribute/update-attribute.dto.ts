import { AttributeDisplayType } from '../../entities/attribute.entity';

const VALID_DISPLAY_TYPES: AttributeDisplayType[] = ['RADIO', 'SELECT', 'COLOR', 'PILLS'];

export class UpdateAttributeDto {
  private constructor(
    public readonly id: number,
    public readonly name?: string,
    public readonly displayType?: AttributeDisplayType,
    public readonly sequence?: number,
    public readonly available?: boolean,
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};
    if (this.name !== undefined) returnObj.name = this.name.trim();
    if (this.displayType !== undefined) returnObj.displayType = this.displayType;
    if (this.sequence !== undefined) returnObj.sequence = this.sequence;
    if (this.available !== undefined) returnObj.available = this.available;
    return returnObj;
  }

  static create(props: { [key: string]: any }): [string | undefined, UpdateAttributeDto | undefined] {
    const { id, name, displayType, sequence, available } = props;

    if (!id || isNaN(Number(id))) return ['id must be a valid number', undefined];

    let validatedDisplay: AttributeDisplayType | undefined;
    if (displayType !== undefined) {
      const upper = displayType.toUpperCase() as AttributeDisplayType;
      if (!VALID_DISPLAY_TYPES.includes(upper)) {
        return [`Invalid displayType. Allowed: ${VALID_DISPLAY_TYPES.join(', ')}`, undefined];
      }
      validatedDisplay = upper;
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
      new UpdateAttributeDto(Number(id), name, validatedDisplay, parsedSequence, parsedAvailable),
    ];
  }
}