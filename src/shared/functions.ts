import logger from './Logger';
import { v4 as uuid } from 'uuid';

export const pErr = (err: Error) => {
    if (err) {
        logger.error(err);
    }
};

export const getRandomInt = () => {
    return Math.floor(Math.random() * 1_000_000_000_000);
};

export const genereateUUID = () => {
    return uuid();
}