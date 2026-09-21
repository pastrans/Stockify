import { PaginationDto } from '../dtos/shared/pagination.dto';
import { SoftDeleteFilterDto } from '../dtos/shared/soft-delete-filter.dto';
import {UserFilterDto} from '../dtos/user/user-filter.dto'

export interface UserQueryOptions {
  pagination: PaginationDto;
  softDelete: SoftDeleteFilterDto;
  filters?: UserFilterDto;
}