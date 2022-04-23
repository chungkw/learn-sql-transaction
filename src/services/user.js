const pool = require('../config/connector');

module.exports = {
    async createOne(username, description) {
        const conn = await pool.getConnection();

        const sql = `
            INSERT INTO user (username, description)
            VALUES (?, ?);
        `;

        const [rows, fields] = await conn.query(sql, [username, description]);

        conn.release();
        return rows[0];
    },

    async createOneFaulty(username, description) {
        const conn = await pool.getConnection();
        await conn.beginTransaction();

        try {
            const sql = `
                INSERT INTO user (username, description)
                VALUES (?, ?);
            `;

            const [rows, fields] = await conn.query(sql, [username, description]);

            throw new Error('a stupid error for no good reason');

            await conn.commit();
            conn.release();
            return rows[0];
        }
        catch (error) {
            await conn.rollback();
            throw error;
        }
    },

    async getMany() {
        const conn = await pool.getConnection();

        const sql = `
            SELECT * FROM user
        `;

        const [rows, fields] = await conn.query(sql);

        conn.release();
        return rows;
    },

    async getOne(userId) {
        const conn = await pool.getConnection();

        const sql = `
            SELECT * FROM user
            WHERE user_id = ?
        `;

        const [rows, fields] = await conn.query(sql, [userId]);

        conn.release();
        return rows[0];
    }
};
