'use strict';
module.exports = (sequelize, DataTypes) => {
  const SequelizeReservation = sequelize.define('Reservation', {
    name: DataTypes.STRING,
    slot: DataTypes.DATE
  }, {});

  class Reservation extends SequelizeReservation {
    static async all(){
      return await this.findAll();
    }

    static async add(rsvp){
      const date = new Date(rsvp.slot);
      return await this.findOrCreate({ where: { slot: date }, defaults: { name: rsvp.name, slot: date } });
    }
  }

  return Reservation;
};
