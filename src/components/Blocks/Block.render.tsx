import * as React from 'react';
// tslint:disable-next-line:import-name
import Builder from '@rob10e/svg-path-js';
import { withDefaultProps } from '../../HOC/withDefaultProps';

export interface IBlockRenderProps {
}

type DefaultProps = {
  length: number;
  topCorners: Corner;
  bottomCorners: Corner;
  topConnector: boolean;
  bottomConnector: boolean;
  socket: Socket;
};

const defaultProps: Readonly<DefaultProps> = {
  length: 130,
  topCorners: 'round',
  bottomCorners: 'round',
  topConnector: true,
  bottomConnector: true,
  socket: 'external',
};

type Corner = 'round' | 'flat';
type Socket = 'none' | 'external' | 'internal';

class BlockRenderer extends React.Component<IBlockRenderProps & DefaultProps> {
  private externalCornerSize: number = 5;

  private toConnector: number = 15;

  private connectorWidth: number = 6;

  private connectorDepth: number = 4;

  private connectorValley: number = 3;

  private lengthReturn: number =
    this.toConnector + this.connectorWidth * 2 + this.connectorValley - 0.5;

  private cornerSize: number = 8;

  private mainPath: string = '';

  private lightPath: string = '';

  private darkPath: string = '';

  private mainBuilder: Builder = new Builder();

  private lightBuilder: Builder = new Builder();

  private darkBuilder: Builder = new Builder();

  public render() {
    this.buildSvg();
    return (
      <React.Fragment>
        <path transform="translate(1,1)" fill="#844966" d={this.darkPath} />
        <path d={this.mainPath} fill="rgb(165, 91, 128)" />
        <path
          style={{
            fill: 'none',
            strokeLinecap: 'round',
            strokeWidth: 1,
          }}
          stroke="#c08ca6"
          d={this.lightPath}
        />
      </React.Fragment>
    );
  }

  private buildSvg() {
    const { length } = this.props;
    // Start
    this.mainBuilder.moveToRel(0, this.cornerSize);
    this.darkBuilder.moveToRel(0, this.cornerSize);
    this.lightBuilder.moveToRel(0.5, this.cornerSize - 0.5);

    // top-left-corner
    this.buildTopLeftCorner();

    // top-connector
    this.buildTopConnector();

    // length
    this.mainBuilder.horizontalTo(length);
    this.darkBuilder.horizontalTo(length);
    this.lightBuilder.horizontalTo(length - 0.5);

    let lengthMod: number = 0;

    // top-right-corner
    lengthMod = this.buildTopRightCorner();

    // socket
    this.buildSocket(lengthMod);

    // bottom-right-corner
    this.buildBottomRightCorner();

    // length-return
    this.mainBuilder.horizontalTo(this.lengthReturn);
    this.darkBuilder.horizontalTo(this.lengthReturn);

    // bottom-connector
    this.buildBottomConnector();

    // bottom-left-corner
    this.buildBottomLeftCorner();

    // end
    this.mainPath = this.mainBuilder.close();
    this.darkPath = this.darkBuilder.close();
    this.lightPath = this.lightBuilder.end();
  }

  private buildBottomLeftCorner() {
    const { bottomCorners } = this.props;
    if (bottomCorners === 'round') {
      this.mainBuilder.arcToRel(
        this.cornerSize,
        this.cornerSize,
        0,
        false,
        true,
        -this.cornerSize,
        -this.cornerSize,
      );
      this.darkBuilder.arcToRel(
        this.cornerSize,
        this.cornerSize,
        0,
        false,
        true,
        -this.cornerSize,
        -this.cornerSize,
      );
      this.lightBuilder
        .moveTo(2.6966991411008934, 22.303300858899107)
        .arcTo(this.cornerSize - 0.5, this.cornerSize - 0.5, 0, false, true, 0.5, 17)
        .verticalTo(this.cornerSize);
    } else {
      this.mainBuilder.horizontalTo(0);
      this.darkBuilder.horizontalTo(0);
      this.lightBuilder.moveTo(0, 22.303300858899107).verticalTo(0);
    }
  }

  private buildBottomConnector() {
    const { bottomConnector } = this.props;

    if (bottomConnector) {
      this.mainBuilder
        .lineToRel(-this.connectorWidth, this.connectorDepth)
        .lineToRel(-this.connectorValley, 0)
        .lineToRel(-this.connectorWidth, -this.connectorDepth)
        .horizontalTo(this.cornerSize);
      this.darkBuilder
        .lineToRel(-this.connectorWidth, this.connectorDepth)
        .lineToRel(-this.connectorValley, 0)
        .lineToRel(-this.connectorWidth, -this.connectorDepth)
        .horizontalTo(this.cornerSize);
    } else {
      this.mainBuilder.horizontalTo(this.toConnector - this.cornerSize);
      this.darkBuilder.horizontalTo(this.toConnector - this.cornerSize);
    }
  }

  private buildBottomRightCorner() {
    const { bottomCorners, socket } = this.props;

    if (bottomCorners === 'round' && socket !== 'external') {
      this.mainBuilder.arcToRel(
        this.cornerSize,
        this.cornerSize,
        0,
        false,
        true,
        -this.cornerSize,
        this.cornerSize,
      );
      this.darkBuilder.arcToRel(
        this.cornerSize,
        this.cornerSize,
        0,
        false,
        true,
        -this.cornerSize,
        this.cornerSize,
      );
    } else {
      this.mainBuilder.verticalToRel(this.externalCornerSize);
      this.darkBuilder.verticalToRel(this.externalCornerSize);
    }
  }

  private buildSocket(lengthMod: number) {
    const { socket } = this.props;

    if (socket === 'external') {
      this.mainBuilder.cubicToRel(0, 10, -8, -8, -8, 7.5).smoothToRel(8, -2.5, 8, 7.5);
      this.darkBuilder.cubicToRel(0, 10, -8, -8, -8, 7.5).smoothToRel(8, -2.5, 8, 7.5);
      this.lightBuilder
        .moveTo(length + lengthMod - 0.5, 0.5)
        .moveTo(length + lengthMod - 5.5, 19.3)
        .lineToRel(3.68, -2.1);
    } else if (socket === 'internal') {
      // TODO: build this
    } else {
      this.mainBuilder.verticalToRel(10);
      this.darkBuilder.verticalToRel(10);
    }
  }

  private buildTopRightCorner(): number {
    const { topCorners, socket } = this.props;

    let lengthMod: number = 0;
    if (topCorners === 'round' && socket !== 'external') {
      this.mainBuilder.arcTo(
        this.cornerSize,
        this.cornerSize,
        0,
        false,
        true,
        length + this.cornerSize,
        this.cornerSize,
      );
      this.darkBuilder.arcTo(
        this.cornerSize,
        this.cornerSize,
        0,
        false,
        true,
        length + this.cornerSize,
        this.cornerSize,
      );
    } else {
      lengthMod = this.cornerSize - this.externalCornerSize;
      this.mainBuilder.horizontalToRel(lengthMod);
      this.darkBuilder.horizontalToRel(lengthMod);
      this.lightBuilder.horizontalToRel(lengthMod - 0.5);
      this.mainBuilder.verticalToRel(this.externalCornerSize);
      this.darkBuilder.verticalToRel(this.externalCornerSize);
    }
    return lengthMod;
  }

  private buildTopConnector() {
    const { topConnector } = this.props;

    if (topConnector) {
      this.mainBuilder
        .horizontalTo(this.toConnector)
        .lineToRel(this.connectorWidth, this.connectorDepth)
        .lineToRel(this.connectorValley, 0)
        .lineToRel(this.connectorWidth, -this.connectorDepth);
      this.darkBuilder
        .horizontalTo(this.toConnector)
        .lineToRel(this.connectorWidth, this.connectorDepth)
        .lineToRel(this.connectorValley, 0)
        .lineToRel(this.connectorWidth, -this.connectorDepth);
      this.lightBuilder
        .horizontalTo(15)
        .lineToRel(this.connectorWidth, this.connectorDepth)
        .lineToRel(this.connectorValley, 0)
        .lineToRel(this.connectorWidth, -this.connectorDepth);
    }
  }

  private buildTopLeftCorner() {
    const { topCorners } = this.props;

    if (topCorners === 'round') {
      this.mainBuilder.arcTo(this.cornerSize, this.cornerSize, 0, false, true, this.cornerSize, 0);
      this.darkBuilder.arcTo(this.cornerSize, this.cornerSize, 0, false, true, this.cornerSize, 0);
      this.lightBuilder.arcTo(
        this.cornerSize - 0.5,
        this.cornerSize - 0.5,
        0,
        false,
        true,
        this.cornerSize,
        0.5,
      );
    } else {
      this.mainBuilder.verticalTo(0);
      this.darkBuilder.verticalTo(0);
      this.darkBuilder.verticalTo(0);
    }
  }
}

export default withDefaultProps(defaultProps, BlockRenderer);
