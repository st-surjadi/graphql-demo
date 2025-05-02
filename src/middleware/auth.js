import config from "../config/environment.js";

/**
 * Middleware to check for X-Secret-Key header
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const checkSandboxAccess = (req, res, next) => {
  const secretKey = req.headers["x-secret-key"];

  if (!secretKey || secretKey !== config.SANDBOX_SECRET_KEY) {
    return res.status(401).json({
      error: "Unauthorized",
      message: "Invalid or missing X-Secret-Key header",
    });
  }

  next();
};
