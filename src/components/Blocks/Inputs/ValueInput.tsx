import * as React from 'react';
import Input, { Types, Align } from '../Rendering/Input';

export interface IValueInputProps {
  children: React.ReactChildren | React.ReactChild;
  name: string;
  type?: Types;
  alignment?: Align.Right;
}

export interface IValueInputState {}

export default class ValueInput extends React.Component<IValueInputProps, IValueInputState> {
  public static defaultProps = {
    type: Types.Any,
    alignment: Align.Left,
  };

  public render() {
    return (
    <Input>
      {this.props.children}
    </Input>
    );
  }
}
