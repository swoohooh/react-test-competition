import styled from 'styled-components';
import { Palette } from '../../styles/palette';

export const Todo = styled.li<{ isCompleted: boolean }>`
  & > i {
    margin-right: 10px;
    flex: none;

    font-size: 20px;
    color: ${(props) => (props.isCompleted ? Palette.main : '#666')};
  }

  width: 100%;
  height: 50px;
  margin-bottom: 10px;
  padding: 0 10px;

  background: ${(props) => (props.isCompleted ? Palette.mainLight : Palette.grey)};
  border-radius: 4px;
`;

export const EditTodo = styled(Todo)`
  form {
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
  }

  input {
    height: 70%;
    padding: 0 10px;
    flex: 1;

    border: 1px solid #fff;
    border-radius: 4px;
  }

  button {
    height: 70%;
    padding: 0 15px;
    margin-left: 10px;
    flex: none;

    background: ${Palette.main};
    border-radius: 4px;
    color: #fff;
    font-weight: bold;
  }
`;

export const ViewTodo = styled(Todo)`
  display: flex;
  align-items: center;
  cursor: pointer;

  p {
    height: 100%;
    margin-right: auto;

    display: flex;
    align-items: center;
    flex: 1;
    font-size: 15px;
  }

  button {
    height: 35px;
    width: 35px;
    margin-left: 10px;

    display: flex;
    align-items: center;
    justify-content: center;
    flex: none;

    background: #fff;
    border-radius: 50%;

    i {
      color: ${Palette.main};
    }
  }
`;
