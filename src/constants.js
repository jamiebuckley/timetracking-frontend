const BASE_URL = (process.env.NODE_ENV == 'development') ? 'http://localhost:7071/' : 'https://timetrackingfunctionapp2.azurewebsites.net/';

export default {
  BASE_URL,
  PROJECTS_LIST: 'api/projects',
  PROJECT_CREATE: 'api/projects',
  PROJECT_DELETE: 'api/projects',
  TIME_CREATE: 'api/timeEntries',
  TIMES_GET: 'api/timeEntries'
}