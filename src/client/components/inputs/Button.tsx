import { FunctionComponent } from 'preact';
import { ButtonInputProps } from './InputTypes';

const Button: FunctionComponent<ButtonInputProps> = ({
  name,
  value,
  disabled,
  onClick,
}) => {

  return (
    <div class="button">
      <button disabled={disabled} onClick={onClick}>
        {value}
      </button>
    </div>
  )
}

export default Button;