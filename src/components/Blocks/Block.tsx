import * as React from 'react';
import BlockRender from './Block.render';

export interface IBlockProps {
}

export interface IBlockState {
}

export default class Block extends React.Component<IBlockProps, IBlockState> {
  public state: IBlockState = {

  };

  public render() {
    return (
      <BlockRender topCorners="flat" bottomCorners="flat"/>
    );
  }
}
