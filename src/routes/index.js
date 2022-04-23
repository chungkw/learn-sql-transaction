const router = require('express').Router();

const userRoutes = require('./user');

router.get('/', (req, res) => {
    res.status(200).send('hello');
});

router.use('/users', userRoutes);

module.exports = router;
