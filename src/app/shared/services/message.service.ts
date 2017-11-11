import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export class Message {
  constructor(
    public message: string,
    public type: string) {}
}

@Injectable()
export class MessageService {
  messages: Subject<Message> = new Subject<Message>();

  constructor() {}

  danger(message: string) {
    this.messages.next(new Message(message, 'alert-danger'));
  }

  info(message: string) {
    this.messages.next(new Message(message, 'alert-info'));
  }

  success(message: string) {
    this.messages.next(new Message(message, 'alert-success'));
  }

  warning(message: string) {
    this.messages.next(new Message(message, 'alert-warning'));
  }
}
