import logger from './Logger';
const { v4: uuidv4 } = require('uuid');

export const pErr = (err: Error) => {
    if (err) {
        logger.error(err);
    }
};

export const getRandomInt = () => {
    return Math.floor(Math.random() * 1_000_000_000_000);
};

export const genereateUUID = () => {
    return new uuidv4();
}
