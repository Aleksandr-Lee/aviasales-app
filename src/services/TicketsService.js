export default class TicketsService {
  apiBase = 'https://front-test.beta.aviasales.ru/tickets?searchId=';

  async getResource(url) {
    const res = await fetch(url);
    return res.json();
  }

  async getSearchId() {
    const url = `https://front-test.beta.aviasales.ru/search`;
    const res = await this.getResource(url);
    return res;
  }

  async getTickets(searchId) {
    const url = `${this.apiBase}${searchId}`;
    const res = await this.getResource(url);
    return res;
  }
}
