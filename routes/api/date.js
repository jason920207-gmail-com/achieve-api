const express = require('express');
const router = express.Router();
const DateObj = require('../../models/Date');
router.get('/', (req, res) => {
  DateObj.find()
    .sort({ timestamps: -1 })
    .then(dates => {
      res.json(dates);
    })
    .catch(err => res.status(400).json({ errors: err }))
})
module.exports = router;