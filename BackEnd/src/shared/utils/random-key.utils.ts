import crypto from 'crypto';

export const generateKey = (value: string): string => {
    return crypto.createHash('sha256').update(value).digest('base64');
};
