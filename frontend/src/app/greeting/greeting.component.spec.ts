import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {GreetingComponent} from './greeting.component';
import {HttpClientTestingModule, HttpTestingController, TestRequest} from "@angular/common/http/testing";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('GreetingComponent', () => {
  let component: GreetingComponent;
  let fixture: ComponentFixture<GreetingComponent>;
  let debugElement: DebugElement;
  let compiledElement: HTMLElement
  let httpMock: HttpTestingController;
  let terminalLine: Element;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [GreetingComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GreetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    debugElement = fixture.debugElement;
    compiledElement = fixture.nativeElement as HTMLElement;

    httpMock = TestBed.inject(HttpTestingController);

    terminalLine = compiledElement.querySelector('.test-terminal-line-greeting') as Element;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show empty state', () => {
    expect(terminalLine?.textContent).toEqual('😇 Not called already...');
  });

  describe('when click on request-greeting button', () => {
    let mockReq: TestRequest;

    beforeEach(() => {
      const requestGreetingButton = debugElement.query(By.css('.test-request-greeting-btn'));
      requestGreetingButton.triggerEventHandler('click', null);
    });

    it('should switch terminal text', () => {
      fixture.detectChanges();

      expect(terminalLine?.textContent).toEqual('😳 Requesting...');
    });

    it('should display response body text', waitForAsync(() => {
      mockReq = httpMock.expectOne('/api/greeting');
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('text');

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        expect(terminalLine?.textContent).toEqual('🥳 Mock Greeting Response');

        httpMock.verify();
      });

      mockReq.flush('Mock Greeting Response');
    }));
  });
});
