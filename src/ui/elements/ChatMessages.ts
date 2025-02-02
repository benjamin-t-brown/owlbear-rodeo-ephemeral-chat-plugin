import { ChatMessage } from '../../state';
import { createElement, ClElement, appendChild } from '../ClElement';
import { getColors } from '../colors';

interface ChatMessagesProps {
  messages: ChatMessage[];
}

function sanitizeForInnerHTML(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function linkify(text: string): string {
  const urlRegex = /https?:\/\/[^\s]+/g;
  return text.replace(urlRegex, (url) => {
    return `<a href="${url}" target="_blank">${url}</a>`;
  });
}

export class ChatMessages extends ClElement<ChatMessagesProps> {
  add() {
    const props = this.props ?? {
      messages: [],
    };

    const root = createElement('div', {
      width: `100%`,
      height: `100%`,
      overflowY: 'auto',
      display: 'flex',
      color: 'white',
      flexDirection: 'column',
    });

    for (let i = 0; i < props.messages.length; i++) {
      const message = props.messages[i];
      const messageDiv = createElement('div', {
        padding: this.scale * 4 + 'px',
      });
      const nameSpan = createElement('div', {
        fontWeight: 'bold',
        color: getColors().CHAT.NAME,
      });
      nameSpan.innerText = message.ownerName;
      const textSpan = createElement('div');
      textSpan.innerHTML = textSpan.innerHTML = linkify(
        sanitizeForInnerHTML(message.text)
      );
      appendChild(messageDiv, nameSpan);
      appendChild(messageDiv, textSpan);
      appendChild(root, messageDiv);
    }

    this.root = root;
    this.parent.appendChild(this.root);
    root.scrollTop = root.scrollHeight;
  }
}
