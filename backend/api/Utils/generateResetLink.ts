import { sign } from './JwtToken';

export default function generateResetLink(email: string) {
    const token = sign({
        email,
    },
        {
            expiresIn: '10m',
        });

    const port = process.env.PORT || 3333;
    let callbackPrefix;

    if (process.env.NODE_ENV === 'production') {
        callbackPrefix = 'https://thehuntermissions.herokuapp.com';
    } else {
        callbackPrefix = `http://localhost:${port}`;
    }

    return `${callbackPrefix}/reset-password?resetToken=${token}`;
}
