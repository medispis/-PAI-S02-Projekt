import { useEffect, useId, useRef } from 'react';

export default function Dialog({ title, onClose, children }) {
  const dialogRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    const opener = document.activeElement;
    dialog.showModal();
    dialog.querySelector('[data-dialog-autofocus]')?.focus();
    return () => {
      dialog.close();
      // Restore focus after React removes the dialog and any deleted card.
      queueMicrotask(() => {
        if (document.querySelector('dialog[open]')) return;
        if (opener instanceof HTMLElement && opener.isConnected) opener.focus();
        else document.getElementById('add-vehicle')?.focus();
      });
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <h2 id={titleId}>{title}</h2>
      {children}
    </dialog>
  );
}
