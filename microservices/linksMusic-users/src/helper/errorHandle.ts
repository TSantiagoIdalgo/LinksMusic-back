export default class ErrorService extends Error {
  constructor(message: string) {
    super(message);
    this.name = message;
  }
}
  