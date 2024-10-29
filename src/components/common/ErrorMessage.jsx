import { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledErrorMessage = styled.p`
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 40px;
`;

function ErrorMessage({ message }) {
  const [visibleMessage, setVisibleMessage] = useState(message);

  useEffect(() => {
    setVisibleMessage(message);
    if (!message) return;

    const timer = setTimeout(() => {
      setVisibleMessage('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  return visibleMessage ? (
    <StyledErrorMessage>{visibleMessage}</StyledErrorMessage>
  ) : null;
}

export default ErrorMessage;
