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
      return await this.create({ name: rsvp.name, slot: new Date(rsvp.slot) });
    }
  }

  return Reservation;
};
