import React from 'react';
import styled from 'styled-components';

const ClassContainer = styled.div`
  margin-bottom: 20px;
`;

const ClassRow = styled.div`
  cursor: pointer;
  color: ${props => (props.$meetsRequirements ? 'green' : 'red')};
`;

const ClassDetails = styled.div`
  margin-top: 10px;
`;

const Classes = ({ attributes, classes, selectedClass, selectClass }) => {
  // Check if character meets the minimum requirements to be highlighted in green.
  const checkRequirements = (cls) => {
    return Object.entries(classes[cls]).every(([attr, min]) => attributes[attr] >= min);
  };

  return (
    <ClassContainer>
      <h3>Classes</h3>
      {Object.keys(classes).map(cls => (
        <ClassRow
          key={cls}
          onClick={() => selectClass(cls)}
          $meetsRequirements={checkRequirements(cls)}
        >
          {cls}
        </ClassRow>
      ))}
      {selectedClass && (
        <ClassDetails>
          <h4>{selectedClass} Requirements:</h4>
          {Object.entries(classes[selectedClass]).map(([attr, min]) => (
            <div key={attr}>{attr}: {min}</div>
          ))}
        </ClassDetails>
      )}
    </ClassContainer>
  );
};

export default Classes;
