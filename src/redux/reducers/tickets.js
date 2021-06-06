import reduxTypes from '../reduxTypes';

const initialState = {
  tickets: [],
  filteredTickets: [],
  searchId: null,
  completeDownload: false,
  errorDownloadTickets: 0,
};

const ticketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case reduxTypes.getTickets:
      return {
        ...state,
        tickets: [...state.tickets, ...action.tickets],
      };
    case reduxTypes.getFilteredTickets:
      return {
        ...state,
        filteredTickets: action.filteredTickets,
      };
    case reduxTypes.getSearchId:
      return {
        ...state,
        searchId: action.searchId,
      };
    case reduxTypes.completeRequest:
      return {
        ...state,
        completeDownload: true,
      };
    case reduxTypes.errorDownloadTickets:
      return {
        ...state,
        errorDownloadTickets: state.errorDownloadTickets + 1,
      };
    case reduxTypes.completeDownload:
      return {
        ...state,
        completeDownload: true,
      };
    default:
      return state;
  }
};

export default ticketsReducer;
