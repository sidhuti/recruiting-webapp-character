import React, { useState } from 'react';
import styled from 'styled-components';
import { SKILL_LIST } from '../consts';

const SkillsContainer = styled.div`
  margin-bottom: 20px;
`;

const SkillRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const SkillName = styled.span`
  flex: 2;
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
  flex: 1;
  text-align: center;
`;

const Total = styled.span`
  flex: 1;
  text-align: center;
`;

const Points = styled.span`
  flex: 1;
  text-align: center;
`;

const Skills = ({ attributes }) => {
  const calculateModifier = (value) => Math.floor((value - 10) / 2);
  const initialSkillPoints = SKILL_LIST.reduce((acc, skill) => ({ ...acc, [skill.name]: 0 }), {});
  const [skillPoints, setSkillPoints] = useState(initialSkillPoints);

  const updateSkill = (skill, value) => {
    setSkillPoints(prev => ({
      ...prev,
      [skill]: Math.max(0, value),
    }));
  };

  // Business Logic : Total skill points available based on intelligence modifier
  const totalSkillPoints = 10 + 4 * calculateModifier(attributes.Intelligence);
  const spentSkillPoints = Object.values(skillPoints).reduce((acc, points) => acc + points, 0);

  return (
    <SkillsContainer>
      <h3>Skills</h3>
      <p>Total Points to Spend: {totalSkillPoints - spentSkillPoints}</p>
      {SKILL_LIST.map(({ name, attributeModifier }) => (
        <SkillRow key={name}>
          <SkillName>{name}</SkillName>
          <Button
            onClick={() => updateSkill(name, skillPoints[name] - 1)}
            disabled={skillPoints[name] <= 0}
          >
            -
          </Button>
          <Points>{skillPoints[name]}</Points>
          <Button
            onClick={() => updateSkill(name, skillPoints[name] + 1)}
            disabled={spentSkillPoints >= totalSkillPoints}
          >
            +
          </Button>
          <Modifier>Modifier ({attributeModifier}): {calculateModifier(attributes[attributeModifier])}</Modifier>
          <Total>Total: {skillPoints[name] + calculateModifier(attributes[attributeModifier])}</Total>
        </SkillRow>
      ))}
    </SkillsContainer>
  );
};

export default Skills;
