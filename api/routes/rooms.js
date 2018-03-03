const express = require('express');

const router = express.Router();
const checkAuth = require('../middlware/check-auth');

const RoomControler = require('../controllers/rooms');

router.get('/', RoomControler.rooms_get_all);

router.post('/', checkAuth, RoomControler.rooms_add_one);

router.get('/:roomId', RoomControler.rooms_get_one);

router.patch('/:roomId', checkAuth, RoomControler.rooms_update_one);

router.delete('/:roomId', checkAuth, RoomControler.rooms_delete_one);

module.exports = router;
