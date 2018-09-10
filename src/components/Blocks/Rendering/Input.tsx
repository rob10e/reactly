import * as React from 'react';
import { IFieldProps } from './Field';
import { withRenderer } from '../../../HOC/withRenderer';
import BlockRenderer from './Renderer';

export interface IInputProps {
  renderer: BlockRenderer;
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

export enum Align {
  Left,
  Right,
  Center,
}

class Input extends React.Component<IInputProps, IInputState> {
  public render() {
    return this.props.renderer.render();
  }
}

export default withRenderer(Input);
