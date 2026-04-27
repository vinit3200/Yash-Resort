const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    message = `Resource not found. Invalid: ${err.path}`;
    statusCode = 400;
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    message = 'Duplicate field value entered';
    statusCode = 400;
  }

  // Zod validation errors
  if (err.name === 'ZodError') {
    statusCode = 400;
    return res.status(statusCode).json({
      success: false,
      message: 'Validation Error',
      errors: err.errors.map(e => ({ path: e.path.join('.'), message: e.message })),
    });
  }

  // Default to 500 if not specified
  if (!statusCode) {
    statusCode = 500;
  }

  console.error(`[Error] ${statusCode} - ${message}`);
  console.error(err.stack);

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = errorHandler;
