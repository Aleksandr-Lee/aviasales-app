import actionTypes from '../actionTypes';

const initialState = {
  tickets: [],
  filteredTickets: [],
  searchId: null,
  completeDownload: false,
  errorDownloadTickets: 0,
};

const ticketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.getTickets:
      return {
        ...state,
        tickets: [...state.tickets, ...action.tickets],
      };
    case actionTypes.getFilteredTickets:
      return {
        ...state,
        filteredTickets: action.filteredTickets,
      };
    case actionTypes.getSearchId:
      return {
        ...state,
        searchId: action.searchId,
      };
    case actionTypes.completeRequest:
      return {
        ...state,
        completeDownload: true,
      };
    case actionTypes.errorDownloadTickets:
      return {
        ...state,
        errorDownloadTickets: state.errorDownloadTickets + 1,
      };
    case actionTypes.completeDownload:
      return {
        ...state,
        completeDownload: true,
      };
    default:
      return state;
  }
};

export default ticketsReducer;
