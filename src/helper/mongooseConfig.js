import util from 'util'

const getAuthUsername = () => {
  return process.env.MONGO_USER;
}

const getAuthPassword = () => {
  return process.env.MONGO_USER;
}

const getDatbaseName = () => {
  return process.env.MONGO_DATABASE
}

const existAuth = () => {
  return (process.env.MONGO_USER && process.env.MONGO_PASSWORD)
}

const getHosts = () => {
    const hostsOrHost = process.env.MONGO_HOST
  
    return Array.isArray(hostsOrHost) ? hostsOrHost : [hostsOrHost];
  };

const getPort = () => {
  return process.env.MONGO_PORT
}

export const buildConnectionUrl = () => {
    let connectionUrl = 'mongodb://';
  
    if (existAuth()) {
      connectionUrl += getAuthUsername();
      connectionUrl += ':';
      connectionUrl += getAuthPassword();
      connectionUrl += '@';
    }
  
    let firstHost = true;
    for (const entry of getHosts()) {
      if (!firstHost) {
        connectionUrl += ',';
      }
      connectionUrl += `${entry}:${getPort()}`;
      firstHost = false;
    }
  
    connectionUrl += '/';
    connectionUrl += getDatbaseName();
  
    return connectionUrl;
  };