import { RefObject } from "react";

import { useEventListener } from "usehooks-ts";

type Handler = (event: MouseEvent) => void;

function useClickOutside(
  ref: RefObject<HTMLElement>,
  handler: Handler,
  mouseEvent: "mousedown" | "mouseup" = "mousedown"
): void {
  useEventListener(mouseEvent, (event) => {
    const el = ref?.current;

    // Do nothing if clicking ref's element or descendent elements
    if (!el || el.contains(event.target as Node)) {
      return;
    }

    handler(event);
  });
}

export default useClickOutside;
