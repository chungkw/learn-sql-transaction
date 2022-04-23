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

            const [rows, fields] = await conn.query(sql, [username, description]);

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

            const [rows, fields] = await conn.query(sql, [username, description]);

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

            const [rows, fields] = await conn.query(sql);

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

            const [rows, fields] = await conn.query(sql, [userId]);

            conn.release();
            return rows[0];
        }
        catch (error) {
            conn.release();
            throw error;
        }
    }
};
