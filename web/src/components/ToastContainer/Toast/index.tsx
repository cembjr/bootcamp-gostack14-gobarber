import React from 'react';

import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi';
import { Container } from './styles';
import { ToastMessage, useToast } from '../../../hooks/toast';

interface ToastProps {
  message: ToastMessage;
  style: object;
}

const tamanhoIcones = 24;
const icons = {
  info: <FiInfo size={tamanhoIcones} />,
  error: <FiAlertCircle size={tamanhoIcones} />,
  success: <FiCheckCircle size={tamanhoIcones} />,
};

export const Toast: React.FC<ToastProps> = ({
  message: { id, title, description, type },
  style,
}) => {
  const { removeToast } = useToast();
  React.useEffect(() => {
    const timer = setTimeout(() => removeToast(id), 3000);

    return () => clearTimeout(timer);
  }, [id, removeToast]);

  return (
    <>
      <Container hasDescription={!!description} type={type} style={style}>
        {icons[type || 'info']}
        <div>
          <strong>{title}</strong>
          {description && <p>{description}</p>}
        </div>
        <button type="button" onClick={() => removeToast(id)}>
          <FiXCircle size={18} />
        </button>
      </Container>
    </>
  );
};
