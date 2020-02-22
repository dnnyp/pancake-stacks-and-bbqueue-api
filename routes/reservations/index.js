const express = require('express');
const router = express.Router();
const { Reservation } = require('../../models');

const moment = require('moment');

router.get('/', async (req,res) => {
  res.json(await Reservation.all());
});

router.post('/', async (req,res) => {
  const rsvp = req.body.rsvp;

  // the requested slot and the slots 30 mins before and 30 mins after
  const requestedSlot = moment(rsvp.slot);
  const beforeSlot = requestedSlot.clone().subtract(30, 'm');
  const afterSlot = requestedSlot.clone().add(30, 'm');

  // if requested slot is between 1pm and 10pm
  if(requestedSlot.hours() > 1 && requestedSlot.hours() <= 22) {
    // count of reservations at the requested slot, and 30 mins before and after
    const requestedCount = await Reservation.count(requestedSlot);
    const beforeCount = await Reservation.count(beforeSlot);
    const afterCount = await Reservation.count(afterSlot);

    // total count of reservations at the first half of the requested slot
    const firstHalf = beforeCount + requestedCount;
    // total count of reservations at the second half of the requested slot
    const secondHalf = requestedCount + afterCount;
    // count of available tables at the requested slot
    const available = firstHalf > secondHalf ? 10 - firstHalf : 10 - secondHalf;

    // add a new reservation if there are tables available
    if(available > 0) {
      res.json(await Reservation.add(rsvp));
    } else {
      res.status(418).send('No available tables');
    }
  } else {
    res.status(418).send('Requested slot is not within open hours');
  }
});

module.exports = router;
