import {fireEvent, render, screen, waitFor} from '@testing-library/angular'
import {GreetingComponent} from "./greeting.component";
import {HttpClient} from "@angular/common/http";
import {createMock, Mock} from "@testing-library/angular/jest-utils";
import {EMPTY, of} from "rxjs";

describe('GreetingComponent', () => {
  let httpMock: Mock<HttpClient>;

  beforeEach(() => {
    httpMock = createMock(HttpClient);
  })

  beforeEach(async () => {
    await render(GreetingComponent, {
      providers: [
        {provide: HttpClient, useValue: httpMock},
      ],
    })
  })

  it('should create', () => {
    expect(screen.getByText('Request Greeting')).toBeInTheDocument()
  });

  it('should show empty state', () => {
    expect(screen.getByText('😇 Not called already...')).toBeInTheDocument()
  });

  describe('when click on request-greeting button', () => {
    beforeEach(() => {
      httpMock.get.mockReturnValue(EMPTY)

      fireEvent.click(screen.getByText('Request Greeting'))
    });

    it('should switch terminal text', () => {
      expect(screen.getByTestId('terminal-line-greeting')).toHaveTextContent('😳 Requesting...')
    });
  });

  describe('when receiving response', () => {
    beforeEach(() => {
      const response = of('Mock Greeting Response 🤡')
      httpMock.get.mockReturnValue(response)

      fireEvent.click(screen.getByText('Request Greeting'))
    });

    it('should switch terminal text', async () => {
      await waitFor(() => screen.getByTestId('terminal-line-greeting'))
      expect(screen.getByTestId('terminal-line-greeting')).toHaveTextContent('🥳 Mock Greeting Response 🤡')
    });
  });
});
