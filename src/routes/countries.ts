const router = require('express').Router();
let Country = require('../models/countries.model')

type RequestItemType = {
    title: string,
    time: string,
    icon: string,
    id: string,
    userId: string,
    countryId: string,
    stars: string,
    text: string
}

type RequestType = {
    body: RequestItemType,
    params: RequestItemType,
}

type ResponceType = {
    status: (value: number) => any;
    json: (value: Array<RequestType> | String | Object) => RequestType;
}

router.route('/').get((_req: RequestType, res: ResponceType) => {
    Country.find()
        .then((categories: Array<Object>) => res.json(categories))
        .catch((err: string) => {
            return res.status(400).json('Error: ' + err);
        });
});

router.route('/:id').get((req: RequestType, res: ResponceType) => {
    Country.findById(req.params.id)
        .then((list: Object) => res.json(list))
        .catch((err: String) => res.status(400).json(err))
});

module.exports = router;