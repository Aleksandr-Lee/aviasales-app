const initialState = {
  tickets: [],
  filteredTickets: [],
  searchId: null,
  completeDownload: false,
  errorDownloadTickets: 0,
};

const ticketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_TICKETS':
      return {
        ...state,
        tickets: [...state.tickets, ...action.tickets],
      };
    case 'GET_FILTRED_TICKETS':
      return {
        ...state,
        filteredTickets: action.filteredTickets,
      };
    case 'GET_SEARCH_ID':
      return {
        ...state,
        searchId: action.searchId,
      };
    case 'COMPLETE_REQUEST':
      return {
        ...state,
        completeDownload: true,
      };
    case 'ERROR_DOWNLOAD_TICKETS':
      return {
        ...state,
        errorDownloadTickets: state.errorDownloadTickets + 1,
      };
    case 'COMPLETE_DOWNLOAD':
      return {
        ...state,
        completeDownload: true,
      };
    default:
      return state;
  }
};

export default ticketsReducer;
