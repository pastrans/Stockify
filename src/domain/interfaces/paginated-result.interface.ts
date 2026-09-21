// src/domain/interfaces/paginated-result.interface.ts
export interface PaginatedResult<T> {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  prev: string | null;
  next: string | null;
  data: T[];
}