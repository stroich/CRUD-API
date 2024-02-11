export class InvalidJSONError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Invalid JSON format';
  }
}
