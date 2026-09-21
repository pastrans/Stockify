export class SoftDeleteFilterDto {
  private constructor(public readonly available?: boolean) {}

  static create(availableRaw?: unknown): [string, undefined] | [undefined, SoftDeleteFilterDto] {
    if (availableRaw === undefined || availableRaw === null || availableRaw === '') {
      return [undefined, new SoftDeleteFilterDto(undefined)];
    }

    if (availableRaw === 'true' || availableRaw === true) {
      return [undefined, new SoftDeleteFilterDto(true)];
    }

    if (availableRaw === 'false' || availableRaw === false) {
      return [undefined, new SoftDeleteFilterDto(false)];
    }

    return ['Available must be a boolean (true, false)', undefined];
  }
}