import { ComponentType } from 'react';

export const withDefaultProps = <P extends object, DP extends Partial<P> = Partial<P>>(
  defaultProps: DP,
  component: ComponentType<P>,
) => {
  // Extract props that need to be riquired
  type PropsExcludingDefaults = Pick<P, Exclude<keyof P, keyof DP>>;

  type RecomposedProps = Partial<DP> & Required<PropsExcludingDefaults>;

  component.defaultProps = defaultProps;

  return (component as ComponentType<any>) as ComponentType<RecomposedProps>;
};
