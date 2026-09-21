export class UserFilterDto {
  private constructor(
    public readonly search?: string,
    //public readonly role?: string,
  ) {}

  static create(query: Record<string, unknown>): [string, undefined] | [undefined, UserFilterDto] {
    const search = typeof query.search === 'string' ? query.search : undefined;
    //const role = typeof query.role === 'string' ? query.role : undefined;

    return [undefined, new UserFilterDto(search)];
  }
}