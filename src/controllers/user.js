const userSvc = require('../services/user');

module.exports.create = async (req, res, next) => {
    try {
        const {
            username,
            description
        } = req.body;

        const results = await userSvc.createOne(username, description);

        res.status(200).json(results);
        return next();
    }
    catch (error) {
        return next(error);
    }
};

module.exports.createFaulty = async (req, res, next) => {
    try {
        const {
            username,
            description
        } = req.body;

        const results = await userSvc.createOneFaulty(username, description);

        res.status(200).json(results);
        return next();
    }
    catch (error) {
        return next(error);
    }
};

module.exports.getAll = async (req, res, next) => {
    try {
        const results = await userSvc.getMany();

        console.log(!!results, results);

        res.status(200).json(results);
        return next();
    }
    catch (error) {
        return next(error);
    }
};

module.exports.getOne = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const results = await userSvc.getOne(userId);

        console.log(!!results, results);

        res.status(200).json(results);
        return next();
    }
    catch (error) {
        return next(error);
    }
};
