import { FunctionComponent } from 'preact';
import { TextInputProps } from './InputTypes';

const TextInput: FunctionComponent<TextInputProps> = ({
  name,
  value,
  type,
  onChange
}) => {

  return (
    <div class="cp-input">
      <label for={name} className="cp-label">{name}</label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
      />
    </div>
  )
}

export default TextInput;