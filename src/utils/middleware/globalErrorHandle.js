
const globalError = (err, req, res, next) => {
  res.status(err.statusCode).json({ message: `error`, err: err.message });
};

export default globalError
