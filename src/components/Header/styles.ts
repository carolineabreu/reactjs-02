import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    gap: 0.5rem;

    a {
      width: 3rem;
      height: 3rem;

      display: flex;
      justify-content: center;
      align-items: center;

      color: ${(props) => props.theme['gray-100']};

      // quando hover aparece uma borda bottom de 3px green, se deixar só quando hover ele vai levantar o elemento ao colocar essa borda, então desde já tem uma borda transparente e dai não vai subir o elemento. E por mais que a borda hover seja só em baixo, como queremos que o elemento fique centralizado, colocamos essa borda transparente pra que tenha 3px em cima e 3px em baixo, deixando centralizado.
      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;

      &:hover {
        border-bottom: 3px solid ${(props) => props.theme['green-500']};
      }

      &.active {
        color: ${(props) => props.theme['green-500']};
      }
    }
  }
`
