import { JSX } from "preact/jsx-runtime";

export interface NumberInputProps {
  name: string;
  value: number;
  type: string;
  step: number;
  min: number;
  max: number;
  onChange: (e: JSX.TargetedEvent<HTMLInputElement, Event>) => void;
}

export interface TextInputProps {
  name: string;
  value: string | number | undefined;
  type: string;
  onChange: (e: JSX.TargetedEvent<HTMLInputElement, Event>) => void;
}

export interface ButtonInputProps {
  name: string;
  value: string | number;
  disabled: boolean;
  onClick: (e: JSX.TargetedEvent<HTMLInputElement, Event>) => void;
}