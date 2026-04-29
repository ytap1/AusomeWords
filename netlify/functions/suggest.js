exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405 };

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return { statusCode: 503, body: JSON.stringify({ error: "not configured" }) };

  let words, level;
  try { ({ words, level } = JSON.parse(event.body)); }
  catch { return { statusCode: 400 }; }

  if (!Array.isArray(words) || !words.length) return { statusCode: 400 };

  const lvl = level === 3 ? 3 : 2;
  const tapped = `An autistic child using an AAC app tapped these words: "${words.join(" ")}".`;
  const prompt = lvl === 3
    ? `${tapped} Rewrite as a slightly more descriptive but still simple, polite English sentence — add one natural detail (a colour, quantity, or short adjective) only if it fits the child's words. Keep it short. Reply with only the sentence, nothing else.`
    : `${tapped} Rewrite as the most natural, simple, polite English sentence. Reply with only the sentence, nothing else.`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    }
  );

  if (!res.ok) return { statusCode: res.status };

  const data = await res.json();
  const suggestion = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? null;

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ suggestion })
  };
};
