import {Component, OnInit} from '@angular/core';
import {map, Observable} from "rxjs";
import {MyMessage, MyMessageService} from "../my-message.service";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  constructor(private readonly messageService: MyMessageService) {
  }

  ngOnInit(): void {
  }

  public get message(): Observable<string> {
    return this.messageService.retrieve()
      .pipe(
        map(message => message.text)
      );
  }

  public postMessage(message: string) {
    const myMessage: MyMessage = {
      type: "my-message",
      text: message
    }

    window.postMessage(myMessage, '*');
  }
}
