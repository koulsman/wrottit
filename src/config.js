const isProduction = process.env.NODE_ENV === "production";

const config = {
  USERS_API: isProduction
    ? `${process.env.REACT_APP_API_BASE_PROD}/users`
    : process.env.REACT_APP_USERS_API_DEV,

  POSTS_API: isProduction
    ? `${process.env.REACT_APP_API_BASE_PROD}`
    : process.env.REACT_APP_POSTS_API_DEV,

  COMMUNITIES_API: isProduction
    ? `${process.env.REACT_APP_API_BASE_PROD}/communities`
    : process.env.REACT_APP_COMMUNITIES_API_DEV,
};

export default config;