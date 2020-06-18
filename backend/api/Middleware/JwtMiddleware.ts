import { Response } from 'express';

import { verify } from '../Utils/JwtToken';
import UserCredentials from '../Models/UserCredentials';

class JwtMiddleware {
    static handle(req: any, res: Response, next: any) {
        try {
            const { authorization = '' } = req.headers;

            const token: string = authorization.substring(7);
            const user: UserCredentials = verify(token);

            req.auth = { user };

            next();
        } catch (err) {
            return res.status(401).json({
                error: 'Invalid token',
            });
        }
    }
}

export default JwtMiddleware;
