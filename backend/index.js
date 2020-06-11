const app = require('./api/app');

let port = process.env.PORT_DEV || 3333;

if (process.env.NODE_ENV === 'production') {
    port = process.env.PORT_PROD || 80;
}

app.listen(port);
