import { AttributeDisplayType } from '../../entities/attribute.entity';

export interface CreateAttributeValueInput {
  name: string;
  htmlColor?: string;
  sequence?: number;
}

const VALID_DISPLAY_TYPES: AttributeDisplayType[] = ['RADIO', 'SELECT', 'COLOR', 'PILLS'];

export class CreateAttributeDto {
  private constructor(
    public readonly name: string,
    public readonly displayType: AttributeDisplayType,
    public readonly sequence: number,
    public readonly values: CreateAttributeValueInput[] = [],
  ) {}

  static create(props: { [key: string]: any }): [string | undefined, CreateAttributeDto | undefined] {
    const { name, displayType = 'RADIO', sequence = 0, values = [] } = props;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return ['Name property is required', undefined];
    }

    const upperDisplay = displayType.toUpperCase() as AttributeDisplayType;
    if (!VALID_DISPLAY_TYPES.includes(upperDisplay)) {
      return [`Invalid displayType. Allowed values: ${VALID_DISPLAY_TYPES.join(', ')}`, undefined];
    }

    const parsedSequence = Number(sequence);
    if (isNaN(parsedSequence)) {
      return ['Sequence must be a valid number', undefined];
    }

    const parsedValues: CreateAttributeValueInput[] = [];
    if (Array.isArray(values)) {
      for (let i = 0; i < values.length; i++) {
        const val = values[i];
        if (!val.name || typeof val.name !== 'string' || val.name.trim().length === 0) {
          return [`Value at index ${i} must have a valid name`, undefined];
        }

        if (upperDisplay === 'COLOR' && val.htmlColor) {
          const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
          if (!hexRegex.test(val.htmlColor)) {
            return [`Value "${val.name}" has an invalid HEX color code (e.g., #FFFFFF)`, undefined];
          }
        }

        parsedValues.push({
          name: val.name.trim(),
          htmlColor: val.htmlColor ? val.htmlColor.trim() : undefined,
          sequence: val.sequence !== undefined ? Number(val.sequence) : i,
        });
      }
    }

    return [undefined, new CreateAttributeDto(name.trim(), upperDisplay, parsedSequence, parsedValues)];
  }
}