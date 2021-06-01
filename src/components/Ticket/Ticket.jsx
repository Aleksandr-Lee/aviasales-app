/* eslint-disable react/prop-types */
import React from 'react';
import classes from './Ticket.module.scss';

const Ticket = ({ price, segments, carrier }) => {
  const timeDepartureOfArrival = (duration) => {
    let hours = parseInt((duration / 3600000) % 24, 10);
    let minutes = parseInt((duration / 60000) % 60, 10);
    hours = `0${hours}`.slice(-2);
    minutes = `0${minutes}`.slice(-2);
    return `${hours}:${minutes}`;
  };

  const travelTime = (min) => {
    const hours = `0${Math.trunc(min / 60)}`.slice(-2);
    const minutes = `0${min % 60}`.slice(-2);
    return `${hours}ч ${minutes}м`;
  };

  const numberOfTransfers = (lenght) => {
    switch (lenght) {
      case 0:
        return `БЕЗ ПЕРЕСАДОК`;
      case 1:
        return `${lenght} ПЕРЕСАДКА`;
      default:
        return `${lenght} ПЕРЕСАДКИ`;
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
            item.duration * 60000 + Date.parse(item.date)
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

export default Ticket;
