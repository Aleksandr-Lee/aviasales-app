/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './App.module.scss';
import Header from '../Header';
import FilterTransfer from '../FilterTransfer';
import TabSort from '../TabSort';
import TicketList from '../TicketList';
import TicketsService from '../../services/TicketsService';
import {
  actionTickets,
  actionSearchId,
  actionCompleteRequest,
  actionFilteredTickets,
  actionCompleteDownload,
  actionErrorDownloadTickets,
} from '../../redux/actions/tickets';

const App = () => {
  const ticketsService = new TicketsService();
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.ticketsReducer.tickets);
  const searchId = useSelector((state) => state.ticketsReducer.searchId);
  const sortButtons = useSelector((state) => state.sortTicketsReducer.button);
  const checkboxes = useSelector(
    (state) => state.filtersCheckboxReducer.checkbox
  );
  const errorDownloadTickets = useSelector(
    (state) => state.ticketsReducer.errorDownloadTickets
  );

  const filterTickets = (ticket) => {
    const newArrFilterTickets = [];
    if (checkboxes[0].checked) return ticket;
    checkboxes.forEach((checkbox) => {
      const arrFilterTickets = ticket.filter((item) => {
        if (
          (checkbox.checked &&
            item.segments[0].stops.length === checkbox.filter) ||
          (checkbox.checked &&
            item.segments[1].stops.length === checkbox.filter)
        ) {
          return true;
        }
        return false;
      });
      return newArrFilterTickets.push(...arrFilterTickets);
    });
    return newArrFilterTickets;
  };

  const sortButton = (tickets) => {
    if (sortButtons[0].active) {
      return tickets.sort((prev, next) => prev.price - next.price);
    }
    if (sortButtons[1].active) {
      return tickets.sort(
        (prev, next) =>
          prev.segments[0].duration +
          prev.segments[1].duration -
          (next.segments[0].duration + next.segments[1].duration)
      );
    }
    return tickets;
  };

  const resultFlteredTickets = sortButton(filterTickets(tickets));
  useEffect(() => {
    dispatch(actionFilteredTickets(resultFlteredTickets));
  }, [dispatch, tickets, filterTickets, sortButtons, checkboxes]);

  const ticketsDisplay = useCallback(() => {
    ticketsService
      .getTickets(searchId)
      .then((tickets) => {
        dispatch(actionTickets(tickets.tickets));
        if (tickets.stop === false) {
          ticketsDisplay();
        } else {
          dispatch(actionCompleteRequest());
        }
      })
      .catch(() => {
        if (errorDownloadTickets > 5) {
          dispatch(actionCompleteDownload());
        } else {
          dispatch(actionErrorDownloadTickets());
        }
      });
  }, [searchId, dispatch, errorDownloadTickets]);

  useEffect(() => {
    ticketsService.getSearchId().then((searchId) => {
      dispatch(actionSearchId(searchId.searchId));
    });
  }, [dispatch]);

  useEffect(() => {
    if (searchId !== null) {
      ticketsDisplay();
    }
  }, [dispatch, ticketsDisplay]);

  return (
    <div>
      <Header />
      <div className={classes.content}>
        <FilterTransfer />
        <div className={classes.ticket__filter}>
          <TabSort />
          <TicketList />
        </div>
      </div>
    </div>
  );
};

export default App;
