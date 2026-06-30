import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const swotData = await request.json();

    const groqKey = process.env.GROQ_API_KEY;

    if (!groqKey) {
      return NextResponse.json(
        { error: "API key not configured. Please ensure GROQ_API_KEY is in your .env.local file." },
        { status: 500 }
      );
    }

    const strengths = swotData.points?.strengths?.map(s => s.text).filter(Boolean) || [];
    const weaknesses = swotData.points?.weaknesses?.map(w => w.text).filter(Boolean) || [];
    const opportunities = swotData.points?.opportunities?.map(o => o.text).filter(Boolean) || [];
    const threats = swotData.points?.threats?.map(t => t.text).filter(Boolean) || [];

    // Guard: don't even call the model if there isn't enough data to synthesize anything meaningful
    if (strengths.length === 0 || weaknesses.length === 0 || opportunities.length === 0 || threats.length === 0) {
      return NextResponse.json(
        { error: "Each SWOT quadrant needs at least one point before generating a synthesis." },
        { status: 400 }
      );
    }

    const companyName = swotData.companyName?.trim() || "The organization";

    const systemPrompt = `You are a strategy consultant writing the "Synthesis & Recommendation" section of a formal strategic audit document. You output ONLY the final HTML for the two paragraphs requested. You never include reasoning, self-checks, notes, explanations, markdown code fences, or any text outside the two required <p> tags. Any output other than exactly two <p>...</p> blocks is a failure and unacceptable.`;

    const userPrompt = `Company: ${companyName}

Strengths: ${strengths.join('; ')}
Weaknesses: ${weaknesses.join('; ')}
Opportunities: ${opportunities.join('; ')}
Threats: ${threats.join('; ')}

Write exactly 2 paragraphs of strategic synthesis, following this exact pattern:

Paragraph 1: Identify the single strongest Strength from the list above, quote it exactly as given in double quotes, and connect it directly to the most relevant Opportunity from the list (also quoted exactly in double quotes). Explain in natural prose the strategic move this combination enables for ${companyName}.

Paragraph 2: Identify the most critical Weakness from the list, quote it exactly in double quotes, and connect it to the Threat it most amplifies (also quoted exactly in double quotes). End the paragraph with one specific, actionable recommendation sentence.

Formatting rules (follow exactly):
- Exactly 2 paragraphs, no more, no less.
- Wrap each paragraph in this exact opening tag: <p class="font-body-md text-on-surface-variant mb-4 leading-relaxed"> and close with </p>
- Within paragraph 2 only, wrap the final recommendation sentence in: <strong class="text-swot-threat font-semibold"> ... </strong>
- Quote SWOT points exactly as provided above, in double quotes, whenever you reference them.
- Do not use markdown formatting of any kind (no \`\`\`html, no asterisks, no headers).
- Do not output anything other than the two <p>...</p> blocks. No preamble, no explanation, no notes, no "Here is the output" text.`;

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${groqKey}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", // non-reasoning model — does not leak chain-of-thought
        temperature: 0.4,
        max_tokens: 600,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ]
      })
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.error("Groq API HTTP error:", groqRes.status, errText);
      return NextResponse.json(
        { error: `Groq API error (${groqRes.status}). Check server logs.` },
        { status: 502 }
      );
    }

    const data = await groqRes.json();

    if (data.error) {
      console.error("Groq API returned error object:", data.error);
      throw new Error(data.error.message || "Unknown Groq API error");
    }

    let raw = data.choices?.[0]?.message?.content || "";

    // Defensive cleanup, in case the model still wraps in markdown or leaks a <think> block
    raw = raw.replace(/<think>[\s\S]*?<\/think>/gi, '');
    raw = raw.replace(/```html/gi, '').replace(/```/g, '');
    raw = raw.trim();

    // Robust extraction: grab ALL <p>...</p> blocks rather than a single greedy first-to-last match.
    // This avoids picking up a stray <p> from leaked reasoning text.
    const pBlocks = raw.match(/<p[^>]*>[\s\S]*?<\/p>/gi);

    if (!pBlocks || pBlocks.length < 2) {
      console.error("AI output malformed. Raw output was:\n", raw);
      return NextResponse.json(
        { error: "AI returned an unexpected format. Please try regenerating." },
        { status: 502 }
      );
    }

    const generatedHtml = pBlocks.slice(0, 2).join('\n');

    return NextResponse.json({ synthesis: generatedHtml });

  } catch (error) {
    console.error("AI Generation Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to generate synthesis." },
      { status: 500 }
    );
  }
}
