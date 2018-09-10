import * as React from 'react';
import { RenderContext } from '../components/Blocks/Rendering/Renderer';

// This function takes a component...
export function withRenderer(Component) {
  // ...and returns another component...
  return function RenderedComponent(props) {
    // ... and renders the wrapped component with the context theme!
    // Notice that we pass through any additional props as well
    return (
      <RenderContext.Consumer>
        {renderer => <Component {...props} renderer={renderer} />}
      </RenderContext.Consumer>
    );
  };
}
