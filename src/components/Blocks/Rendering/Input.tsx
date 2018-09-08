import * as React from 'react';
import { IFieldProps } from './Field';

export interface IInputProps {
  children: React.ReactElement<IFieldProps>[] | React.ReactElement<IFieldProps>;
}

export interface IInputState {
}

export enum Types {
  Any,
  Boolean,
  Number,
  String,
  Array,
  Other,
}

class Input extends React.Component<IInputProps, IInputState> {
  public render() {
    return null;
  }
}

export default Input;
