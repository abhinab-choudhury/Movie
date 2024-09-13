import ResponseHandler from '../utils/response-handler.js';

const localAuth = async (req, res) => {
  res.status(200).json(new ResponseHandler({status:200, message: 'Local Auth'}));
};

const googleAuth = async (req, res) => {
  res.status(200).json(new ResponseHandler({ status: 200, message: 'Google Auth'}));
};

const forgotPassword = async (req, res) => {
  res.status(200).json(new ResponseHandler({ status: 200, message: 'Forgot Password'}));
};

const resetPassword = async (req, res) => {
  const hash = req.headers.hash;
  res.status(200).json(new ResponseHandler({ status: 200, message: 'Reset Password'}));
};

export { googleAuth, localAuth, forgotPassword, resetPassword };
