import {Injectable} from '@angular/core';
import {filter, map, Observable} from "rxjs";
import {WindowMessageService} from "./window-message.service";

@Injectable({
  providedIn: 'root'
})
export class MyMessageService {
  constructor(private readonly windowMessageService: WindowMessageService) {
  }

  public retrieve(): Observable<MyMessage> {
    return this.windowMessageService.retrieve().pipe(
      filter(message => message.type === 'my-message'),
      map(message => message as MyMessage),
    )
  }
}

export interface MyMessage {
  type: 'my-message'
  text: string
}
