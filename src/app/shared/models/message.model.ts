export enum MessageType {
  Danger = 'alert-danger',
  Info = 'alert-info',
  Success = 'alert-success',
  Warning = 'alert-warning'
}

export interface Message {
  text: string;
  type: MessageType;
}
