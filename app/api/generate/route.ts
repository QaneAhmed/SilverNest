import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { buildMessages } from '@/lib/prompt';
import type { AnalyzeFormData, OutputData } from '@/lib/types';

function validateBody(body: Partial<AnalyzeFormData>) {
  if (!body) return 'Missing request body.';
  if (!body.profileText || body.profileText.trim().length < 40)
    return 'Share a bit more of your current profile so we can offer thoughtful feedback.';
  if (!body.name) return 'Please share a name or nickname.';
  if (!body.city) return 'Please share where you are based.';
  if (!body.age) return 'Please enter your age.';
  if (!body.gender) return 'Please choose how you would like us to reference you.';
  if (!body.platform) return 'Please choose a platform.';
  if (!body.stylePreference) return 'Choose a style preference.';
  return null;
}

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'OpenAI API key is not configured.' },
      { status: 500 }
    );
  }

  try {
    const body = (await req.json()) as Partial<AnalyzeFormData>;
    const validationError = validateBody(body);

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const messages = buildMessages({
      profileText: body.profileText?.trim() ?? '',
      notes: body.notes?.trim() ?? '',
      name: body.name ?? '',
      city: body.city ?? '',
      age: body.age ?? '',
      gender: body.gender ?? '',
      platform: body.platform ?? '',
      priorities: Array.isArray(body.priorities) ? body.priorities : [],
      stylePreference: body.stylePreference ?? '',
      photoDataUrl: body.photoDataUrl,
      gallery: body.gallery ?? [],
    });

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      response_format: { type: 'json_object' },
      temperature: 0.8,
      max_tokens: 800,
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No content returned from OpenAI.');
    }

    const data = JSON.parse(content) as OutputData;

    return NextResponse.json(data);
  } catch (error) {
    console.error('[generate]', error);
    const message =
      error instanceof Error ? error.message : 'We could not complete the request.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
