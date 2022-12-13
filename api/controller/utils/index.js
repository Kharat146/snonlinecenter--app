const errorCodes = require('./../../error/errorCodes');
const { StatusCodes } = require('http-status-codes');
module.exports = {
generateCustomDbError: (errors) => {
    const customError = {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      code: 'ERR001',
      message: 'Something went wrong.',
    };
    for (const key in errors) {
      if (Object.hasOwnProperty.call(errors, key)) {
        const element = errors[key];
        customError['status'] = StatusCodes.PRECONDITION_FAILED;
        customError['code'] = errorCodes[element.path];
        break;
      }
    }
    return customError;
  },
  pattern: (x) => {
    try {
      const pattern_val = x.replace(/\s/g, '');
      return pattern_val;
    } catch (error) {
      console.log(error);
    }
  }
}  