/**
 * Created by SA05SF on 18/07/2017.
 */
export class NotificationMessage {

  /** Set True if this is an error, otherwise a (success) notification.*/
  public iserror: boolean;

  /** Where the message originated, component,service, etc.*/
  public source: string;

  /** Message time.*/
  public time: Date;

  /** Message content.*/
  public message: string;

  /** An error code - e.g. http status code.*/
  public code: string;

  /** List of contacts/emails.*/
  public contacts: string[];

}
