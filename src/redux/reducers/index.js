import { combineReducers } from 'redux';
import filtersCheckboxReducer from './filtersCheckbox';
import ticketsReducer from './tickets';
import sortTicketsReducer from './sortTickets';

const rootReducer = combineReducers({
  filtersCheckboxReducer,
  ticketsReducer,
  sortTicketsReducer,
});

export default rootReducer;
