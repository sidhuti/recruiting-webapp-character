import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST, CHARACTER_URL } from '../consts';
import Attributes from './Attributes';
import Classes from './Classes';
import Skills from './Skills';

const initialAttributes = ATTRIBUTE_LIST.reduce((acc, attr) => ({ ...acc, [attr]: 10 }), {});

const Container = styled.div`
  padding: 20px;
`;

const CharacterContainer = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
`;

const Title = styled.h3`
  margin-top: 0;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const CharacterSheet = () => {
  const [characters, setCharacters] = useState([{ id: 1, attributes: { ...initialAttributes }, exceedsLimit: false, selectedClass: null }]);

  const addCharacter = () => {
    setCharacters([...characters, { id: characters.length + 1, attributes: { ...initialAttributes }, exceedsLimit: false, selectedClass: null }]);
  };

  // Function to update character attributes && make sure total does not exceed 70
  const updateAttribute = (id, attr, value) => {
    setCharacters(characters.map(char => {
      if (char.id === id) {
        const newAttributes = { ...char.attributes, [attr]: value };
        const total = Object.values(newAttributes).reduce((sum, val) => sum + val, 0);
        if (total <= 70) {
          return { ...char, attributes: newAttributes, exceedsLimit: false };
        } else {
          return { ...char, exceedsLimit: true };
        }
      }
      return char;
    }));
  };

  const selectClass = (id, selectedClass) => {
    setCharacters(characters.map(char => {
      if (char.id === id) {
        return { ...char, selectedClass };
      }
      return char;
    }));
  };

  const saveCharacter = async (character) => {
    await fetch(CHARACTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(character),
    });
  };

  const loadCharacter = async () => {
    const response = await fetch(CHARACTER_URL);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    loadCharacter().then(data => {
      if (data.statusCode == 200) {
        setCharacters(data.body.characters);
      }
    });
  }, []);

  useEffect(() => {
    saveCharacter({ characters });
  }, [characters]);

  return (
    <Container>
      {characters.map(character => (
        <CharacterContainer key={character.id}>
          <Title>Character {character.id}</Title>
          <Attributes
            attributes={character.attributes}
            updateAttribute={(attr, value) => updateAttribute(character.id, attr, value)}
            exceedsLimit={character.exceedsLimit}
          />
          <Classes
            attributes={character.attributes}
            classes={CLASS_LIST}
            selectedClass={character.selectedClass}
            selectClass={(selectedClass) => selectClass(character.id, selectedClass)}
          />
          <Skills attributes={character.attributes} skills={SKILL_LIST} />
        </CharacterContainer>
      ))}
      <Button onClick={addCharacter}>Add Character</Button>
    </Container>
  );
};

export default CharacterSheet;
