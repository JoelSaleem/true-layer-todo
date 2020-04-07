import styled from 'styled-components'

export default styled.div`
  padding: 6px;
  margin-top: 12px;
  margin-bottom: 12px;
  text-overflow: ellipsis;
  box-shadow: 0 10px 10px -12px rgba(0, 0, 0, 0.25),
    0 10px 10px -10px rgba(0, 0, 0, 0.3), 0 -10px 10px -8px rgba(0, 0, 0, 0.025);
  background-color: ${({ theme }) => theme.backgroundHighlight2};
  border-radius: 8px;
  cursor: pointer;

  &.unclickable {
    cursor: default;
  }
`
