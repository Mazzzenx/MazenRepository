
const globalError = (err, req, res, next) => {
  //res.status(err.statusCode).json({ statusMsg: `fail`, message: err.message });
  res.status(err.status || 500).json({
    statusMsg: 'fail',
    message: err.message
});

};

export default globalError


// const globalError = (err, req, res, next) => {
//   let statusMsg = 'fail';
//   let errorMessage = 'Internal Server Error';
//   let errorCode = '';

//   // Check if it's a validation error where password confirmation failed
//   if (err.name === 'ValidationError' && err.param === 'password') {
//     errorMessage = {
//       value: err.value,
//       msg: 'Password confirmation is incorrect',
//       param: err.param,
//       location: err.location
//     };
//     errorCode = 'PASSWORD_CONFIRMATION_ERROR';
//   } else if (err.code === 'ACCOUNT_ALREADY_EXISTS') {
//     errorMessage = 'Account Already Exists';
//     errorCode = 'ACCOUNT_ALREADY_EXISTS';
//   }

//   res.status(err.status || 500).json({
//       statusMsg,
//       errorCode,
//       message: errorMessage
//   });
// };

// export default globalError;













// const globalError = (err, req, res, next) => {
//   let statusMsg = 'fail';
//   let errorMessage = 'Account Already Exists';

//   res.status(err.status || 500).json({
//       statusMsg,
//       message: errorMessage
//   });
// };

// export default globalError;