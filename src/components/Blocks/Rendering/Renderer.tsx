import * as React from 'react';
// tslint:disable-next-line:import-name
import Builder from '@rob10e/svg-path-js';

type Corner = 'round' | 'flat';
type Socket = 'none' | 'external' | 'internal';

class BlockRenderer {
  constructor() {
    this.initialize();
  }

  private initialize(): void {
    this.length = 130;
    this.topCorners = 'round';
    this.bottomCorners = 'round';
    this.socket = 'external';
    this.topConnector = true;
    this.bottomConnector = true;

    this.mainPath = '';
    this.hilightPath = '';
    this.shadowPath = '';
    this.mainBuilder = new Builder();
    this.hilightBuilder = new Builder();
    this.shadowBuilder = new Builder();
  }

  // Constants
  private readonly externalCornerSize: number = 5;

  private readonly toConnector: number = 15;

  private readonly connectorWidth: number = 6;

  private readonly connectorDepth: number = 4;

  private readonly connectorValley: number = 3;

  private readonly lengthReturn: number =
    this.toConnector + this.connectorWidth * 2 + this.connectorValley - 0.5;

  private readonly cornerSize: number = 8;

  // Class variables
  private mainPath: string;

  private hilightPath: string;

  private shadowPath: string;

  private mainBuilder: Builder;

  private hilightBuilder: Builder;

  private shadowBuilder: Builder;

  private length: number;

  private topCorners: Corner;

  private bottomCorners: Corner;

  private socket: Socket;

  private topConnector: boolean;

  private bottomConnector: boolean;

  public render() {
    this.buildSvg();
    return (
      <React.Fragment>
        <path transform="translate(1,1)" fill="#844966" d={this.shadowPath} />
        <path d={this.mainPath} fill="rgb(165, 91, 128)" />
        <path
          style={{
            fill: 'none',
            strokeLinecap: 'round',
            strokeWidth: 1,
          }}
          stroke="#c08ca6"
          d={this.hilightPath}
        />
      </React.Fragment>
    );
  }

  public buildSvg() {
    // Start
    this.mainBuilder.moveToRel(0, this.cornerSize);
    this.shadowBuilder.moveToRel(0, this.cornerSize);
    this.hilightBuilder.moveToRel(0.5, this.cornerSize - 0.5);

    // top-left-corner
    this.buildTopLeftCorner();

    // top-connector
    this.buildTopConnector();

    // length
    this.mainBuilder.horizontalTo(this.length);
    this.shadowBuilder.horizontalTo(this.length);
    this.hilightBuilder.horizontalTo(this.length - 0.5);

    let lengthMod: number = 0;

    // top-right-corner
    lengthMod = this.buildTopRightCorner();

    // socket
    this.buildSocket(lengthMod);

    // bottom-right-corner
    this.buildBottomRightCorner();

    // length-return
    this.mainBuilder.horizontalTo(this.lengthReturn);
    this.shadowBuilder.horizontalTo(this.lengthReturn);

    // bottom-connector
    this.buildBottomConnector();

    // bottom-left-corner
    this.buildBottomLeftCorner();

    // end
    this.mainPath = this.mainBuilder.close();
    this.shadowPath = this.shadowBuilder.close();
    this.hilightPath = this.hilightBuilder.end();
  }

  private buildBottomLeftCorner() {
    if (this.bottomCorners === 'round') {
      this.mainBuilder.arcToRel(
        this.cornerSize,
        this.cornerSize,
        0,
        false,
        true,
        -this.cornerSize,
        -this.cornerSize,
      );
      this.shadowBuilder.arcToRel(
        this.cornerSize,
        this.cornerSize,
        0,
        false,
        true,
        -this.cornerSize,
        -this.cornerSize,
      );
      this.hilightBuilder
        .moveTo(2.6966991411008934, 22.303300858899107)
        .arcTo(this.cornerSize - 0.5, this.cornerSize - 0.5, 0, false, true, 0.5, 17)
        .verticalTo(this.cornerSize);
    } else {
      this.mainBuilder.horizontalTo(0);
      this.shadowBuilder.horizontalTo(0);
      this.hilightBuilder.moveTo(0, 22.303300858899107).verticalTo(0);
    }
  }

  private buildBottomConnector() {
    if (this.bottomConnector) {
      this.mainBuilder
        .lineToRel(-this.connectorWidth, this.connectorDepth)
        .lineToRel(-this.connectorValley, 0)
        .lineToRel(-this.connectorWidth, -this.connectorDepth)
        .horizontalTo(this.cornerSize);
      this.shadowBuilder
        .lineToRel(-this.connectorWidth, this.connectorDepth)
        .lineToRel(-this.connectorValley, 0)
        .lineToRel(-this.connectorWidth, -this.connectorDepth)
        .horizontalTo(this.cornerSize);
    } else {
      this.mainBuilder.horizontalTo(this.toConnector - this.cornerSize);
      this.shadowBuilder.horizontalTo(this.toConnector - this.cornerSize);
    }
  }

  private buildBottomRightCorner() {
    if (this.bottomCorners === 'round' && this.socket !== 'external') {
      this.mainBuilder.arcToRel(
        this.cornerSize,
        this.cornerSize,
        0,
        false,
        true,
        -this.cornerSize,
        this.cornerSize,
      );
      this.shadowBuilder.arcToRel(
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
      this.shadowBuilder.verticalToRel(this.externalCornerSize);
    }
  }

  private buildSocket(lengthMod: number) {
    if (this.socket === 'external') {
      this.mainBuilder.cubicToRel(0, 10, -8, -8, -8, 7.5).smoothToRel(8, -2.5, 8, 7.5);
      this.shadowBuilder.cubicToRel(0, 10, -8, -8, -8, 7.5).smoothToRel(8, -2.5, 8, 7.5);
      this.hilightBuilder
        .moveTo(this.length + lengthMod - 0.5, 0.5)
        .moveTo(this.length + lengthMod - 5.5, 19.3)
        .lineToRel(3.68, -2.1);
    } else if (this.socket === 'internal') {
      // TODO: build this
    } else {
      this.mainBuilder.verticalToRel(10);
      this.shadowBuilder.verticalToRel(10);
    }
  }

  private buildTopRightCorner(): number {
    let lengthMod: number = 0;
    if (this.topCorners === 'round' && this.socket !== 'external') {
      this.mainBuilder.arcToRel(
        this.cornerSize,
        this.cornerSize,
        0,
        false,
        true,
        this.cornerSize,
        this.cornerSize,
      );
      this.shadowBuilder.arcToRel(
        this.cornerSize,
        this.cornerSize,
        0,
        false,
        true,
        this.cornerSize,
        this.cornerSize,
      );
    } else {
      lengthMod = this.cornerSize - this.externalCornerSize;
      this.mainBuilder.horizontalToRel(lengthMod);
      this.shadowBuilder.horizontalToRel(lengthMod);
      this.hilightBuilder.horizontalToRel(lengthMod - 0.5);
      this.mainBuilder.verticalToRel(this.externalCornerSize);
      this.shadowBuilder.verticalToRel(this.externalCornerSize);
    }
    return lengthMod;
  }

  private buildTopConnector() {
    if (this.topConnector) {
      this.mainBuilder
        .horizontalTo(this.toConnector)
        .lineToRel(this.connectorWidth, this.connectorDepth)
        .lineToRel(this.connectorValley, 0)
        .lineToRel(this.connectorWidth, -this.connectorDepth);
      this.shadowBuilder
        .horizontalTo(this.toConnector)
        .lineToRel(this.connectorWidth, this.connectorDepth)
        .lineToRel(this.connectorValley, 0)
        .lineToRel(this.connectorWidth, -this.connectorDepth);
      this.hilightBuilder
        .horizontalTo(15)
        .lineToRel(this.connectorWidth, this.connectorDepth)
        .lineToRel(this.connectorValley, 0)
        .lineToRel(this.connectorWidth, -this.connectorDepth);
    }
  }

  private buildTopLeftCorner() {
    if (this.topCorners === 'round') {
      this.mainBuilder.arcTo(this.cornerSize, this.cornerSize, 0, false, true, this.cornerSize, 0);
      this.shadowBuilder.arcTo(
        this.cornerSize,
        this.cornerSize,
        0,
        false,
        true,
        this.cornerSize,
        0,
      );
      this.hilightBuilder.arcTo(
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
      this.shadowBuilder.verticalTo(0);
      this.hilightBuilder.verticalTo(0);
    }
  }
}
export const RenderContext = React.createContext(new BlockRenderer());

export default BlockRenderer;
