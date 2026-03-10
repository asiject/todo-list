import { useAtom } from 'jotai';
import { toastsAtom, type ToastType } from '@/store/ui';

let toastIdCounter = 0;

export function useToast() {
  const [toasts, setToasts] = useAtom(toastsAtom);

  const showToast = (message: string, type: ToastType = 'success') => {
    const id = `${Date.now()}-${toastIdCounter++}`;
    setToasts([...toasts, { id, type, message }]);
  };

  const hideToast = (id: string) => {
    setToasts(toasts.filter((toast) => toast.id !== id));
  };

  return { toasts, showToast, hideToast };
}

