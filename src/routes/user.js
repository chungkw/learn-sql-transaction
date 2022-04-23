const router = require('express').Router();

const userCtrl = require('../controllers/user');

router.post('/', userCtrl.create);
router.post('/stupid', userCtrl.createFaulty);

router.get('/', userCtrl.getAll);

router.get('/:userId', userCtrl.getOne);

module.exports = router;
