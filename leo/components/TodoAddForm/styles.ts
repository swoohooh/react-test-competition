import styled from 'styled-components';
import { Palette } from '../../styles/palette';

export const AddTodoForm = styled.div`
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;

  border-left: 0;
  border-right: 0;

  form {
    width: 100%;
    height: 50px;

    display: flex;
    align-items: center;
  }

  input {
    height: 70%;
    padding: 0 10px;
    flex: 1;

    border: 2px solid ${Palette.main};
    border-radius: 4px;
  }

  button {
    height: 70%;
    padding: 0 15px;
    margin-left: 10px;
    flex: none;

    background: ${Palette.main};
    border-radius: 4px;
    font-weight: bold;
  }
`;
