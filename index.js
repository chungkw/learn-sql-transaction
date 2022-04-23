const express = require('express');

const mainRouter = require('./src/routes');
const errorHandler = require('./src/middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use(mainRouter);
app.use(errorHandler);

app.listen(3000, () => {
    console.log('READY');
});
