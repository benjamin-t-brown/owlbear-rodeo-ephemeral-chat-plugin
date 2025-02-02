import { AppState, ChatMessage } from './state';
import OBR from '@owlbear-rodeo/sdk';

export const BROADCAST_CHAT_TYPE = 'owlbear-rodeo-ephemeral-chat';

export class Dispatcher {
  appStateRef: AppState;
  constructor(appState: AppState) {
    this.appStateRef = appState;
  }
  dispatch(cb: (appState: AppState) => void) {
    cb(this.appStateRef);
  }
}

let dispatcher: Dispatcher | undefined;
export const setDispatcher = (d: Dispatcher) => {
  dispatcher = d;
};
export const getDispatcher = () => {
  return dispatcher as Dispatcher;
};

export const sendChat = (message: string) => {
  getDispatcher().dispatch((appState) => {
    message = message.slice(0, 128);
    appState.currentMessage = '';
    const chatMessage = {
      ownerId: appState.user.id,
      ownerName: appState.user.name || 'Anonymous',
      text: message,
    };
    appState.messages.push(chatMessage);
    OBR.broadcast.sendMessage(BROADCAST_CHAT_TYPE, JSON.stringify(chatMessage));
  });
};
