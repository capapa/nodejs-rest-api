const express = require("express");
const Human = require("../models/human");

const router = express.Router();

router.get("/humans", (req, res, next) => {
  Human.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
        },
        maxDistance: 100000,
        spherical: true,
        distanceField: "distance",
      },
    },
  ])
    //   Human.find({
    //     geometry: {
    //       $near: {
    //         $maxDistance: 100000,
    //         $distanceField: "distance",
    //         $geometry: {
    //           type: "Point",
    //           coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
    //         },
    //       },
    //     },
    //   })
    .then((human) => res.send(human))
    .catch(next);
});

router.post("/humans", (req, res, next) => {
  Human.create(req.body)
    .then((result) => {
      res.send(result);
    })
    .catch(next);
});

router.put("/humans/:id", (req, res, next) => {
  Human.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(() => {
      Human.findOne({ _id: req.params.id }).then((human) => res.send(human));
    })
    .catch(next);
});

router.delete("/humans/:id", (req, res, next) => {
  Human.findByIdAndRemove({ _id: req.params.id })
    .then(res.send({ type: "DELETE" }))
    .catch(next);
});

module.exports = router;
