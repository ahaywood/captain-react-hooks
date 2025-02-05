import { renderHook, act } from '@testing-library/react';
import { useCopyToClipboard } from '../useCopyToClipboard';

describe('useCopyToClipboard', () => {
  const mockClipboard = {
    writeText: jest.fn()
  };
  const originalNavigator = { ...window.navigator };

  beforeEach(() => {
    Object.defineProperty(window, 'navigator', {
      value: { clipboard: mockClipboard },
      writable: true,
      configurable: true
    });
    mockClipboard.writeText.mockReset();
  });

  afterEach(() => {
    Object.defineProperty(window, 'navigator', {
      value: originalNavigator,
      writable: true,
      configurable: true
    });
  });

  it('should copy text to clipboard successfully', async () => {
    mockClipboard.writeText.mockResolvedValueOnce(undefined);
    const { result } = renderHook(() => useCopyToClipboard());

    const textToCopy = 'Hello, World!';
    let success;

    await act(async () => {
      success = await result.current.copy(textToCopy);
    });

    expect(success).toBe(true);
    expect(mockClipboard.writeText).toHaveBeenCalledWith(textToCopy);
    expect(result.current.error).toBeNull();
  });

  it('should handle clipboard errors', async () => {
    const error = new Error('Clipboard error');
    mockClipboard.writeText.mockRejectedValueOnce(error);
    const { result } = renderHook(() => useCopyToClipboard());

    let success;
    await act(async () => {
      success = await result.current.copy('test');
    });

    expect(success).toBe(false);
    expect(result.current.error).toBeTruthy();
    expect(result.current.error?.message).toBe('Failed to copy content to clipboard');
  });
});
