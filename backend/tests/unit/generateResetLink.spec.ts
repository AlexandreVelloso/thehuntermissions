import generateResetLink from '../../api/Utils/generateResetLink';
import { verify } from '../../api/Utils/JwtToken';

describe('Reset password - generateResetLink', () => {
    it('should generate a link with a valid jwt token', () => {
        const link = generateResetLink('user@email.com');

        expect(link).toMatch(/http:\/\/localhost:\d+\/reset-password\?resetToken=.*/);

        const token = link.replace(/http:\/\/localhost:\d+\/reset-password\?resetToken=/, '');
        expect(verify(token)).toHaveProperty('email');
    });
});
