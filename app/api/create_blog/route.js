import { NextResponse } from 'next/server';
import { Anthropic } from '@anthropic-ai/sdk';


const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

if (!ANTHROPIC_API_KEY) {
  throw new Error("Anthropic API key is not set in environment variables");
}

const anthropic = new Anthropic({
  apiKey: ANTHROPIC_API_KEY,
});

export async function POST(request) {
  try {
    const { text, commitMsg, postType, lang, formality, tone } = await request.json();

    const prompt = `Write a technical blog post based on the following information:

Input Text: ${text}
Related Commit Message: ${commitMsg}
Blog Post Style: ${postType}
Output Language: ${lang}
Formality: ${formality} (For languages like Korean, specify the ending style: ~합니다, 입니다 for formal, and ~하다, ~이다, ~했다 for informal, DON'T use ~이야,~했어)
Tone: ${tone}

Instructions:
1. Write the entire blog post in ${lang}.
2. Start with a title using the Markdown # tag.
3. Provide a brief summary using 3-5 bullet points.
4. Write the main content of the blog post, relating it to the input text and commit message.
5. Use proper Markdown formatting throughout.
6. Ensure adequate spacing between paragraphs for readability.
7. Create 3 tags that summarize the whole content and put it before the title.
8. Adjust the wordings depending on Formality.
9. Adjust the tone of the whole content based on ${tone}.
10. Include some code blocks if necessary for the posts.

Begin the blog post now.`;

    const response = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 1000,
      temperature: 0.1,
      messages: [{ role: "user", content: prompt }]
    });

    return NextResponse.json({ response: response.content[0].text });
  } catch (error) {
    console.error("Error in create_blog:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}