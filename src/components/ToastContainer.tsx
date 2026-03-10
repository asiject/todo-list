'use client';

import { useAtom } from 'jotai';
import { toastsAtom, type Toast } from '@/store/ui';
import { useEffect } from 'react';

interface ToastProps {
  toast: Toast;
  onClose: (id: string) => void;
}

function ToastItem({ toast, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(toast.id), 3000);
    return () => clearTimeout(timer);
  }, [toast.id, onClose]);

  const base =
    'px-4 py-2 rounded shadow text-sm text-white flex items-center justify-between gap-3';

  const color =
    toast.type === 'error'
      ? 'bg-red-600'
      : toast.type === 'info'
      ? 'bg-blue-600'
      : 'bg-green-600';

  return (
    <div className={`${base} ${color}`}>
      <span>{toast.message}</span>
      <button
        type="button"
        onClick={() => onClose(toast.id)}
        className="text-xs opacity-80 hover:opacity-100"
      >
        닫기
      </button>
    </div>
  );
}

export default function ToastContainer() {
  const [toasts, setToasts] = useAtom(toastsAtom);

  const handleClose = (id: string) => {
    setToasts(toasts.filter((toast) => toast.id !== id));
  };

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={handleClose} />
      ))}
    </div>
  );
}

