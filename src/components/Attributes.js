import { Fragment, useContext } from "react";
import _ from "lodash";
import styled from "styled-components";
import { AppContext } from "../App";
import { abilityModifier } from "../utils/utils";

export const Attributes = () => {
  const { state, dispatch } = useContext(AppContext);

  const add = (type, payload) => {
    dispatch({
      type,
      payload,
    });
  };

  const subtract = (type, payload) => {
    dispatch({
      type,
      payload,
    });
  };

  console.log(state.attributes);

  return (
    <Wrapper>
      <Header> Attributes </Header>
      {state.attributes.map((item) => {
        return (
          <Fragment key={item.name}>
            <Title>
              {item.name}: {item.value} (Modifier: {abilityModifier(item.value)}
              )
              <button
                onClick={() =>
                  add("INCREASE", { name: item.name, value: item.value })
                }
              >
                +
              </button>
              <button
                onClick={() =>
                  subtract("DECREASE", { name: item.name, value: item.value })
                }
              >
                -
              </button>
            </Title>
          </Fragment>
        );
      })}
    </Wrapper>
  );
};

const Title = styled.h1`
  font-size: 15px;
  text-align: center;
  color: white;
  display: "inline-block";
`;

const Header = styled(Title)`
  text-decoration: underline;
`;
const Wrapper = styled.section`
  padding: 4em;
  background: grey;
  width: 300px;
  float: left;
  border: 8px solid white;
`;

export default Attributes;
