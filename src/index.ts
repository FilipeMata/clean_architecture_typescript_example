
import UUIDUniqueEntityIDGenerator from './infrastructure/plugins/uuid-id-generator'
import { loadModels, unloadModels } from './infrastructure/db/models';
import { startHttpServer, shutdownHttpServer } from './http-server';
import { loadContainer } from './infrastructure/container';
import { AwilixContainer } from 'awilix';
import { UniqueEntityIDGeneratorFactory } from '@entities';

declare global {
    namespace Express {
        export interface Request {
            container: AwilixContainer
        }
    }
}

function setupIdFactories() {
    const factories = {
        'default': new UUIDUniqueEntityIDGenerator()
    };

    UniqueEntityIDGeneratorFactory
        .getInstance()
        .initialize(factories);

    console.log('Entity ID Generators initialized');
}

/** init DB models and modules */
let server: any = null;

async function init() {
    try {
        await loadModels();
        const container = loadContainer();

        setupIdFactories();

        server = startHttpServer(container);

        console.log('Bootstrapped');
    } catch (err) {
        console.log('Bootstrap error', err);
        shutdown(1, server);
    }
}

async function shutdown(exitCode: number, server: any) {
    console.info('Shutting down');

    const stopHttpServer = async () => {
        try {
            await shutdownHttpServer(server);
            console.info('HTTP server closed');
        } catch (err) {
            console.error('HTTP server shutdown error', { err });
        }
    };

    // @ts-ignore
    await Promise.allSettled([
        stopHttpServer()
    ]);

    try {
        unloadModels();
        console.info('Database connections closed');
    } catch (err) {
        console.error('Databases shutdown error', { err });
    }

    console.info('Bye');
    process.exit(exitCode);
}

init();