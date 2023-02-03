import styled from 'styled-components'

export const HistoryContainer = styled.main`
  flex: 1;
  padding: 3.5rem;

  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme['gray-100']};
  }
`

export const HistoryList = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;

  table {
    width: 100%;
    border-collapse: collapse; // se colocar bordar de 1px no td ele vai colocar em todos os td e no final vai ficar uma borda de 2px, com o collapse, ele conta só 1px. só uma borda entre eles e não uma borda pra cada
    min-width: 600px;

    th {
      background-color: ${(props) => props.theme['gray-600']};
      padding: 1rem;
      text-align: left;
      color: ${(props) => props.theme['gray-100']};
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      background-color: ${(props) => props.theme['gray-700']};
      border-top: 4px solid ${(props) => props.theme['gray-800']};
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        width: 50%;
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`

const STATUS_COLORS = {
  yellow: 'yellow-500',
  green: 'green-500',
  red: 'red-500',
} as const // se não colocasse as const dava erro na linha 85 background, porque o typescript entende que é um objeto com chaves que recebem string, mas pode ser qualquer string e pode mudar, mas no defaultTheme não pode ser qualquer string, tem que ser as definidas lá. então as const supre esse erro

interface StatusProps {
  statusColor: keyof typeof STATUS_COLORS // não pode ser só keyof STATUS_COLORS porque é um objeto javascript e o typescript não consegue ler objeto js, consegue ler apenas a tipagem. Antes estava statusColor: 'yellow' | 'green' | 'red', mudamos porque a gente ja tem as chaves na const
}

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  // essa parte aqui faz a bolinha dos status
  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: ${(props) => props.theme[STATUS_COLORS[props.statusColor]]};
  }
`
