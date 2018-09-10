import * as React from 'react';
import { withRenderer } from '../../../HOC/withRenderer';

export interface ITextFieldProps {
  value: string;
}

export interface ITextFieldState {
}

class TextField extends React.Component<ITextFieldProps, ITextFieldState> {
  public render() {
    return null;
  }
}

export default withRenderer(TextField);
