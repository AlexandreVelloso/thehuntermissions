const generateResetLink = require('../../api/utils/generateResetLink');
const jwtToken = require('../../api/utils/jwtToken');

describe('Reset password - generateResetLink', () => {
    it('should generate a link with a valid jwt token', () => {
        const link = generateResetLink('user@email.com');

        expect(link).toMatch(/http:\/\/localhost:\d+\/reset-password\?resetToken=.*/);

        const token = link.replace(/http:\/\/localhost:\d+\/reset-password\?resetToken=/, '');
        expect(jwtToken.verify(token)).toHaveProperty('email');
    });
});
