import { NextRequest, NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const systemPrompt = `Ти - AI помічник системи управління продуктивністю персоналу. Твоя роль - допомагати користувачам з:

1. Аналізом їх цілей та прогресу
2. Порадами щодо покращення продуктивності
3. Підготовкою до оглядів продуктивності
4. Створенням звітів
5. Відповідями на питання про систему
6. Рекомендаціями щодо розвитку навичок

Ти працюєш в українській компанії Cieden, яка займається дизайном та розробкою. Команда складається з:
- Керівництво: Yuriy Mykhasyak (CEO), Iryna Serednia (Design Director)
- Дизайнери: Roman Kaminechny, Andrew Sapkowski, Denis Dudar та інші
- Product Managers: Anastasiya Mudryk, Olesia Havryshko, Tetiana Bondarchuk
- Sales: Kateryna Zavertailo, Bohdana Levochko, Taras Kunanets
- HR: Katya Gorodova, Iryna Mykhasyak

Відповідай українською мовою, бути корисним, професійним та дружелюбним.`;

export async function POST(request: NextRequest) {
  try {
    if (!OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key is not configured" },
        { status: 500 }
      );
    }

    const { message, history } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const messages = [
      { role: "system", content: systemPrompt },
      ...history.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: "user", content: message },
    ];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content;

    if (!aiResponse) {
      throw new Error("No response from OpenAI");
    }

    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    return NextResponse.json(
      { 
        error: "Internal server error",
        response: "Вибачте, сталася помилка при обробці вашого запиту. Спробуйте ще раз або зверніться до адміністратора."
      },
      { status: 500 }
    );
  }
}
