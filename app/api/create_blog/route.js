import { NextResponse } from 'next/server';
import { Anthropic } from '@anthropic-ai/sdk';

export const dynamic = 'force-dynamic'
export const runtime = 'edge';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
if (!ANTHROPIC_API_KEY) {
  throw new Error("Anthropic API key is not set in environment variables");
}

const anthropic = new Anthropic({
  apiKey: ANTHROPIC_API_KEY,
});

// Estimate tokens based on characters (rough approximation)
function estimateTokens(text) {
  return Math.ceil(text.length / 4);
}

// Truncate text to fit within token limit
function truncateText(text, maxTokens) {
  const estimatedTokens = estimateTokens(text);
  if (estimatedTokens <= maxTokens) return text;
  
  const truncationRatio = maxTokens / estimatedTokens;
  return text.slice(0, Math.floor(text.length * truncationRatio));
}

export async function POST(request) {
  try {
    const { text, commitMsg, postType, lang, tone,formality } = await request.json();
    
    // Set a max token limit for the input (adjust as needed)
    const MAX_INPUT_TOKENS = 4000;
    
    // Truncate the input text if it exceeds the token limit
    const truncatedText = truncateText(text, MAX_INPUT_TOKENS);

    const prompt = `Write a technical blog post based on the following information:
Input Text: ${truncatedText}
Related Commit Message: ${commitMsg}
Blog Post Style: ${postType}
Output Language: ${lang}
Tone: ${tone}
Formality:${formality}

Instructions:
1. Write the entire blog post in ${lang}.
2. Start with a title using the Markdown # tag.
3. Provide a brief summary using 3-5 bullet points.
4. Write the main content of the blog post, relating it to the input text and commit message.
5. Use proper Markdown formatting throughout.
6. Ensure adequate spacing between paragraphs for readability.
7. Adjust the formality of the entire content based on ${formality}. Especially if the ${lang} is "korean" and informal ,end the sentences uing something like "~했다","~였다","~한다","~않았다","~있다","~된다",~겠다,~할 것이다","~일 것이다" and avoid using "~에요", "~해요", "~요", "~했죠","~거다",~했습니다,~있었죠,~데요,~습니다,~입니다,~합니다 things like these.
8. Create 3 tags that summarize the whole content and put it before the title.
9. Adjust the tone of the whole content based on ${tone}.
10. Include some code blocks if necessary for the posts from the code you are provided, Do Not Change the code you are prodived. You don't need to include everything if not neccessary. 


Begin the blog post now.`;

    const response = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      //model: "claude-3-5-sonnet-20240620",
      max_tokens: 2000,
      temperature: 0.1,
      messages: [{ role: "user", content: prompt }]
    });

    return NextResponse.json({ response: response.content[0].text });
  } catch (error) {
    console.error("Error in create_blog:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}