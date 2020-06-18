import jwt from 'jsonwebtoken';

require('dotenv').config();

const expiresIn = process.env.EXPIRES_IN || '365d';
const secret = process.env.SECRET || 'secret';

export function sign(data: any, options?: any) {
    return jwt.sign(data, secret, {
        ...options,
        expiresIn,
    });
}

export function verify(token: string): any {
    return jwt.verify(token, secret);
}
