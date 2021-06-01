/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useSelector } from 'react-redux';
import Ticket from '../Ticket';
import LoadingIndicator from '../LoadingIndicator';
import classes from './TicketList.module.scss';

const TicketList = () => {
  const filteredTickets = useSelector(
    (state) => state.ticketsReducer.filteredTickets
  );
  const completeDownload = useSelector(
    (state) => state.ticketsReducer.completeDownload
  );
  const errorDownloadTickets = useSelector(
    (state) => state.ticketsReducer.errorDownloadTickets
  );

  const sliceTickets = filteredTickets.slice(0, 5);

  const ticket = sliceTickets.map((item, index) => (
    <Ticket
      key={item.price + item.carrier + index}
      price={item.price}
      segments={item.segments}
      carrier={item.carrier}
    />
  ));

  const loadingIndicator = !completeDownload ? <LoadingIndicator /> : null;

  if (!completeDownload && filteredTickets.length === 0) {
    return <LoadingIndicator />;
  }

  if (errorDownloadTickets > 5 && filteredTickets.length === 0) {
    return (
      <div className={classes.noResults}>
        <p>Ошибка, данные не получены. Повторите запрос</p>
      </div>
    );
  }

  if (filteredTickets.length === 0) {
    return (
      <div className={classes.noResults}>
        <p>Рейсов, подходящих под заданные фильтры, не найдено</p>
      </div>
    );
  }

  return (
    <div>
      {loadingIndicator}
      {ticket}
    </div>
  );
};

export default TicketList;
