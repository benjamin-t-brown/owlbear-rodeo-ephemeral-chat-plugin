import {
  BROADCAST_CHAT_TYPE,
  Dispatcher,
  GLOBAL_SUB_URL,
  setDispatcher,
} from './actions';
import { AppState, ChatMessage, createAppState } from './state';
import { Chat } from './ui/components/Chat';
import OBR from '@owlbear-rodeo/sdk';

const setupObr = async (appState: AppState, reRender: () => void) => {
  console.log('Owlbear Rodeo Ephemeral Chat App: init OBR');
  OBR.broadcast.onMessage(BROADCAST_CHAT_TYPE, (event) => {
    const chatMessage: ChatMessage = JSON.parse(event.data as string);
    appState.messages.push({
      ownerId: chatMessage.ownerId,
      ownerName: chatMessage.ownerName || 'Anonymous',
      text: chatMessage.text,
    });
    reRender();
    OBR.action.setIcon(`/${GLOBAL_SUB_URL}/iconActive.svg`);
  });

  OBR.action.onOpenChange((isOpen) => {
    if (isOpen) {
      OBR.action.setIcon(`/${GLOBAL_SUB_URL}/icon.svg`);
    }
  });

  const userName = await OBR.player.getName();
  const userId = await OBR.player.getId();

  appState.user.name = userName;
  appState.user.id = userId;
};

window.addEventListener('load', () => {
  const mainDiv = document.getElementById('main-div');
  if (!mainDiv) {
    return;
  }

  window.addEventListener('error', (event) => {
    const errorDiv = document.createElement('div');
    errorDiv.style.color = 'red';
    errorDiv.style.backgroundColor = 'black';
    errorDiv.textContent = `Error: ${event.message}`;
    document.body.appendChild(errorDiv);
  });

  const appState = createAppState();
  setDispatcher(new Dispatcher(appState));
  const chat = new Chat(mainDiv, appState);

  if (OBR.isAvailable) {
    OBR.onReady(() => {
      console.log('Owlbear Rodeo Ephemeral Chat App: Loaded');
      chat.setProps({
        localId: 'chat',
      });
      setupObr(appState, () => {
        chat.reRenderAll();
      });
    });
  } else {
    console.log('Owlbear Rodeo Ephemeral Chat App: Loaded');
    const chat = new Chat(mainDiv, appState);

    appState.messages.push({
      ownerId: '1',
      ownerName: 'Notification',
      text: 'Install this extension in Owlbear Rodeo to chat with other players.',
    });

    chat.setProps({
      localId: 'chat',
    });
  }
});
