import * as React from 'react';
import Input from '../Rendering/Input';
import TextField from '../Fields/TextField';

export interface IInputValueProps {}

export interface IInputValueState {}

export default class InputValue extends React.Component<IInputValueProps, IInputValueState> {
  public render() {
    return (
    <Input>
      <TextField value="Test"/>
    </Input>
    );
  }
}
