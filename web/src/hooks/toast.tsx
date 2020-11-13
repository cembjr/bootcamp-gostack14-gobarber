import React from 'react';
import { uuid } from 'uuidv4';
import { ToastContainer } from '../components/ToastContainer';

interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

const ToastContext = React.createContext<ToastContextData>(
  {} as ToastContextData,
);

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

export const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = React.useState<ToastMessage[]>([]);

  const addToast = React.useCallback(
    ({ type, title, description }: Omit<ToastMessage, 'id'>) => {
      const id = uuid();
      const toast = {
        id,
        type,
        title,
        description,
      };

      setMessages(oldMessages => [...oldMessages, toast]);
    },
    [],
  );
  const removeToast = React.useCallback((id: string) => {
    setMessages(oldMessages =>
      oldMessages.filter(message => message.id !== id),
    );
  }, []);

  return (
    <>
      <ToastContext.Provider value={{ addToast, removeToast }}>
        {children}
        <ToastContainer messages={messages} />
      </ToastContext.Provider>
    </>
  );
};

export function useToast(): ToastContextData {
  const context = React.useContext(ToastContext);

  if (!context) throw new Error('useToast must be used within a ToastProvider');

  return context;
}
