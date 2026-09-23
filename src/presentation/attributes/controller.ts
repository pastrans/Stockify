import { Request, Response, NextFunction } from 'express';
import {
  AttributeRepository,
  CreateAttributeDto,
  UpdateAttributeDto,
  PaginationDto,
  SoftDeleteFilterDto,
  CustomError,
  CreateAttribute,
  GetAttributes,
  GetAttributeById,
  UpdateAttribute,
  DeleteAttribute,
  CreateAttributeValueDto,
  UpdateAttributeValueDto,
  AddAttributeValue,
  UpdateAttributeValue,
  DeleteAttributeValue
} from '../../domain';

export class AttributeController {
  constructor(private readonly attributeRepository: AttributeRepository) {}

  createAttribute = (req: Request, res: Response, next: NextFunction) => {
    const [error, createDto] = CreateAttributeDto.create(req.body);
    if (error) return next(CustomError.badRequest(error));

    new CreateAttribute(this.attributeRepository)
      .execute(createDto!)
      .then((data) => res.status(201).json(data))
      .catch(next);
  };

  getAttributes = (req: Request, res: Response, next: NextFunction) => {
    const { page = 1, limit = 10, available } = req.query;

    const [paginationError, paginationDto] = PaginationDto.create(+page, +limit);
    if (paginationError) return next(CustomError.badRequest(paginationError));

    const [softDeleteError, softDeleteDto] = SoftDeleteFilterDto.create(available);
    if (softDeleteError) return next(CustomError.badRequest(softDeleteError));

    new GetAttributes(this.attributeRepository)
      .execute({ pagination: paginationDto!, softDelete: softDeleteDto! })
      .then((data) => res.json(data))
      .catch(next);
  };

  getAttributeById = (req: Request, res: Response, next: NextFunction) => {
    const id = +req.params.id!;
    if (isNaN(id)) return next(CustomError.badRequest('Id must be a number'));

    new GetAttributeById(this.attributeRepository)
      .execute(id)
      .then((data) => res.json(data))
      .catch(next);
  };

  updateAttribute = (req: Request, res: Response, next: NextFunction) => {
    const id = +req.params.id!;
    const [error, updateDto] = UpdateAttributeDto.create({ ...req.body, id });
    if (error) return next(CustomError.badRequest(error));

    new UpdateAttribute(this.attributeRepository)
      .execute(updateDto!)
      .then((data) => res.json(data))
      .catch(next);
  };

  deleteAttribute = (req: Request, res: Response, next: NextFunction) => {
    const id = +req.params.id!;
    if (isNaN(id)) return next(CustomError.badRequest('Id must be a number'));

    new DeleteAttribute(this.attributeRepository)
      .execute(id)
      .then((data) => res.json(data))
      .catch(next);
  };
  
  addValue = (req: Request, res: Response, next: NextFunction) => {
    const attributeId = +req.params.id!;
    if (isNaN(attributeId)) return next(CustomError.badRequest('Attribute id must be a number'));

    const [error, createValueDto] = CreateAttributeValueDto.create({ ...req.body, attributeId });
    if (error) return next(CustomError.badRequest(error));

    new AddAttributeValue(this.attributeRepository)
      .execute(attributeId, createValueDto!)
      .then((data) => res.status(201).json(data))
      .catch(next);
  };

  updateValue = (req: Request, res: Response, next: NextFunction) => {
    const valueId = +req.params.valueId!;
    if (isNaN(valueId)) return next(CustomError.badRequest('Value id must be a number'));

    const [error, updateValueDto] = UpdateAttributeValueDto.create({ ...req.body, id: valueId });
    if (error) return next(CustomError.badRequest(error));

    new UpdateAttributeValue(this.attributeRepository)
      .execute(updateValueDto!)
      .then((data) => res.json(data))
      .catch(next);
  };

  deleteValue = (req: Request, res: Response, next: NextFunction) => {
    const valueId = +req.params.valueId!;
    if (isNaN(valueId)) return next(CustomError.badRequest('Value id must be a number'));

    new DeleteAttributeValue(this.attributeRepository)
      .execute(valueId)
      .then((data) => res.json(data))
      .catch(next);
  };

}