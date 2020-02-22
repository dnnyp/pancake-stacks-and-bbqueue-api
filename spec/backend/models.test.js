const { Reservation } = require('../../models');


test("Reservation.all() should return an array", async () =>{
  const result = await Reservation.all() ||  [];
  expect(result.length).toEqual(2);
});

test("Reservation.all() should return an array", async () =>{
  const result = await Reservation.all() ||  [];
  expect(result.length).toEqual(24);
});

test("Reservation.all() should return an array", async () =>{
  const result = await Reservation.all() ||  [];
  expect(result.length).toEqual(23);
});
