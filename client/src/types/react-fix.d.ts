import 'react';

declare module 'react' {
  interface HTMLAttributes<T> {
    placeholder?: string;
    onPointerEnterCapture?: React.PointerEventHandler<T>;
    onPointerLeaveCapture?: React.PointerEventHandler<T>;
    onResize?: React.UIEventHandler<T>;
    onResizeCapture?: React.UIEventHandler<T>;
  }
}
