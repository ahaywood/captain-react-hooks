import { renderHook } from '@testing-library/react';
import { useOutsideClick } from '../useClickOutside';
import { fireEvent } from '@testing-library/dom';

describe('useOutsideClick', () => {
  it('should call handleClose when clicking outside', () => {
    const handleClose = jest.fn();
    const elementRef = { current: document.createElement('div') };
    document.body.appendChild(elementRef.current);

    renderHook(() => useOutsideClick(handleClose, elementRef));

    // Click outside the element
    fireEvent.mouseUp(document.body);
    expect(handleClose).toHaveBeenCalled();

    // Cleanup
    document.body.removeChild(elementRef.current);
  });

  it('should not call handleClose when clicking inside', () => {
    const handleClose = jest.fn();
    const elementRef = { current: document.createElement('div') };
    document.body.appendChild(elementRef.current);

    renderHook(() => useOutsideClick(handleClose, elementRef));

    // Click inside the element
    fireEvent.mouseUp(elementRef.current);
    expect(handleClose).not.toHaveBeenCalled();

    // Cleanup
    document.body.removeChild(elementRef.current);
  });

  it('should handle null ref', () => {
    const handleClose = jest.fn();
    const elementRef = { current: null };

    renderHook(() => useOutsideClick(handleClose, elementRef));

    // Click anywhere
    fireEvent.mouseUp(document.body);
    expect(handleClose).not.toHaveBeenCalled();
  });
});
