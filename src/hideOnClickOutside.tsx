import { onCleanup } from "solid-js";

export default function hideOnClickOutside(el, accessor) {
  const onClick = (e: MouseEvent) => {
    !el.contains(e.target!) && accessor()?.();
  };
  document.body.addEventListener('click', onClick);
  onCleanup(() => document.body.removeEventListener('click', onClick));
}