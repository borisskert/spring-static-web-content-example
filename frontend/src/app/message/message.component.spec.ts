import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {MessageComponent} from './message.component';
import {BrowserModule} from "@angular/platform-browser";
import {WindowMessageService} from "../window-message.service";
import {MyMessage} from "../my-message.service";

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;
  let htmlElement: HTMLElement;
  let messageService: WindowMessageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserModule],
      declarations: [MessageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    htmlElement = fixture.nativeElement as HTMLElement;

    messageService = TestBed.inject(WindowMessageService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when message has been posted', () => {
    beforeEach(() => {
      messageService.receiveMessage(new MessageEvent<MyMessage>('message', {
        data: {
          type: 'my-message',
          text: 'my test message'
        }
      }))
    });

    it('should display message', waitForAsync(() => {
      fixture.detectChanges();

      const messageParagraph = htmlElement.querySelector('.test-message-text') as Element;
      expect(messageParagraph?.textContent).toEqual('my test message');
    }));
  });
});
