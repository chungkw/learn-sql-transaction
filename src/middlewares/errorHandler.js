module.exports = (error, req, res, next) => {
    console.log(error?.message ?? error);
    res.status(500).send('An intenral error occurred');
};
