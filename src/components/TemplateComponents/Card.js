import styled from 'styled-components'

export default styled.div`
  background-color: ${({ theme }) => theme.backgroundHighlight};
  box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.25),
    0 18px 36px -18px rgba(0, 0, 0, 0.3), 0 -12px 36px -8px rgba(0, 0, 0, 0.025);
  border-radius: 8px;
  padding: 10px;
`
