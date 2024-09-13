class ResponseHandler {
  constructor({status, data = null, message = 'Something Went Wrong', errors = []}) {
    this.status = status;
    this.response_data = data;
    this.message = message;
    this.errors = errors;
    this.success = status < 400;
  }
}

export default ResponseHandler;
