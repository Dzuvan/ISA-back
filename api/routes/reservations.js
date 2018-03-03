const express = require('express');

const router = express.Router();
const checkAuth = require('../middlware/check-auth');

const ReservationController = require('../controllers/reservations');

router.get('/', checkAuth, ReservationController.reservations_get_all);

router.post('/', checkAuth, ReservationController.reservations_add_one);

router.get('/:reservationId', checkAuth, ReservationController.reservations_get_one);

router.patch('/:reservationId', checkAuth, ReservationController.reservations_update_one);

router.delete('/:reservationId', checkAuth, ReservationController.reservations_delete_one);

module.exports = router;
