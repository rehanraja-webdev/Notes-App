class ApiResponse extends Response {
  constructor(statusCode, message, data) {
    super(message);

    this.success = true;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

export default ApiResponse;
