export default class TicketsService {
  apiBase = 'https://front-test.beta.aviasales.ru/';

  async getResource(url) {
    const res = await fetch(url)
      .then((response) => response.json())
      .catch((error) => error);
    return res;
  }

  async getSearchId() {
    const url = `${this.apiBase}search`;
    const res = await this.getResource(url);
    return res;
  }

  async getTickets(searchId) {
    const url = `${this.apiBase}tickets?searchId=${searchId}`;
    const res = await this.getResource(url);
    return res;
  }
}
