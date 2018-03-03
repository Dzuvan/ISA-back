const express = require('express');

const router = express.Router();
const checkAuth = require('../middlware/check-auth');

const TicketController = require('../controllers/tickets');

router.get('/', checkAuth, TicketController.tickets_get_all);

router.get('/:ticketId', checkAuth, TicketController.tickets_get_one);

router.post('/', checkAuth, TicketController.tickets_add_one);

router.delete('/:ticketId', checkAuth, TicketController.tickets_delete_one);

router.patch('/:ticketId', checkAuth, TicketController.tickets_update_one);

module.exports = router;
