import { renderHook } from '@testing-library/react';
import useAutosizeTextArea from '../useAutosizeTextArea';

describe('useAutosizeTextArea', () => {
  it('should adjust textarea height based on content', () => {
    const mockTextArea = document.createElement('textarea');
    mockTextArea.style.height = '100px';

    const { rerender } = renderHook(
      ({ ref, value }) => useAutosizeTextArea(ref, value),
      {
        initialProps: { ref: mockTextArea, value: 'Initial text' },
      }
    );

    expect(mockTextArea.style.height).not.toBe('100px');

    // Test with new value
    rerender({ ref: mockTextArea, value: 'New text with\nmultiple\nlines' });
    expect(mockTextArea.style.height).toBe(mockTextArea.scrollHeight + 'px');
  });

  it('should handle null textarea ref', () => {
    const { result } = renderHook(() => useAutosizeTextArea(null, 'text'));
    expect(result.current).toBeUndefined();
  });
});
