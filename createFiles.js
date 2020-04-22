const fs = require('fs');
const connection = require('./database/connection');

const generateRandomString = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i += 1) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

const generateSecret = () => {
    const secret = generateRandomString(64);
    const fd = fs.openSync('.env', 'w');
    fs.writeSync(fd, 'PORT=80\n');
    fs.writeSync(fd, `SECRET=${secret}\n`);
};

const migrateDatabase = async () => connection.migrate.latest();

module.exports = {
    async create() {
        try {
            fs.accessSync('.env');
        } catch (err) {
            await generateSecret();
        }

        try {
            fs.accessSync('./database/dev.sqlite');
        } catch (err) {
            await migrateDatabase();
        }
    },
};
