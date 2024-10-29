import { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledValidationMessage = styled.p`
  background-color: #b4eab4;
  color: #155724;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 40px;
`;

function ValidationMessage({ message }) {
  const [visibleMessage, setVisibleMessage] = useState(message);

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setVisibleMessage('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  return visibleMessage ? (
    <StyledValidationMessage>{visibleMessage}</StyledValidationMessage>
  ) : null;
}

export default ValidationMessage;
