import styled from 'styled-components';

function ContainerLyrics(lyrics, fontSize = 18) {
  const StyledContainerLyrics = styled.div`
    background-color: white;
    padding: 10px 0;
    font-size: ${() => `${fontSize}px`};

    .info {
      color: #aaaaaa;
    }

    .disabled {
      color: #dddddd;
    }

    strong {
      font-weight: 400;
    }
  `;

  return <StyledContainerLyrics dangerouslySetInnerHTML={{ __html: lyrics }} />;
}

export default ContainerLyrics;
