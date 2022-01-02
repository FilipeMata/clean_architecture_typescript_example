import { SequelizeUnitOfWork } from '@infrastructure/db/sequelize-unit-of-work';
import { AwilixContainer, asValue } from 'awilix';
import { Request, Response, NextFunction } from 'express';
import ExpressResponseHandler from '../express-response-handler';


export default (container: AwilixContainer) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const scope = container.createScope();

    scope.register({
      httpResponseHandler: asValue(new ExpressResponseHandler<any>(res)),
      unitOfWork: asValue(new SequelizeUnitOfWork())
    });

    req.container = scope;

    next();
  };
};

