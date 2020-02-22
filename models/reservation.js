'use strict';

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const SequelizeReservation = sequelize.define('Reservation', {
    name: DataTypes.STRING,
    slot: DataTypes.DATE
  }, {});

  class Reservation extends SequelizeReservation {
    // return upcoming reservations
    static async all(){
      return await this.findAll({
        where: {
          slot: {
            [Op.gte]: moment().subtract(30, 'm')
          }
        }
      });
    }

    // return count of reservations for a specific slot
    static async count(slot){
      const count = await this.findAll({
        attributes: [[sequelize.fn('COUNT', sequelize.col('slot')), 'slots']],
        where: {
          slot: {
            [Op.eq]: moment(slot)
          }
        }
      });

      return count[0].dataValues.slots;
    }

    // add a new reservation
    static async add(rsvp){
      const date = moment(rsvp.slot);

      return await this.create({ name: rsvp.name, slot: date });
    }
  }

  return Reservation;
};
