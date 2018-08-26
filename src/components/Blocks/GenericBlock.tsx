import * as React from 'react';
// mport * as Konva from 'konva';
import { Shape, Group } from 'react-konva';
import * as Konva from 'konva';

export interface IGenericBlockProps {}

export interface IGenericBlockState {}

type Corner = 'round' | 'flat';
type CornerPosition = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
type Socket = 'none' | 'external' | 'internal' | null;
type ConnectorPosition = 'top' | 'bottom';
// Variables
const cornerSize: number = 8;
const externalCornerSize: number = 5;
const toConnect: number = 15;
const connectWidth: number = 6;
const connectDepth: number = 4;
const connectValley: number = 3;
const socketMinSize: number = 10;

type Coordinates = {
  x: number;
  y: number;
};

function drawRightCorner(
  coordinates: Coordinates,
  context: Konva.Context,
  corner: Corner,
  cornerPosition: CornerPosition,
  socket: Socket | null,
  socketCornerSize: number,
): Coordinates {
  const newCoordinates: Coordinates = { x: coordinates.x, y: coordinates.y };
  switch (cornerPosition) {
    case 'topRight':
      if (corner === 'flat' || socket === 'external') {
        newCoordinates.x += socketCornerSize;
        context.lineTo(newCoordinates.x, newCoordinates.y);
        newCoordinates.y += socketCornerSize;
        context.lineTo(newCoordinates.x, newCoordinates.y);
      } else {
        newCoordinates.y += socketCornerSize;
        context.arc(
          newCoordinates.x,
          newCoordinates.y,
          cornerSize,
          1.5 * Math.PI,
          2 * Math.PI,
          false,
        );
        newCoordinates.x += socketCornerSize;
      }
      break;
    case 'bottomRight':
      if (corner === 'flat' || socket === 'external') {
        newCoordinates.y += socketCornerSize;
        context.lineTo(newCoordinates.x, newCoordinates.y);
        newCoordinates.x += -socketCornerSize;
        context.lineTo(newCoordinates.x, newCoordinates.y);
      } else {
        newCoordinates.x += -socketCornerSize;
        context.arc(
          newCoordinates.x,
          newCoordinates.y,
          cornerSize,
          2 * Math.PI,
          0.5 * Math.PI,
          false,
        );
        newCoordinates.y += socketCornerSize;
      }
      break;
    default:
      break;
  }

  return newCoordinates;
}

function drawLeftCorner(
  coordinates: Coordinates,
  context: Konva.Context,
  corner: Corner,
  cornerPosition: CornerPosition,
): Coordinates {
  const newCoordinates: Coordinates = { x: coordinates.x, y: coordinates.y };
  switch (cornerPosition) {
    case 'topLeft':
      newCoordinates.y += cornerSize;
      context.moveTo(newCoordinates.x, newCoordinates.y);
      // @ts-ignore
      if (corner === 'round') {
        context.arc(cornerSize, cornerSize, cornerSize, 1 * Math.PI, 1.5 * Math.PI, false);
        newCoordinates.y += -cornerSize;
      } else {
        newCoordinates.y += -cornerSize;
        context.lineTo(newCoordinates.x, newCoordinates.y);
      }
      break;
    case 'bottomLeft':
    default:
      if (corner === 'round') {
        newCoordinates.x += -toConnect + cornerSize;
        context.lineTo(newCoordinates.x, newCoordinates.y);
        context.arc(
          cornerSize,
          newCoordinates.y - cornerSize,
          cornerSize,
          0.5 * Math.PI,
          1 * Math.PI,
          false,
        );
      } else {
        newCoordinates.x = 0;
        context.lineTo(newCoordinates.x, newCoordinates.y);
      }
      break;
  }

  return newCoordinates;
}

function drawCorner(
  coordinates: Coordinates,
  context: Konva.Context,
  corner: Corner,
  cornerPosition: CornerPosition,
  socket: Socket = null,
): Coordinates {
  let newCoordinates: Coordinates = { x: coordinates.x, y: coordinates.y };
  const socketCornerSize = socket && socket === 'external' ? externalCornerSize : cornerSize;
  switch (cornerPosition) {
    case 'topLeft':
    case 'bottomLeft':
      newCoordinates = drawLeftCorner(newCoordinates, context, corner, cornerPosition);
      break;
    case 'topRight':
    case 'bottomRight':
      newCoordinates = drawRightCorner(
        newCoordinates,
        context,
        corner,
        cornerPosition,
        socket,
        socketCornerSize,
      );
      break;
    default:
      break;
  }
  return newCoordinates;
}

function drawConnector(
  coordinates: Coordinates,
  context: Konva.Context,
  connect: boolean,
  connectorPosition: ConnectorPosition,
): Coordinates {
  const newCoordinates: Coordinates = { x: coordinates.x, y: coordinates.y };
  if (connectorPosition === 'top') {
    newCoordinates.x = toConnect;
    if (connect) {
      context.lineTo(newCoordinates.x, newCoordinates.y);
      newCoordinates.x += connectWidth;
      newCoordinates.y += connectDepth;
      context.lineTo(newCoordinates.x, newCoordinates.y);
      newCoordinates.x += connectValley;
      context.lineTo(newCoordinates.x, newCoordinates.y);
      newCoordinates.x += connectWidth;
      newCoordinates.y += -connectDepth;
      context.lineTo(newCoordinates.x, newCoordinates.y);
    } else {
      newCoordinates.x += connectWidth * 2 + connectValley;
    }
  } else if (connect) {
    newCoordinates.x += -connectWidth;
    newCoordinates.y += connectDepth;
    context.lineTo(newCoordinates.x, newCoordinates.y);
    newCoordinates.x += -connectValley;
    context.lineTo(newCoordinates.x, newCoordinates.y);
    newCoordinates.x += -connectWidth;
    newCoordinates.y += -connectDepth;
    context.lineTo(newCoordinates.x, newCoordinates.y);
  } else {
    newCoordinates.x += -(connectWidth * 2 + connectValley);
  }

  return newCoordinates;
}

function drawExternalSocket(coordinates: Coordinates, context: Konva.Context, socketSize: number) {
  const newCoordinates: Coordinates = { x: coordinates.x, y: coordinates.y };
  const coordinates1: Coordinates = { x: 0, y: 0 };
  const coordinates2: Coordinates = { x: 0, y: 0 };
  coordinates1.x = newCoordinates.x;
  coordinates1.y = newCoordinates.y + 10;
  coordinates2.x = newCoordinates.x - 8;
  coordinates2.y = newCoordinates.y - 8;
  newCoordinates.x += -8;
  newCoordinates.y += 7.5;
  context.bezierCurveTo(
    coordinates1.x,
    coordinates1.y,
    coordinates2.x,
    coordinates2.y,
    newCoordinates.x,
    newCoordinates.y,
  );
  coordinates1.x = newCoordinates.x + 0.5;
  coordinates1.y = newCoordinates.y + 16;
  coordinates2.x = newCoordinates.x + 8.5;
  coordinates2.y = newCoordinates.y - 8;
  newCoordinates.x += 8;
  newCoordinates.y += 7.5;
  context.bezierCurveTo(
    coordinates1.x,
    coordinates1.y,
    coordinates2.x,
    coordinates2.y,
    newCoordinates.x,
    newCoordinates.y,
  );
  newCoordinates.y += socketSize - socketMinSize;
  return newCoordinates;
}

function drawSocket(
  coordinates: Coordinates,
  context: Konva.Context,
  socket: Socket,
  socketSize: number = socketMinSize,
): Coordinates {
  let newCoordinates: Coordinates = { x: coordinates.x, y: coordinates.y };
  switch (socket) {
    case 'external':
      newCoordinates = drawExternalSocket(coordinates, context, socketSize);
      break;
    case 'none':
      newCoordinates.y += socketSize;
      context.lineTo(newCoordinates.x, newCoordinates.y);
      break;
    default:
      break;
  }

  return newCoordinates;
}

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
          sceneFunc={function (context: Konva.Context) {
            let coordinates: Coordinates = { x: 0, y: 0 };
            const length = 130;
            const blockHeight = socketMinSize * 5;
            const topCorners: Corner = 'round';
            const topConnector: boolean = true;
            const socket: Socket = 'external';
            const bottomCorners: Corner = 'round';
            const bottomConnector: boolean = true;

            // Begin shape
            context.beginPath();
            // Corner - top left
            coordinates = drawCorner(coordinates, context, topCorners, 'topLeft');

            // Connector - top
            coordinates = drawConnector(coordinates, context, topConnector, 'top');

            // To End
            coordinates.x += length;
            context.lineTo(coordinates.x, coordinates.y);

            // Corner - top right
            coordinates = drawCorner(coordinates, context, topCorners, 'topRight', socket);

            // Socket
            coordinates = drawSocket(coordinates, context, socket, blockHeight);

            // Corner - bottom right
            coordinates = drawCorner(coordinates, context, bottomCorners, 'bottomRight', socket);

            // To Connector
            coordinates.x += -length;
            context.lineTo(coordinates.x, coordinates.y);

            // Connector - bottom
            coordinates = drawConnector(coordinates, context, bottomConnector, 'bottom');

            // Corner - bottom left
            drawCorner(coordinates, context, bottomCorners, 'bottomLeft', socket);

            context.closePath();
            // End shape
            // @ts-ignore
            context.fillStrokeShape(this);
          }}
        />
      </Group>
    );
  }
}
