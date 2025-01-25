import { renderHook } from '@testing-library/react';
import { useEscapeKey } from '../useEscapeKey';
import { fireEvent } from '@testing-library/dom';

describe('useEscapeKey', () => {
  it('should call handleClose when escape key is pressed', () => {
    const handleClose = jest.fn();
    renderHook(() => useEscapeKey(handleClose));

    fireEvent.keyUp(document, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalled();
  });

  it('should not call handleClose when other keys are pressed', () => {
    const handleClose = jest.fn();
    renderHook(() => useEscapeKey(handleClose));

    fireEvent.keyUp(document, { key: 'Enter' });
    fireEvent.keyUp(document, { key: 'a' });
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('should remove event listener on unmount', () => {
    const handleClose = jest.fn();
    const { unmount } = renderHook(() => useEscapeKey(handleClose));

    unmount();
    fireEvent.keyUp(document, { key: 'Escape' });
    expect(handleClose).not.toHaveBeenCalled();
  });
});
