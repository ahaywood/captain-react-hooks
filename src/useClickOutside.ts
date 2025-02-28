/**
 * Example Usage:
 *
 * import React, { useRef } from 'react';
 * import { useOutsideClick } from 'app/hooks/useClickOutside';
 *
 * const myComponent = () => {
 *   const ref = useRef(null);
 *   const handleClose = () => { console.log('close'); };
 *   useOutsideClick(handleClose, ref);
 *
 *   return (
 *     <div ref={ref}>
 *       <p>Click outside of me to close</p>
 *     </div>
 *   );
 * }
 */

import { RefObject, useCallback, useEffect } from "react";

const MOUSE_UP = "mouseup";

/**
 * Hook that handles click outside of a specified element
 * @param handleClose - Callback function to execute when clicking outside
 * @param ref - Reference to the element to detect clicks outside of
 */
export function useOutsideClick(
  handleClose: () => void,
  ref: RefObject<HTMLElement | null>
): void {
  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (
        ref?.current?.contains &&
        !ref.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    },
    [handleClose, ref],
  );

  useEffect(() => {
    document.addEventListener(MOUSE_UP, handleClick);

    return () => {
      document.removeEventListener(MOUSE_UP, handleClick);
    };
  }, [handleClick]);
}
