import actionTypes from '../actionTypes';

export const actionTickets = (tickets) => ({
  type: actionTypes.getTickets,
  tickets,
});

export const actionFilteredTickets = (filteredTickets) => ({
  type: actionTypes.getFilteredTickets,
  filteredTickets,
});

export const actionSearchId = (searchId) => ({
  type: actionTypes.getSearchId,
  searchId,
});

export const actionCompleteRequest = () => ({
  type: actionTypes.completeRequest,
});

export const actionErrorDownloadTickets = () => ({
  type: actionTypes.errorDownloadTickets,
});

export const actionCompleteDownload = () => ({
  type: actionTypes.completeDownload,
});
