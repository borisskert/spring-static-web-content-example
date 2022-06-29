import {Component} from '@angular/core';
import {GreetingService} from "../greeting.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.scss']
})
export class GreetingComponent {

  public readonly greeting: BehaviorSubject<string> = new BehaviorSubject<string>("😇 Not called already...");

  constructor(private readonly greetingService: GreetingService) {
  }

  requestGreeting() {
    this.greeting.next(`😳 Requesting...`);

    this.greetingService.get()
      .subscribe(
        (next) => this.greeting.next(`🥳 ${next}`),
        error => this.greeting.next(`🤬 ${error.message}`)
      );
  }
}
