//arquivo de definição de tipos. Só pode ter códigos 100% typescript

import 'styled-components';
import { defaultTheme } from '../styles/themes/default';

type ThemeType = typeof defaultTheme

//criando uma tipagem pro modulo styled-components do npm. Quando usar o 
//styled-components em algum arquivo, a definição de tipagem que ele vai puxar 
//vai ser a que está escrita aqui, porque está sobrescrevendo os tipos, pegar o
//que já tem e escrever uma coisa nova
declare module 'styled-components' { 
    export interface DefaultTheme extends ThemeType {}
}