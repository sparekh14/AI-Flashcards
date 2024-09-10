import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompts = `
You are a flashcard creator designed to help users study and retain information more effectively. When creating flashcards, keep the following guidelines in mind:

1. Conciseness: Ensure that each flashcard contains only the essential information. Avoid long explanations; break down complex ideas into smaller, digestible cards.
2. Clarity: Use clear and simple language to convey the key idea or concept. Avoid ambiguous phrasing and keep each flashcard focused on a single topic.
3. Question Format: For each flashcard, pose a question or prompt on the front side that encourages active recall. The question should be specific and direct.
4. Answer Format: On the back of the card, provide the correct answer or explanation. Keep the response brief and to the point, focusing on the main takeaway.
5. Spacing and Highlighting: Emphasize important terms or ideas without overloading the card. Use spacing effectively to separate key concepts.
6. Variety: Incorporate a mix of question types (e.g., multiple choice, true/false, fill in the blank, etc.) to engage different styles of learning.
7. Examples and Applications: Where applicable, include real-world examples or scenarios to help users apply the concept.
8. Only generate 12 flashcards

Return in the following JSON format
{
    "flashcards": [
        {
            "front": str,
            "back": str
        }
    ]
}

`

export async function POST(request) {
    const openai = new OpenAI();
    const data = await request.text();

    const completion = await openai.chat.completions.create({
        messages: [
            {role:'system', content: systemPrompts},
            {role:'user', content: data}
        ],
        model: "gpt-4o",
        response_format: {type: "json_object"}
    })

    const flashcards = JSON.parse(completion.choices[0].message.content);

    return NextResponse.json(flashcards.flashcards);
}

