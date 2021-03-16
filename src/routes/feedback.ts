const feedbackRouter = require('express').Router();
let Feedback = require('../models/feedback.model')
let CountryModel = require('../models/countries.model')

feedbackRouter.route('/').post((req: RequestType, res: ResponceType) => {
    const userName = req.body.userName
    const countryId = req.body.countryId
    const stars = req.body.stars
    const text = req.body.text

    const newFeedback = new Feedback({
        userName,
        countryId,
        stars,
        text
    });

    newFeedback.save((err: string) => {
        if (err) throw err;
        CountryModel.findByIdAndUpdate(countryId, {$push: {feedback: newFeedback}})
            .then(res.json('Feedback added'))
    })
});

module.exports = feedbackRouter;