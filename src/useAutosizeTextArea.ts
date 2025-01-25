// Reference: https://medium.com/@oherterich/creating-a-textarea-with-dynamic-height-using-react-and-typescript-5ed2d78d9848
import { useEffect } from 'react';

/**
 * Hook that automatically adjusts the height of a textarea based on its content
 * @param textAreaRef - Reference to the textarea element
 * @param value - The current value of the textarea
 */
export default function useAutosizeTextArea(
  textAreaRef: HTMLTextAreaElement | null,
  value: string
): void {
  useEffect(() => {
    if (textAreaRef) {
      // We need to reset the height momentarily to get the correct scrollHeight for the textarea
      textAreaRef.style.height = "0px";
      const scrollHeight = textAreaRef.scrollHeight;

      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      textAreaRef.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, value]);
}
