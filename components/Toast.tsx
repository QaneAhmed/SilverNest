'use client';

interface ToastProps {
  show: boolean;
  message: string;
}

export function Toast({ show, message }: ToastProps) {
  if (!show) return null;

  return (
    <div className="no-print animate-fade-in fixed bottom-6 right-6 z-50 rounded-full bg-stone-800 px-5 py-2 text-sm text-white shadow-soft">
      {message}
    </div>
  );
}
