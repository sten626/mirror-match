export enum MessageType {
  Danger = 'alert-danger',
  Info = 'alert-info',
  Success = 'alert-success',
  Warning = 'alert-warning'
}

export class Message {
  constructor(
    public message: string,
    public type: MessageType) {}
}
