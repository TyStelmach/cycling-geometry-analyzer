import { FunctionComponent, JSX } from 'preact';
import { useState } from 'preact/hooks';

interface SliderInputProps {
  name: string,
  value: string,
  min: string,
  max: string,
  onChange: () => void,
}

const SliderInput: FunctionComponent<SliderInputProps> = ({
  name,
  value,
  min,
  max,
  step,
  onChange
}) => {
  const [slideValue, setSlideValue] = useState(value);

  const handleChange = ({ currentTarget }: JSX.TargetedEvent<HTMLRangeElement, Event>) => {
    setSlideValue(currentTarget.value);
    console.log(currentTarget.name, currentTarget.value)
    onChange(currentTarget.name, currentTarget.value);
  };

  return (
    <div class="form-input">
      <label for={name} class="form-label">{name} ({slideValue})</label>
      <input
        type="range"
        name={name}
        min={min}
        max={max}
        value={slideValue}
        onChange={handleChange}
        step={step}
      />
    </div>
  )
}

export default SliderInput;