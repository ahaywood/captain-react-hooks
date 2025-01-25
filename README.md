# ahha-hooks

A collection of reusable React hooks for common use cases.

## Installation

```bash
npm install ahha-hooks
# or
yarn add ahha-hooks
```

## Available Hooks

### useAutosizeTextArea

A hook that automatically adjusts the height of a textarea based on its content.

```tsx
import { useAutosizeTextArea } from 'ahha-hooks';

const MyComponent = () => {
  const [value, setValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  
  useAutosizeTextArea(textAreaRef.current, value);
  
  return (
    <textarea
      ref={textAreaRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
```

### useClickOutside

A hook that triggers a callback when clicking outside of a specified element. Useful for closing modals, dropdowns, etc.

```tsx
import { useOutsideClick } from 'ahha-hooks';

const MyComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  
  useOutsideClick(() => setIsOpen(false), ref);
  
  return (
    <div ref={ref}>
      {isOpen && <div>This will close when clicking outside</div>}
    </div>
  );
};
```

### useCopyToClipboard

A hook that provides a function to copy text to the clipboard with error handling.

```tsx
import { useCopyToClipboard } from 'ahha-hooks';

const MyComponent = () => {
  const { copy, error } = useCopyToClipboard();
  
  const handleCopy = async () => {
    const success = await copy('Text to copy');
    if (success) {
      alert('Copied!');
    } else {
      alert(`Failed to copy: ${error?.message}`);
    }
  };
  
  return <button onClick={handleCopy}>Copy to Clipboard</button>;
};
```

### useEscapeKey

A hook that triggers a callback when the escape key is pressed. Useful for closing modals or canceling actions.

```tsx
import { useEscapeKey } from 'ahha-hooks';

const MyComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  useEscapeKey(() => setIsOpen(false));
  
  return (
    <div>
      {isOpen && <div>Press ESC to close</div>}
      <button onClick={() => setIsOpen(true)}>Open</button>
    </div>
  );
};
```

### useInterval

A hook for setting up declarative intervals. Useful for creating polling mechanisms or periodic updates.

```tsx
import { useInterval } from 'ahha-hooks';

const MyComponent = () => {
  const [count, setCount] = useState(0);
  
  useInterval(() => {
    setCount(count + 1);
  }, 1000); // Updates every second
  
  return <div>Count: {count}</div>;
};
```

### useKeyPress

A hook that detects when a specific key is pressed. Perfect for keyboard shortcuts or accessibility features.

```tsx
import { useKeyPress } from 'ahha-hooks';

const MyComponent = () => {
  const isSpacePressed = useKeyPress(' ');
  
  return (
    <div>
      {isSpacePressed ? 'Space is pressed!' : 'Press space...'}
    </div>
  );
};
```

### useLocalStorage

A hook that syncs state with localStorage, providing persistent state across page reloads.

```tsx
import { useLocalStorage } from 'ahha-hooks';

const MyComponent = () => {
  const [name, setName] = useLocalStorage('user-name', '');
  
  return (
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Your name will be remembered"
    />
  );
};
```

### useLockBodyScroll

A hook that prevents body scrolling. Useful for modals, drawers, or full-screen menus.

```tsx
import { useLockBodyScroll } from 'ahha-hooks';

const Modal = ({ isOpen }) => {
  useLockBodyScroll(isOpen);
  
  return isOpen ? (
    <div className="modal">
      Modal content (body scroll is locked)
    </div>
  ) : null;
};
```

### useOnScreen

A hook that detects when an element enters the viewport. Perfect for implementing infinite scroll or lazy loading.

```tsx
import { useOnScreen } from 'ahha-hooks';

const MyComponent = () => {
  const elementRef = useRef(null);
  const isVisible = useOnScreen(elementRef, '-100px'); // 100px threshold
  
  return (
    <div ref={elementRef}>
      {isVisible ? 'Element is visible!' : 'Scroll to see me!'}
    </div>
  );
};
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
