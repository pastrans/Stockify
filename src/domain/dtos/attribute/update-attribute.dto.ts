import { DisplayType, VariantCreation } from '../../entities/attribute.entity';

const VALID_DISPLAY_TYPES: DisplayType[] = ['select', 'pills', 'radio', 'color'];
const VALID_VARIANT_CREATIONS: VariantCreation[] = ['instantly', 'dynamically', 'never'];

export class UpdateAttributeDto {
  private constructor(
    public readonly id: number,
    public readonly name?: string,
    public readonly sequence?: number,
    public readonly displayType?: DisplayType,
    public readonly variantCreation?: VariantCreation,
    public readonly available?: boolean,
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};
    if (this.name !== undefined) returnObj.name = this.name.trim();
    if (this.sequence !== undefined) returnObj.sequence = this.sequence;
    if (this.displayType !== undefined) returnObj.displayType = this.displayType;
    if (this.variantCreation !== undefined) returnObj.variantCreation = this.variantCreation;
    if (this.available !== undefined) returnObj.available = this.available;
    return returnObj;
  }

  static create(props: { [key: string]: any }): [string | undefined, UpdateAttributeDto | undefined] {
    const { id, name, sequence, displayType, variantCreation, available } = props;

    if (!id || isNaN(Number(id))) return ['id must be a valid number', undefined];

    let normalizedDisplay: DisplayType | undefined;
    if (displayType !== undefined) {
      const lower = String(displayType).toLowerCase() as DisplayType;
      if (!VALID_DISPLAY_TYPES.includes(lower)) {
        return [`Invalid displayType. Allowed: ${VALID_DISPLAY_TYPES.join(', ')}`, undefined];
      }
      normalizedDisplay = lower;
    }

    let normalizedCreation: VariantCreation | undefined;
    if (variantCreation !== undefined) {
      const lower = String(variantCreation).toLowerCase() as VariantCreation;
      if (!VALID_VARIANT_CREATIONS.includes(lower)) {
        return [`Invalid variantCreation. Allowed: ${VALID_VARIANT_CREATIONS.join(', ')}`, undefined];
      }
      normalizedCreation = lower;
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
      new UpdateAttributeDto(
        Number(id),
        name,
        parsedSequence,
        normalizedDisplay,
        normalizedCreation,
        parsedAvailable
      ),
    ];
  }
}