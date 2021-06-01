export const actionTickets = (tickets) => ({
  type: 'GET_TICKETS',
  tickets,
});

export const actionFilteredTickets = (filteredTickets) => ({
  type: 'GET_FILTRED_TICKETS',
  filteredTickets,
});

export const actionSearchId = (searchId) => ({
  type: 'GET_SEARCH_ID',
  searchId,
});

export const actionCompleteRequest = () => ({
  type: 'COMPLETE_REQUEST',
});

export const actionErrorDownloadTickets = () => ({
  type: 'ERROR_DOWNLOAD_TICKETS',
});

export const actionCompleteDownload = () => ({
  type: 'COMPLETE_DOWNLOAD',
});
