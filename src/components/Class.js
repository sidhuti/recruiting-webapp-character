import { useContext, useState } from "react";
import styled from "styled-components";
import Modal from "styled-react-modal";
import { AppContext } from "../App";
import { isBelongigToClass } from "../utils/utils";

const StyledModal = Modal.styled`
  width: 20rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

export const Class = () => {
  const { state } = useContext(AppContext);

  console.log(state);

  const [isOpen, setIsOpen] = useState(false);

  const [modalData, setData] = useState({});
  const [modalTitle, setTitle] = useState(undefined);

  function toggleModal(e) {
    setIsOpen(!isOpen);
  }

  const showModal = (data, title) => {
    setIsOpen(true);
    setData(data);
    setTitle(title);
  };

  console.log(modalData);

  return (
    <Wrapper>
      <Header> Classes </Header>
      <Title
        isbelong={isBelongigToClass(
          state.attributes,
          state.CLASS_LIST.Barbarian
        )}
        onClick={() => showModal(state.CLASS_LIST.Barbarian, "Barbarian")}
      >
        Barbarian
      </Title>
      <Title
        isbelong={isBelongigToClass(state.attributes, state.CLASS_LIST.Wizard)}
        onClick={() => showModal(state.CLASS_LIST.Wizard, "Wizard")}
      >
        Wizard
      </Title>
      <Title
        isbelong={isBelongigToClass(state.attributes, state.CLASS_LIST.Bard)}
        onClick={() => showModal(state.CLASS_LIST.Bard, "Bard")}
      >
        Bard
      </Title>
      <StyledModal
        isOpen={isOpen}
        onBackgroundClick={toggleModal}
        onEscape
        Keydown={toggleModal}
      >
        <table>
          <tr>
            <td style={{ "text-decoration": "underline" }}>{modalTitle}</td>
          </tr>
          {Object.keys(modalData)?.map((key) => (
            <tr>
              <td>
                {key}: {modalData[key]}
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <button onClick={toggleModal}>Close me</button>
            </td>
          </tr>
        </table>
      </StyledModal>
    </Wrapper>
  );
};

const Title = styled.h1`
  font-size: 15px;
  text-align: center;
  color: ${(props) => (props.isbelong ? "green" : "white")};
  cursor: pointer;
`;

const Header = styled(Title)`
  text-decoration: underline;
`;

const Wrapper = styled.section`
  padding: 4em;
  background: grey;
  width: 300px;
  height: 276px;
  float: left;
  border: 8px solid white;
`;

export default Class;
