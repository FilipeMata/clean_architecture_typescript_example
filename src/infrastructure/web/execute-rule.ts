import { Request, Response, NextFunction } from 'express';

export default  function executeRule(rule: string) {
  return async (request: Request, res: Response, next: NextFunction) => {
    const container = request.container;

    const controller: any = container.resolve(`${rule}Controller`);

    try {
      return await controller.run(request, res, next);
    } catch (err) {
      console.error(err.message, { err: err });

      return res.status(500).json({
        name: 'unexpected_failure',
        description: 'Unexpected server error'
      });
    }
  };
}