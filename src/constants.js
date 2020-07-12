const BASE_URL = (process.env.NODE_ENV == 'development') ? 'http://localhost:7071/' : 'https://timetrackingfunctionapp2.azurewebsites.net/';

export default {
  BASE_URL,
  PROJECTS_LIST: 'api/ListProjects',
  PROJECT_CREATE: 'api/CreateProject',
  PROJECT_DELETE: 'api/DeleteProject',
  TIME_CREATE: 'api/CreateTimeEntry',
  TIMES_GET: 'api/GetTimeEntries'
}