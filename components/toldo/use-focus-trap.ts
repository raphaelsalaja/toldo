import { useEffect } from "react";

export const useFocusTrap = (modalRef: React.RefObject<HTMLElement | null>, isOpen: boolean) => {
  useEffect(() => {
    const handleFocusTrap = (event: KeyboardEvent) => {
      if (!modalRef.current) return;
      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])');
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.key === "Tab") {
        if (event.shiftKey && document.activeElement === firstElement) {
          lastElement.focus();
          event.preventDefault();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          firstElement.focus();
          event.preventDefault();
        }
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleFocusTrap);
    } else {
      window.removeEventListener("keydown", handleFocusTrap);
    }

    return () => window.removeEventListener("keydown", handleFocusTrap);
  }, [isOpen, modalRef]);
};
