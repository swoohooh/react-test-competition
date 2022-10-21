import styled from 'styled-components';
import { Palette } from '../../styles/palette';

export const TodoHeader = styled.div`
  padding-top: 25px;
  padding-bottom: 25px;

  font-weight: bold;
  border-bottom: 1px solid ${Palette.grey};

  h1 {
    margin-bottom: 10px;
    font-size: 25px;
  }

  p {
    font-size: 15px;
    color: ${Palette.main};
  }
`;
