import {Injectable} from '@angular/core';
import {BehaviorSubject, filter, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WindowMessageService {

  private readonly message$: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null)

  constructor() {
    if (window.addEventListener) {
      window.addEventListener('message', this.receiveMessage.bind(this), false);
    } else {
      (<any>window).attachEvent('onmessage', this.receiveMessage.bind(this));
    }
  }

  public retrieve(): Observable<any> {
    return this.message$.asObservable()
      .pipe(
        filter(message => message !== null),
      );
  }

  receiveMessage(event: MessageEvent) {
    if (event.type === 'message') {
      this.message$.next(event.data)
    }
  }
}
