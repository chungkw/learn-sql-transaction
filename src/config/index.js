require('dotenv').config();

module.exports = {
    DATABASE: {
        HOST: process.env.db_host,
        PORT: process.env.db_port,
        USER: process.env.db_user,
        PASSWORD: process.env.db_password,
        NAME: process.env.db_name
    }
};
