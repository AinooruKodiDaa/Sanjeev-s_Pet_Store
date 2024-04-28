const host = process.env.REACT_APP_API_URL;

const ENDPOINTS = {
  loginEndpoint: host + "/users",
  fetchUsersEndpoint: host + "/users"
  
};

export default ENDPOINTS;
