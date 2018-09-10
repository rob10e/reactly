import * as React from 'react';
import Renderer, { RenderContext } from './Rendering/Renderer';
import TextField from './Fields/TextField';
import ValueInput from './Inputs/ValueInput';
import { Types, Align } from './Rendering/Input';

export enum InputType {
  Automatic,
  Internal,
  External,
}

export enum Connections {
  NoConnections,
  LeftOutput,
  TopBottom,
  TopOnly,
  BottomOnly,
}

export interface IBlockProps {
  name: string;
  inputs: InputType;
  connections: Connections;
  tooltip?: string;
  helpUrl?: string;
  color: number;
  topType?: Types;
  bottomType?: Types;
  outputType?: Types;
}

export interface IBlockState {
}

export default class Block extends React.Component<IBlockProps, IBlockState> {
  public static defaultProps = {
    tooltip: '',
    helpUrl: '',
    topType: Types.Any,
    bottomType: Types.Any,
    outputType: Types.Any,
  };

  private renderer = new Renderer();

  public render() {
    return (
      <RenderContext.Provider value={this.renderer}>
        <ValueInput name="Test_1" type={Types.Boolean} alignment={Align.Right}>
          <TextField value="Test"/>
        </ValueInput>
        <ValueInput name="Test_2">
          <TextField value="Still Testing"/>
        </ValueInput>
      </RenderContext.Provider>
    );
  }
}
