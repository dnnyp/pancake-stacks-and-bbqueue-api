const { Reservation } = require('../../models');


test("Reservation.all() should return an array", async () =>{
  const result = await Reservation.all() ||  [];
  expect(result.length).toEqual(2);
});

test("Reservation.all() should return an array 2", async () =>{
  const result = await Reservation.all() ||  [];
  expect(result.length).toEqual(2);
});
