/**
 * This is an array of route that accessible for public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/", "/auth/new-verification"];

/**
 * This is an array of route that accessible for authentication
 * These routes will redirect logged in user to /settings
 * @type {string[]}
 */
export const authRoute = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * This prefix for api authentication route
 * Routes that start with this prefixd are use for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Route for redirect after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";
