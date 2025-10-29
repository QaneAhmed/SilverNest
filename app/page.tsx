'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';
import { ProfileForm } from '@/components/ProfileForm';
import { OutputCard } from '@/components/OutputCard';
import type { FormData, OutputData } from '@/lib/types';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [outputData, setOutputData] = useState<OutputData | null>(null);

  const handleGenerate = useCallback(async (data: FormData) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(payload.error || 'We could not craft your profile. Please try again.');
      }

      const payload = (await response.json()) as OutputData;
      setOutputData(payload);
    } catch (err) {
      setOutputData(null);
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <main className="print-area">
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-gradient-to-b from-rose-100/60 via-stone-50 to-transparent blur-3xl" />
        <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-16 px-4 pb-16 pt-20 md:px-8 md:pt-24">
          <header className="flex flex-col items-center gap-10 text-center">
            <div className="no-print inline-flex items-center gap-3 rounded-full border border-rose-200 bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.3em] text-rose-400">
              <Image src="/logo.svg" alt="SilverNest" width={32} height={32} />
              SilverNest
            </div>
            <div className="space-y-6">
              <h1 className="mx-auto max-w-3xl font-serif text-4xl leading-tight text-stone-800 md:text-5xl">
                Write a dating profile that sounds like you — confident, kind, and ready for what&apos;s next.
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-stone-600 md:text-xl">
                SilverNest guides mature daters to share their story with warmth and clarity. In a few minutes, create a profile that feels genuine and resonates on today&apos;s top platforms.
              </p>
            </div>
          </header>

          <section>
            <ProfileForm onGenerate={handleGenerate} isLoading={isLoading} />
            {error && (
              <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50/80 px-4 py-3 text-sm text-rose-600">
                {error}
              </div>
            )}
          </section>

          {outputData && (
            <section className="space-y-6" aria-live="polite">
              <div className="flex flex-col gap-2">
                <h2 className="font-serif text-2xl text-stone-800">Your SilverNest profile kit</h2>
                <p className="text-stone-600">
                  Copy these directly into {outputData?.prompt_answers ? 'your prompts and messages' : 'your dating apps'}.
                </p>
              </div>
              <div className="space-y-6">
                <OutputCard title="Profile Bio" content={outputData.bio} />
                <OutputCard
                  title="Prompt Answers"
                  content={outputData.prompt_answers}
                  accent="secondary"
                />
                <OutputCard title="Thoughtful First Messages" content={outputData.first_messages} />
                <OutputCard title="Style Notes" content={outputData.style_notes} accent="secondary" />
              </div>
            </section>
          )}

          <section className="no-print grid gap-8 rounded-3xl border border-stone-200 bg-white/80 p-8 md:grid-cols-3 md:p-12">
            <div className="space-y-4">
              <h3 className="font-serif text-2xl text-stone-800">Why mature daters trust SilverNest</h3>
              <p className="text-stone-600">
                Built for life experiences you can&apos;t sum up in a few swipes. Our AI listens for what
                matters and writes with respect.
              </p>
            </div>
            <div className="space-y-3 text-stone-600">
              <p className="rounded-2xl bg-stone-50/80 p-4">
                “SilverNest helped me speak about my life with confidence. Matches now mention the
                exact stories I hoped they would.”
              </p>
              <p className="text-sm text-stone-500">— Marisa, 56, recently engaged</p>
            </div>
            <ul className="space-y-3 text-stone-600">
              <li className="rounded-2xl bg-stone-50/80 p-4">
                Tailored tones for Hinge, Bumble, Match, and Tinder.
              </li>
              <li className="rounded-2xl bg-stone-50/80 p-4">Respectful phrasing without clichés.</li>
              <li className="rounded-2xl bg-stone-50/80 p-4">Guidance on what to send after you match.</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
