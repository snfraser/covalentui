import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {NotificationMessage} from '../models/notification.message';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class NotificationService {

  /** A subject to handle inter-component communications.*/
  private subject = new Subject<NotificationMessage>();


  /**
   *  Send a message to be caught be other component  subscribers.
   * @param {NotificationMessage} message The message to send.
   */
  sendMessage(message: NotificationMessage) {
    this.subject.next(message );
  }

  /** Clear the message - ?? why ?? */
  clearMessage() {
    this.subject.next();
  }

  /** Subscribe to messages over ICC channel.*/
  getMessage(): Observable<NotificationMessage> {
    return this.subject.asObservable();
  }

  /**
   * Send an error notification.
   * @param {string} message The text of the error message.
   * @param {string} source The source of the message - could be a component or contect information.
   * @param {string} code The error-code e.g. an HTTP response code or something internal.
   */
  sendError(message: string, source: string, code: string) {
    const error: NotificationMessage = new NotificationMessage();
    error.message = message;
    error.source = source;
    error.code = code;
    error.time = new Date();
    error.iserror = true;
    this.sendMessage(error);
  }

  /**
   * Send a success notification.
   * @param {string} message The message associated with the event.
   * @param {string} source The source of the message - could be a component or contect information.
   */
  sendSuccess(message: string, source: string) {
    const success: NotificationMessage = new NotificationMessage();
    success.message = message;
    success.source = source;
    success.time = new Date();
    success.iserror = false;
    this.sendMessage(success);
  }


}
