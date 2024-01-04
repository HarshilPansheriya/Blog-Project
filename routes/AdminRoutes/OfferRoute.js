const route = require('express').Router();
const offerCtrl = require('../../controllers/Admin Controller/OfferController');

route.get('/', offerCtrl.addOffer);

route.post('/insertOffer', offerCtrl.insertOffer);

module.exports = route;