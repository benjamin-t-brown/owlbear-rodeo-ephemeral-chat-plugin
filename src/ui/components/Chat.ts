import { sendChat } from '../../actions';
import { AppState } from '../../state';
import { createElement, ClElement, appendChild } from '../ClElement';
import { BasicButton } from '../elements/BasicButton';
import { ChatMessages } from '../elements/ChatMessages';
import { Textarea } from '../elements/Textarea';

interface ChatProps {
  localId: string;
}

export class Chat extends ClElement<ChatProps> {
  state: AppState;

  constructor(parent: HTMLElement, state: AppState) {
    super(parent);
    this.state = state;
  }

  add() {
    const root = createElement('div', {
      width: `400px`,
      height: 'calc(400px - 20px)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    });

    const chatMessagesContainer = createElement('div', {
      width: `calc(100% - 8px)`,
      height: 'calc(100% - 40px)',
      background: 'blue',
    });
    chatMessagesContainer.id = 'chatMessagesContainer';
    appendChild(root, chatMessagesContainer);
    new ChatMessages(chatMessagesContainer, this).setProps({
      messages: this.state.messages,
    });

    const textareaContainer = createElement('div', {
      width: `calc(100% - 8px)`,
      // height: '32px',
      display: 'flex',
      alignItems: 'center',
      paddingTop: '8px',
      background: 'red',
    });
    textareaContainer.id = 'textareaContainer';
    appendChild(root, textareaContainer);

    new Textarea(textareaContainer).setProps({
      value: this.state.currentMessage,
      width: 'calc(100% - 64px)',
      onChange: (value) => {
        this.state.currentMessage = value;
      },
      onKeyPress: (ev) => {
        if (ev.key === 'Enter') {
          const messageToSend = this.state.currentMessage?.trim();
          if (messageToSend.length === 0) {
            return;
          }
          sendChat(this.state.currentMessage);
          this.reRenderAll();
        }
      },
    });

    new BasicButton(textareaContainer).setProps({
      type: 'neutral',
      label: 'Send',
      fullHeight: true,
      onClick: () => {
        const messageToSend = this.state.currentMessage?.trim();
        if (messageToSend.length === 0) {
          return;
        }
        sendChat(this.state.currentMessage);
        this.reRenderAll();
      },
    });

    this.root = root;
    this.parent.appendChild(this.root);
  }
}
