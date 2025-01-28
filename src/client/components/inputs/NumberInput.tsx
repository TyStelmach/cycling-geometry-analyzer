import { FunctionComponent } from 'preact';
import { NumberInputProps } from './InputTypes';

const NumberInput: FunctionComponent<NumberInputProps> = ({
  name,
  value,
  type,
  step,
  min,
  max,
  onChange
}) => {

  return (
    <div class="cp-input">
      <label for={name} className="cp-label">{name}</label>
      <input
        type={type}
        value={value}
        name={name}
        step={step}
        min={min}
        max={max}
        onChange={onChange}
      />
    </div>
  )
}

export default NumberInput;