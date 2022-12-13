const { createServiceCntrl, getAllServicesCntrl } = require('../controller/ServiceController')

const router = require('express').Router()

router 
    .route('/service')
    .post(createServiceCntrl)
    .get(getAllServicesCntrl)
    .put()
    .delete()

module.exports = router    