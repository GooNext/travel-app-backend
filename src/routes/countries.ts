const router = require("express").Router();
let Country = require("../models/countries.model");
let countriesLocale = require("../models/countriesLocale.model");

type RequestItemType = {
  title: string;
  time: string;
  icon: string;
  id: string;
  userId: string;
  countryId: string;
  stars: string;
  text: string;
  locale: string;
};

type RequestType = {
  body: RequestItemType;
  params: RequestItemType;
};

type ResponceType = {
  status: (value: number) => any;
  json: (value: Array<RequestType> | String | Object) => RequestType;
};

router.route("/:locale").get((req: RequestType, res: ResponceType) => {
  countriesLocale
    .find({ language: req.params.locale })
    .then((localeCountries: Array<Object>) => {
      const data = localeCountries;
      Country.find().then((country: any) => {
        data.map((locale: any, index) => {
          const findedCountry = country.find(
            (e: any) => e._doc.increment === locale._doc.increment
          );
          data[index] = {
            ...findedCountry._doc,
            description: locale._doc.description,
            name: locale._doc.name,
            capital: locale._doc.capital,
          };
        });
        res.json(data);
      });
    })
    .catch((err: string) => {
      return res.status(400).json("Error: " + err);
    });
});

router.route("/:id/:locale").get((req: RequestType, res: ResponceType) => {
  Country.findById(req.params.id)
    .then((list: any) => {
        countriesLocale
            .find({ language: req.params.locale, increment: list._doc.increment })
                .then((locale: any) => {
                    res.json({
                        ...list._doc,             
                        description: locale[0]._doc.description,
                        name: locale[0]._doc.name,
                        capital: locale[0]._doc.capital,})
                })
    })
    .catch((err: String) => res.status(400).json(err));
});

module.exports = router;
