'use client';

import { useState } from 'react';
import { Toast } from './Toast';

interface OutputCardProps {
  title: string;
  content: string | string[];
  accent?: 'primary' | 'secondary';
}

export function OutputCard({ title, content, accent = 'primary' }: OutputCardProps) {
  const [showToast, setShowToast] = useState(false);

  const handleCopy = async () => {
    const textContent = Array.isArray(content) ? content.join('\n\n') : content;
    try {
      await navigator.clipboard.writeText(textContent);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 1600);
    } catch (error) {
      console.error('Copy failed', error);
    }
  };

  const accentClasses =
    accent === 'primary'
      ? 'border-rose-200 bg-white/90'
      : 'border-amber-200 bg-white/70';

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border ${accentClasses} p-6 shadow-soft`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-serif text-xl text-stone-800">{title}</h3>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="btn-secondary no-print text-sm"
        >
          Copy
        </button>
      </div>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-stone-700">
        {Array.isArray(content) ? (
          content.map((item, index) => (
            <div key={index} className="rounded-xl bg-stone-50/70 px-4 py-3">
              {item}
            </div>
          ))
        ) : (
          <p className="whitespace-pre-line">{content}</p>
        )}
      </div>
      <Toast show={showToast} message="Copied!" />
    </div>
  );
}
