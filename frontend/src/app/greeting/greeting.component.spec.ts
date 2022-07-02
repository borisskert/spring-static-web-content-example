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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [GreetingComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GreetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    debugElement = fixture.debugElement;
    compiledElement = fixture.nativeElement as HTMLElement;

    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show empty state', () => {
    const terminalLine = compiledElement.querySelector('.test-terminal-line-greeting');
    expect(terminalLine?.textContent).toContain('😇 Not called already...');
  });

  describe('when click on request-greeting button', () => {
    let mockReq: TestRequest;

    beforeEach(() => {
      const requestGreetingButton = debugElement.query(By.css('.test-request-greeting-btn'));
      requestGreetingButton.triggerEventHandler('click', null);
    });

    it('should switch terminal text', () => {
      fixture.detectChanges();

      const terminalLine = compiledElement.querySelector('.test-terminal-line-greeting');
      expect(terminalLine?.textContent).toContain('😳 Requesting...');
    });

    it('should display response body text', waitForAsync(() => {
      mockReq = httpMock.expectOne('/api/greeting');
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('text');

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        const terminalLine = compiledElement.querySelector('.test-terminal-line-greeting');
        expect(terminalLine?.textContent).toContain('🥸 Mock Greeting Response');

        httpMock.verify();
      });

      mockReq.flush('🥸 Mock Greeting Response');
    }));
  });
});
