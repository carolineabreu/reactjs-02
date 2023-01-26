import { ButtonContainer, ButtonVariant } from './Button.styles';

interface ButtonProps {
  variant?: ButtonVariant;
}

export function Button({ variant = 'primary' }: ButtonProps) { /**se a cor não for passada, eu quero que o padrão seja primary */
  /** como fazer no css puro
   * return(
   * <button className={`${styles.button} ${styles[color]}`}>oi</button> 
   * ${styles[props.color]} não funciona por color está como opcional, por isso mudamos props: ButtonProps pra { color = 'primary' }: ButtonProps
   * )
   */
  return <ButtonContainer variant={variant}>Enviar</ButtonContainer>
}