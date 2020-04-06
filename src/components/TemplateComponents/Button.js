import styled from 'styled-components'

export default styled.button`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.textColour};
  border: none;
  cursor: pointer;
  height: 28px;
  border-radius: 4px;
  box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.25),
    0 18px 36px -18px rgba(0, 0, 0, 0.3), 0 -12px 36px -8px rgba(0, 0, 0, 0.025);
  width: 100%;
  max-width: 200px;

  :hover {
    background-color: ${({ theme }) => theme.backgroundHighlight2};
  }

  :disabled {
    background-color: ${({ theme }) => theme.backgroundHighlight3};
    color: ${({ theme }) => theme.backgroundHighlight2};
  }

  :active {
    background-color: ${({ theme }) => theme.backgroundHighlight3};
  }

  &.delete-btn {
    background: ${({ theme }) => theme.dangerColour};
  }
`
