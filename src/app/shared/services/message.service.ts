import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export class Message {
  constructor(
    public message: string,
    public type: string) {}
}

@Injectable()
export class MessageService {
  readonly messages: Observable<Message>;

  private messagesSubject: Subject<Message> = new Subject<Message>();

  constructor() {
    this.messages = this.messagesSubject.asObservable();
  }

  danger(message: string) {
    this.messagesSubject.next(new Message(message, 'alert-danger'));
  }

  info(message: string) {
    this.messagesSubject.next(new Message(message, 'alert-info'));
  }

  success(message: string) {
    this.messagesSubject.next(new Message(message, 'alert-success'));
  }

  warning(message: string) {
    this.messagesSubject.next(new Message(message, 'alert-warning'));
  }
}
