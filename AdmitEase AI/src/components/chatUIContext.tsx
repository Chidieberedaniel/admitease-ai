import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

type ChatUIContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const ChatUIContext = createContext<ChatUIContextValue | null>(null);

export function useChatUI(): ChatUIContextValue {
  const ctx = useContext(ChatUIContext);
  if (!ctx) throw new Error('useChatUI must be used within ChatUIProvider');
  return ctx;
}

export function ChatUIProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const value: ChatUIContextValue = {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen((o) => !o),
  };

  return <ChatUIContext.Provider value={value}>{children}</ChatUIContext.Provider>;
}
