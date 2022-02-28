import './load-env';
import cookieParser from 'cookie-parser';
import path from 'path';

import express, { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from 'http-status-codes';
import 'express-async-errors';

import BaseRouter from './infrastructure/web/routes';
import { Server } from 'http';

import createScopeContainer from '@infrastructure/web/middlewares/create-scope-container.middleware';
import { AwilixContainer } from 'awilix';

export function startHttpServer(container: AwilixContainer) {
    const app = express();
    
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    app.use(createScopeContainer(container));
    
    app.use('/api', BaseRouter);
    
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        req; next;
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    });
    
    const staticDir = path.join(__dirname, 'public');
    app.use(express.static(staticDir));
    
    const port = Number(process.env.PORT || 3000);
    app.listen(port, () => {
        console.log('Express server started on port: ' + port);
    });

    return Server;
}

export const shutdownHttpServer = async (server: any) => {
    return new Promise<void>((resolve, reject) => {
        server.shutdown(async (err: Error) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

