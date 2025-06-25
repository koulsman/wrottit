const isDev = process.env.NODE_ENV === 'development';

export const USERS_API = isDev
  ? process.env.REACT_APP_USERS_API_DEV
  : `${process.env.REACT_APP_API_BASE_PROD}/users`;

export const POSTS_API = isDev
  ? process.env.REACT_APP_POSTS_API_DEV
  : `${process.env.REACT_APP_API_BASE_PROD}/posts`;

export const COMMUNITIES_API = isDev
  ? process.env.REACT_APP_COMMUNITIES_API_DEV
  : `${process.env.REACT_APP_API_BASE_PROD}/communities`;