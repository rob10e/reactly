import * as React from 'react';
// mport * as Konva from 'konva';
import { Shape, Group } from 'react-konva';

export interface IGenericBlockProps {}

export interface IGenericBlockState {}

export default class GenericBlock extends React.Component<IGenericBlockProps, IGenericBlockState> {
  constructor(props: IGenericBlockProps) {
    super(props);

    this.state = {};
  }

  public render() {
    // const circleStyle = this.state;
    return (
      <Group data-id="f=lE=2eHyU(FK6Y@}YGr">
        <Shape
          fill="#a55b80"
          /* eslint-disable react/jsx-no-bind, func-names */
          sceneFunc={function (context) {
            const arc = 8;
            const toConnect = 15;
            const connectWidth = 6;
            const connectDepth = 4;
            const connectValley = 3;
            let x: number = 0;
            let y: number = 0;
            let x1: number = 0;
            let y1: number = 0;
            let x2: number = 0;
            let y2: number = 0;
            const length = 130.31259155273438;
            context.beginPath();
            y += arc;
            context.moveTo(x, y);
            context.arc(arc, arc, arc, 1 * Math.PI, 1.5 * Math.PI, false);
            y += -arc;
            x = toConnect;
            context.lineTo(x, y);
            x += connectWidth;
            y += connectDepth;
            context.lineTo(x, y);
            x += connectValley;
            context.lineTo(x, y);
            x += connectWidth;
            y += -connectDepth;
            context.lineTo(x, y);
            x += length;
            context.lineTo(x, y);
            y += 5;
            context.lineTo(x, y);
            x1 = x;
            y1 = y + 10;
            x2 = x - 8;
            y2 = y - 8;
            x += -8;
            y += 7.5;
            context.bezierCurveTo(x1, y1, x2, y2, x, y);
            x1 = x + 0.5;
            y1 = y + 16;
            x2 = x + 8.5;
            y2 = y - 8;
            x += 8;
            y += 7.5;
            context.bezierCurveTo(x1, y1, x2, y2, x, y);
            y += 5;
            context.lineTo(x, y);
            x += -length;
            context.lineTo(x, y);

            x += -connectWidth;
            y += connectDepth;
            context.lineTo(x, y);
            x += -connectValley;
            context.lineTo(x, y);
            x += -connectWidth;
            y += -connectDepth;
            context.lineTo(x, y);
            x += -toConnect + arc;
            context.lineTo(x, y);

            context.arc(arc, y - arc, arc, 0.5 * Math.PI, 1 * Math.PI, false);

            context.closePath();
            // @ts-ignore
            context.fillStrokeShape(this);
          }}
        />
        {/* <path
        //   className="blocklyPath"
        //   fill="#a55b80"
        //   d="m 0,8 A 8,8 0 0,1 8,0 H 15 l 6,4 3,0 6,-4 H 130.31259155273438 v 5
        //   c 0,10 -8,-8 -8,7.5
        //   s 8,-2.5 8,7.5
        //   v 5 H 29.5 l -6,4 -3,0 -6,-4 H 0 z"
        // /> */}
      </Group>
    );
  }
}
