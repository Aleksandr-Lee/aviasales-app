import reduxTypes from '../reduxTypes';

export const actionTickets = (tickets) => ({
  type: reduxTypes.getTickets,
  tickets,
});

export const actionFilteredTickets = (filteredTickets) => ({
  type: reduxTypes.getFilteredTickets,
  filteredTickets,
});

export const actionSearchId = (searchId) => ({
  type: reduxTypes.getSearchId,
  searchId,
});

export const actionCompleteRequest = () => ({
  type: reduxTypes.completeRequest,
});

export const actionErrorDownloadTickets = () => ({
  type: reduxTypes.errorDownloadTickets,
});

export const actionCompleteDownload = () => ({
  type: reduxTypes.completeDownload,
});
