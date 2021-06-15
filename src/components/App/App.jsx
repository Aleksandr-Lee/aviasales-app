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

  const filterTickets = useCallback(
    (ticket) => {
      const allCheckbox = checkboxes[0].checked;
      if (allCheckbox) return ticket;
      return checkboxes.reduce((newArr, checkbox) => {
        const arrFilterTickets = ticket.filter(
          (item) =>
            (checkbox.checked &&
              item.segments[0].stops.length === checkbox.filter) ||
            (checkbox.checked &&
              item.segments[1].stops.length === checkbox.filter)
        );
        return newArr.concat(...arrFilterTickets);
      }, []);
    },
    [checkboxes]
  );

  const sortButton = useCallback(
    (ticket) => {
      if (sortButtons[0].active) {
        return ticket.sort((prev, next) => prev.price - next.price);
      }
      if (sortButtons[1].active) {
        return ticket.sort(
          (prev, next) =>
            prev.segments[0].duration +
            prev.segments[1].duration -
            (next.segments[0].duration + next.segments[1].duration)
        );
      }
      return ticket;
    },
    [sortButtons]
  );

  const resultFlteredTickets = sortButton(filterTickets(tickets));
  useEffect(() => {
    dispatch(actionFilteredTickets(resultFlteredTickets));
  }, [dispatch, tickets, sortButtons, sortButton, resultFlteredTickets]);

  const ticketsDisplay = useCallback(() => {
    new TicketsService()
      .getTickets(searchId)
      .then((ticket) => {
        dispatch(actionTickets(ticket.tickets));
        if (ticket.stop === false) {
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
    new TicketsService().getSearchId().then((id) => {
      dispatch(actionSearchId(id.searchId));
    });
  }, [dispatch]);

  useEffect(() => {
    if (searchId !== null) {
      ticketsDisplay();
    }
  }, [dispatch, searchId, ticketsDisplay]);

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
