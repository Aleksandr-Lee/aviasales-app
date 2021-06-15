import React from 'react';
import PropTypes from 'prop-types';
import constants from '../../constants';
import classes from './Ticket.module.scss';

const HOURS_IN_DAY = 24;
const MINUTES_IN_HOUR = 60;
const SECONDS_IN_MINUTE = 60;
const MILLISECONDS_IN_SECOND = 1000;

const Ticket = ({ price, segments, carrier }) => {
  const timeDepartureOfArrival = (duration) => {
    let hours = parseInt(
      (duration /
        (MILLISECONDS_IN_SECOND * SECONDS_IN_MINUTE * MINUTES_IN_HOUR)) %
        HOURS_IN_DAY,
      10
    );
    let minutes = parseInt(
      (duration / (MILLISECONDS_IN_SECOND * SECONDS_IN_MINUTE)) %
        MINUTES_IN_HOUR,
      10
    );
    hours = `0${hours}`.slice(-2);
    minutes = `0${minutes}`.slice(-2);
    return `${hours}:${minutes}`;
  };

  const travelTime = (min) => {
    const hours = `0${Math.trunc(min / MINUTES_IN_HOUR)}`.slice(-2);
    const minutes = `0${min % SECONDS_IN_MINUTE}`.slice(-2);
    return `${hours}ч ${minutes}м`;
  };

  const numberOfTransfers = (lenght) => {
    switch (lenght) {
      case 0:
        return constants.WITHOUT_TRANSFERS;
      case 1:
        return `${lenght} ${constants.TRANSFER}`;
      default:
        return `${lenght} ${constants.TRANSFERS}`;
    }
  };

  const segment = segments.map((item) => (
    <div key={item.origin}>
      <div className={classes.infoTransfer}>
        <p className={classes.infoTransfer__text}>
          {item.origin} – {item.destination}
        </p>
        <p className={classes.infoTransfer__text}>В ПУТИ</p>
        <p className={classes.infoTransfer__text}>
          {numberOfTransfers(item.stops.length)}
        </p>
      </div>
      <div className={classes.infoTime}>
        <p className={classes.infoTime__text}>
          {timeDepartureOfArrival(Date.parse(item.date))} –{' '}
          {timeDepartureOfArrival(
            item.duration * (MILLISECONDS_IN_SECOND * SECONDS_IN_MINUTE) +
              Date.parse(item.date)
          )}
        </p>
        <p className={classes.infoTime__text}>{travelTime(item.duration)}</p>
        <p className={`${classes.infoTime__text} ${classes.padding}`}>
          {item.stops.join(' ')}
        </p>
      </div>
    </div>
  ));

  return (
    <div className={classes.ticketInfo}>
      <div className={classes.ticketInfo__header}>
        <p className={classes.price}> {price.toLocaleString('ru')} Р </p>
        <img
          className={classes.airlineLogo}
          src={`http://pics.avs.io/99/36/${carrier}.png`}
          alt="logo"
        />
      </div>
      {segment}
    </div>
  );
};

Ticket.propTypes = {
  price: PropTypes.number,
  carrier: PropTypes.string,
  segments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Ticket.defaultProps = {
  price: 0,
  carrier: '',
};

export default Ticket;
