export class HTTPError extends Error {
  constructor(
    public statusCode: number,
    message?: string,
    public code?: number
  ) {
    super(message);
    this.name = "HTTPError";
    Object.setPrototypeOf(this, HTTPError.prototype);
  }
}
