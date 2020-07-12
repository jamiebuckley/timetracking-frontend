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
    const response = await this.fetchWithHeaders(Constants.BASE_URL + Constants.TIMES_GET, {
      method: 'POST',
      body: JSON.stringify({
        fromTime: startDate,
        toTime: endDate
      })
    });
    return await response.json();
  }
}

const instance = new ApiService();
export default instance;