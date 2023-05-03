import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import songs from '../data/songs-riv2';
import Tutorial from '../components/Tutorial';

function Tutorials() {
  const theme = useSelector((state) => state.theme);

  const [activeAccordionIndex, setActiveAccordionIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordionIndex(activeAccordionIndex === index ? null : index);
  };

  const Section = styled.section`
    background-color: ${theme === 'light' ? '#ffffff' : '#000000'};
    border-radius: 20px;
    padding: 0 20px;

    @media screen and (min-width: 992px) {
      max-width: 1024px;
      margin: 0 auto;
    }
  `;

  const Item = styled.div`
    border-top: ${theme === 'light'
      ? '1px solid #dddddd'
      : '1px solid #222222'};

    &:first-child {
      border-top: none;
    }
  `;

  const SongTitle = styled.a`
    width: 100%;
    padding: 15px 0;
    border: none;
    outline: none;
    text-align: left;
    font-size: 20px;
    font-family: 'Roboto Condensed', sans-serif;
    font-weight: 700;
    color: ${theme === 'light' ? '#505050' : '#cccccc'};
    cursor: pointer;
    text-decoration: none;
    display: block;
  `;

  const AccordionContent = styled.div`
    max-height: ${(props) => (props.open ? '100%' : '0')};
    overflow: hidden;
  `;

  return (
    <Section>
      <ul>
        {songs.map((song, index) => (
          <Item key={song.id}>
            <SongTitle onClick={() => toggleAccordion(index)}>
              {song.title} - {song.artist}
            </SongTitle>
            <AccordionContent open={activeAccordionIndex === index}>
              {song.tutorials.map((tutorial) => (
                <Tutorial key={tutorial.id} data={tutorial} songId={song.id} />
              ))}
            </AccordionContent>
          </Item>
        ))}
      </ul>
    </Section>
  );
}

Tutorials.defaultProps = {
  open: false,
};

Tutorials.propTypes = {
  open: PropTypes.bool,
};

export default Tutorials;
