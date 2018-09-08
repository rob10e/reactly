import * as React from 'react';
import Renderer from './Rendering/Renderer';

export interface IBlockProps {
}

export interface IBlockState {
}

export default class Block extends React.Component<IBlockProps, IBlockState> {
  private renderer = new Renderer();

  public state: IBlockState = {

  };

  public render() {
    return (
      this.renderer.render()
    );
  }
}
