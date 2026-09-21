export class PaginationDto {
  private constructor(
    public readonly page: number,
    public readonly limit: number,
  ) {}

  static create(page: any = 1, limit: any = 10): [string, undefined] | [undefined, PaginationDto] {
    
    if (typeof page === 'object' && page !== null) {
      const obj = page;
      page = Number(obj.page ?? 1);
      limit = Number(obj.limit ?? 10);
    } else {
      page = Number(page);
      limit = Number(limit);
    }

    if (isNaN(page) || isNaN(limit)) {
      return ['Page and Limit must be numbers', undefined];
    }

    if (page <= 0) {
      return ['Page must be greater than 0', undefined];
    }

    if (limit <= 0) {
      return ['Limit must be greater than 0', undefined];
    }

    return [undefined, new PaginationDto(page, limit)];
  }
}