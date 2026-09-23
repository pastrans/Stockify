import { DisplayType, VariantCreation } from '../../entities/attribute.entity';

export interface CreateNestedAttributeValueInput {
  valueName: string;
  shortName: string;
  colorHex?: string;
  sequence?: number;
}

const VALID_DISPLAY_TYPES: DisplayType[] = ['select', 'pills', 'radio', 'color'];
const VALID_VARIANT_CREATIONS: VariantCreation[] = ['instantly', 'dynamically', 'never'];

export class CreateAttributeDto {
  private constructor(
    public readonly name: string,
    public readonly sequence: number,
    public readonly displayType: DisplayType,
    public readonly variantCreation: VariantCreation,
    public readonly values: CreateNestedAttributeValueInput[] = [],
  ) {}

  static create(props: { [key: string]: any }): [string | undefined, CreateAttributeDto | undefined] {
    const {
      name,
      sequence = 0,
      displayType = 'radio',
      variantCreation = 'instantly',
      values = [],
    } = props;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return ['Name property is required', undefined];
    }

    const normalizedDisplay = displayType.toLowerCase() as DisplayType;
    if (!VALID_DISPLAY_TYPES.includes(normalizedDisplay)) {
      return [`Invalid displayType. Allowed values: ${VALID_DISPLAY_TYPES.join(', ')}`, undefined];
    }

    const normalizedCreation = variantCreation.toLowerCase() as VariantCreation;
    if (!VALID_VARIANT_CREATIONS.includes(normalizedCreation)) {
      return [`Invalid variantCreation. Allowed values: ${VALID_VARIANT_CREATIONS.join(', ')}`, undefined];
    }

    const parsedSequence = Number(sequence);
    if (isNaN(parsedSequence)) {
      return ['Sequence must be a valid number', undefined];
    }

    const parsedValues: CreateNestedAttributeValueInput[] = [];
    if (Array.isArray(values)) {
      for (let i = 0; i < values.length; i++) {
        const v = values[i];
        const valName = v.valueName || v.name;
        if (!valName || typeof valName !== 'string' || valName.trim().length === 0) {
          return [`Value at index ${i} must have a valid valueName`, undefined];
        }

        if (!v.shortName || typeof v.shortName !== 'string' || v.shortName.trim().length === 0) {
          return [`Value "${valName}" requires a shortName for SKU assembly`, undefined];
        }

        if (normalizedDisplay === 'color' && v.colorHex) {
          const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
          if (!hexRegex.test(v.colorHex)) {
            return [`Value "${valName}" has an invalid HEX color code (e.g., #000000)`, undefined];
          }
        }

        parsedValues.push({
          valueName: valName.trim(),
          shortName: v.shortName.trim().toUpperCase(),
          colorHex: v.colorHex ? v.colorHex.trim() : undefined,
          sequence: v.sequence !== undefined ? Number(v.sequence) : i,
        });
      }
    }

    return [
      undefined,
      new CreateAttributeDto(
        name.trim(),
        parsedSequence,
        normalizedDisplay,
        normalizedCreation,
        parsedValues
      ),
    ];
  }
}