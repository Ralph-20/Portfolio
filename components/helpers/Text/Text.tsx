import { createElement, forwardRef } from 'react';

export type TextProps = {
  field: string;
  tag?: keyof JSX.IntrinsicElements;
  className?: string;
};

// might want to change to HTMLDIVElement type at some point
const Text = forwardRef<HTMLElement, TextProps>(function BaseHelpersText(
  props: TextProps,
  ref
): JSX.Element {
  const { field, tag = 'div', className } = props || {};
  if (field) {
    return createElement(tag, { className, ref }, field);
  }
  return <></>;
});

export default Text;

