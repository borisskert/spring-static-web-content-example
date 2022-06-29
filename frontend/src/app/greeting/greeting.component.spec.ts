import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GreetingComponent} from './greeting.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('GreetingComponent', () => {
  let component: GreetingComponent;
  let fixture: ComponentFixture<GreetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [GreetingComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GreetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
