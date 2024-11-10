export class HTTPError extends Error {
  statusCode: number;

  code?: number;

  constructor(statusCode: number, message?: string, code?: number) {
    console.log(statusCode, message, code);
    super(message);

    this.name = "HTTPError";
    this.statusCode = statusCode;
    this.code = code;

    Object.setPrototypeOf(this, HTTPError.prototype);
  }
}
