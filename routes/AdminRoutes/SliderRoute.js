const route = require('express').Router();
const sliderCtrl = require('../../controllers/Admin Controller/SliderController');
const Slider = require('../../model/Slider.Model');


route.get('/', sliderCtrl.addSlider);

route.post('/insertSlider', Slider.uploadedAvatar, sliderCtrl.insertSlider);

module.exports = route;