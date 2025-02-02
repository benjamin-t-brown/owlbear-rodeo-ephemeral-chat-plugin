import { BROADCAST_CHAT_TYPE, Dispatcher, setDispatcher } from './actions';
import { ChatMessage, createAppState } from './state';
import { Chat } from './ui/components/Chat';
import OBR from '@owlbear-rodeo/sdk';

window.addEventListener('load', () => {
  const mainDiv = document.getElementById('main-div');
  if (!mainDiv) {
    return;
  }

  const appState = createAppState();
  setDispatcher(new Dispatcher(appState));

  OBR.onReady(async () => {
    OBR.broadcast.onMessage(BROADCAST_CHAT_TYPE, (event) => {
      const chatMessage: ChatMessage = JSON.parse(event.data as string);
      appState.messages.push({
        ownerId: chatMessage.ownerId,
        ownerName: chatMessage.ownerName || 'Anonymous',
        text: chatMessage.text,
      });
      chat.reRenderAll();
      OBR.action.setIcon('/iconActive.svg');
    });

    OBR.action.onOpenChange((isOpen) => {
      if (isOpen) {
        OBR.action.setIcon('/icon.svg');
      }
    });

    const userName = await OBR.player.getName();
    const userId = await OBR.player.getId();

    appState.user.name = userName;
    appState.user.id = userId;

    console.log('Owlbear Rodeo Ephemeral Chat App: Loaded');
    const chat = new Chat(mainDiv, appState);
    chat.setProps({
      localId: userId,
    });
  });
});
