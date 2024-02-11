import { FunctionComponent, JSX } from 'preact';


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
  onChange
}) => {

  const handleChange = ({ currentTarget }: JSX.TargetedEvent<HTMLRangeElement, Event>) => {
    onChange(currentTarget.name, currentTarget.value);
  };

  return (
    <div class="form-input">
      <label for={name} class="form-label">{name} ({value})</label>
      <input
        type="range"
        name={name}
        min={min}
        max={max}
        onChange={handleChange}
      />


    </div>
  )
}

export default SliderInput;