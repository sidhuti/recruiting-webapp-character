import React from 'react';
import styled from 'styled-components';
import { ATTRIBUTE_LIST } from '../consts';

const AttributeContainer = styled.div`
  margin-bottom: 20px;
`;

const AttributeRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const AttributeName = styled.span`
  flex: 1;
`;

const Button = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #0056b3;
  }
`;

const Modifier = styled.span`
  margin-left: 10px;
`;

const Warning = styled.p`
  color: red;
  margin-top: 10px;
`;

const Attributes = ({ attributes, updateAttribute, exceedsLimit }) => {

  // Business Logic : When Attribute value increases by two, modifier increases by one.
  // Eg: Intelligence: 12 -> Intelligence Modifier: 1
  const calculateModifier = (value) => Math.floor((value - 10) / 2);

  return (
    <AttributeContainer>
      <h3>Attributes</h3>
      {ATTRIBUTE_LIST.map(attr => (
        <AttributeRow key={attr}>
          <AttributeName>{attr}: </AttributeName>
          <Button onClick={() => updateAttribute(attr, attributes[attr] - 1)} disabled={attributes[attr] <= 0}>-</Button>
          <span>{attributes[attr]}</span>
          <Button onClick={() => updateAttribute(attr, attributes[attr] + 1)} disabled={exceedsLimit}>+</Button>
          <Modifier>Modifier: {calculateModifier(attributes[attr])}</Modifier>
        </AttributeRow>
      ))}
      {exceedsLimit && <Warning>Total attribute points cannot exceed 70.</Warning>}
    </AttributeContainer>
  );
};

export default Attributes;
