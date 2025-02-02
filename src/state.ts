export interface ChatMessage {
  ownerId: string;
  ownerName: string;
  text: string;
}

interface User {
  id: string;
  name: string;
}

export interface AppState {
  messages: ChatMessage[];
  currentMessage: string;
  user: User;
}

export const createAppState = (): AppState => {
  return {
    messages: [] as ChatMessage[],
    currentMessage: '',
    user: {
      id: '',
      name: '',
    } as User,
  };
};
