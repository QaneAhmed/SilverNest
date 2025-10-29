import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { buildMessages } from '@/lib/prompt';
import type { FormData, OutputData } from '@/lib/types';

function validateBody(body: Partial<FormData>) {
  if (!body) return 'Missing request body.';
  if (!body.ageBracket) return 'Please select an age bracket.';
  if (!body.platform) return 'Please choose a platform.';
  if (!body.goals || body.goals.trim().length < 30)
    return 'Share a little more about your goals so we can personalize it.';
  if (!body.interests || body.interests.trim().length < 30)
    return 'Share some interests or stories so we can bring your personality in.';
  if (!body.stylePreference) return 'Choose a style preference.';
  if (!body.lengthPreference) return 'Choose a length preference.';
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
    const body = (await req.json()) as Partial<FormData>;
    const validationError = validateBody(body);

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const messages = buildMessages(body as FormData);

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
