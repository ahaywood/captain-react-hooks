/**
 * Example Usage:
 *
 * import { useEscapeKey } from 'app/hooks/useEscapeKey';
 *
 * const myComponent = () => {
 *   const handleClose = () => { console.log('close'); };
 *   useEscapeKey(handleClose);
 *
 *   return <button onClick={handleClose}>Press ESC to close</button>
 * }
 */

import { useCallback, useEffect } from 'react';

const KEY_NAME_ESC = 'Escape';
const KEY_EVENT_TYPE = 'keyup';

/**
 * Hook that handles escape key press events
 * @param handleClose - Callback function to execute when escape key is pressed
 */
export function useEscapeKey(handleClose: () => void): void {
  const handleEscKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === KEY_NAME_ESC) {
        handleClose();
      }
    },
    [handleClose]
  );

  useEffect(() => {
    document.addEventListener(KEY_EVENT_TYPE, handleEscKey, false);

    return () => {
      document.removeEventListener(KEY_EVENT_TYPE, handleEscKey, false);
    };
  }, [handleEscKey]);
}
