/**
 * Example Usage:
 *
 * import { useCopyToClipboard } from 'app/hooks/useCopyToClipboard';
 *
 * const myComponent = () => {
 *   const { copy, error } = useCopyToClipboard();
 *   const handleCopy = async () => {
 *     const success = await copy('Hello World!');
 *     if (!success && error) {
 *       console.error(error);
 *     }
 *   };
 *
 *   return <button onClick={handleCopy}>Copy</button>
 * }
 */

import { useState } from 'react';

interface CopyToClipboardResult {
  copy: (content: string) => Promise<boolean>;
  error: Error | null;
}

/**
 * Hook that provides functionality to copy text to clipboard
 * @returns Object containing copy function and error state
 */
export function useCopyToClipboard(): CopyToClipboardResult {
  const [error, setError] = useState<Error | null>(null);

  const copy = async (content: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(content);
      setError(null);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to copy content to clipboard'));
      return false;
    }
  };

  return { copy, error };
}
