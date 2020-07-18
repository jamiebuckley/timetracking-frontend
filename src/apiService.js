import Constants from "./constants";

class ApiService {

  async getIdToken() {
    /* eslint-disable */
    const auth2 = await gapi.auth2.getAuthInstance();
    return auth2.currentUser.get().getAuthResponse().id_token;
    /* eslint-enable */
  }

  async fetchWithHeaders(url, params = {}) {
    const paramsHeaders = params.headers || {};
    const auth = await this.getIdToken();
    return fetch(url, {
      headers: {
        ...paramsHeaders,
        auth
      },
      ...params,
    })
  }

  async getProjects() {
    const response = await this.fetchWithHeaders(Constants.BASE_URL + Constants.PROJECTS_LIST)
    return response.json();
  }

  saveProject(project) {
    return this.fetchWithHeaders(Constants.BASE_URL + Constants.PROJECT_CREATE, {
      method: 'POST',
      body: JSON.stringify(project)
    });
  }

  deleteProject(project) {
    return this.fetchWithHeaders(Constants.BASE_URL + Constants.PROJECT_DELETE, {
      method: 'DELETE',
      body: JSON.stringify(project)
    });
  }

  createTimeEntry(timeEntry) {
    return this.fetchWithHeaders(Constants.BASE_URL + Constants.TIME_CREATE, {
      method: 'POST',
      body: JSON.stringify(timeEntry)
    });
  }

  async queryTimeEntries(startDate, endDate) {
    const url = new URL(Constants.BASE_URL + Constants.TIMES_GET);
    const params = { startDate, endDate };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    const response = await this.fetchWithHeaders(url);
    return await response.json();
  }

  async deleteTimeEntry(key, dateTime) {
    const url = new URL(Constants.BASE_URL + Constants.TIMES_DELETE);
    const params = { key, dateTime };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    const response = await this.fetchWithHeaders(url, {
      method: 'DELETE'
    });
    return await response.json();
  }
}

const instance = new ApiService();
export default instance;