import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {GreetingComponent} from './greeting/greeting.component';
import {MessageComponent} from './message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    GreetingComponent,
    MessageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
