const Offer = require('../../model/offerModel');

module.exports.addOffer = async (req, res) => {
    return res.render('AdminPanel/addOffer');
}

module.exports.insertOffer = async (req, res) => {
    let data = await Offer.create(req.body)
    if (data) {
        req.flash('success', "Offer Inserted Successfully");
        return res.redirect('back');
    } else {
        req.flash('error', "Offer not inserted");
        return res.redirect('back');
    }
}