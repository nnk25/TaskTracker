import React from "react";

type ModalProps = Readonly<{
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}>;

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black opacity-40"
        onClick={onClose}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === "Escape") onClose();
        }}
      />
      <div className="relative bg-white rounded shadow-lg w-full max-w-md p-6 z-10">
        {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
        {children}
      </div>
    </div>
  );
}
