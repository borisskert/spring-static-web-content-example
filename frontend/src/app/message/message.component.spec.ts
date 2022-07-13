import {MessageComponent} from './message.component';
import {MyMessage} from "../my-message.service";
import {fireEvent, render, screen, waitFor} from "@testing-library/angular";

describe('MessageComponent', () => {
  beforeEach(async () => {
    await render(MessageComponent)
  })

  it('should create', () => {
    expect(screen.getByText('Post Message')).toBeInTheDocument()
  });

  describe('when message has been posted', () => {
    beforeEach(() => {
      const messageEvent = new MessageEvent<MyMessage>('message', {
        data: {
          type: 'my-message',
          text: 'my test message'
        }
      });

      fireEvent(window, messageEvent)
    });

    it('should display message', async () => {
      await waitFor(() => screen.getByText('my test message'))
      expect(screen.getByText('my test message')).toBeInTheDocument()
    });
  });
});
