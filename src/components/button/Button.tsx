import styled from 'styled-components';

export const Button = styled.button`
  position: relative;
  height: 40px;
  min-width: 120px;
  font-size: 16px;
  border-radius: 10px;
  cursor: pointer;
  border: 1px solid black;
  &:hover {
    box-shadow: 0 3px 10px -3px rgba(0, 0, 0, 0.25);
    border-color: blue;
    color: blue;
  }
  &:active {
    top: 1px;
  }
  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }
`;
