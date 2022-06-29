import {Component} from '@angular/core';
import {BehaviorSubject, tap} from "rxjs";
import {GreetingService} from "./greeting.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend-example';

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
