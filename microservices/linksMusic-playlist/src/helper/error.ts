export default class HandleError extends Error {
  code: number;
  data?: unknown;
  
  constructor(code: number, message: string, data?: unknown) {
    super(`[${code}] ${message}`);
    this.name = 'CustomError';
    this.code = code;
    this.data = data;
  }
}
  