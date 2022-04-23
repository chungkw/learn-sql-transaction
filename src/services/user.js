const pool = require('../config/connector');

module.exports = {
    async createOne(username, description) {
        const conn = await pool.getConnection();

        // start a transaction on the connection
        await conn.beginTransaction();

        try {
            const sql = `
                INSERT INTO user (username, description)
                VALUES (?, ?);
            `;

            // the execute method can protect from sql injection attacks
            // by separating the data from the command
            // https://github.com/sidorares/node-mysql2#using-prepared-statements
            const [rows, fields] = await conn.execute(sql, [username, description]);

            // commit the changes
            await conn.commit();

            conn.release();
            return rows[0];
        }
        catch (error) {
            // undo changes
            await conn.rollback();

            // should release a connection always
            conn.release();
            // propagate error to caller
            throw error;
        }
    },

    async createOneFaulty(username, description) {
        const conn = await pool.getConnection();

        // start a transaction on the connection
        await conn.beginTransaction();

        try {
            const sql = `
                INSERT INTO user (username, description)
                VALUES (?, ?);
            `;

            // the execute method can protect from sql injection attacks
            // by separating the data from the command
            // https://github.com/sidorares/node-mysql2#using-prepared-statements
            const [rows, fields] = await conn.execute(sql, [username, description]);

            throw new Error('a stupid error for no good reason');

            // commit the changes
            await conn.commit();

            conn.release();
            return rows[0];
        }
        catch (error) {
            // undo changes
            await conn.rollback();

            // should release a connection always
            conn.release();
            // propagate error to caller
            throw error;
        }
    },

    async getMany() {
        const conn = await pool.getConnection();

        try {
            const sql = `
                SELECT * FROM user
            `;

            const [rows, fields] = await conn.execute(sql);

            conn.release();
            return rows;
        }
        catch (error) {
            conn.release();
            throw error;
        }
    },

    async getOne(userId) {
        const conn = await pool.getConnection();

        try {
            const sql = `
                SELECT * FROM user
                WHERE user_id = ?
            `;

            const [rows, fields] = await conn.execute(sql, [userId]);

            conn.release();
            return rows[0];
        }
        catch (error) {
            conn.release();
            throw error;
        }
    }
};
