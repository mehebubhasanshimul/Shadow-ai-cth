// api/chat.js
export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    const { prompt } = req.body;

    const response = await fetch("https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "x-rapidapi-key": process.env.RAPIDAPI_KEY, // এখান থেকেই কি-টি আসবে
            "x-rapidapi-host": "cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            messages: [{ role: "user", content: prompt }],
            model: "gpt-4o",
            max_tokens: 300
        })
    });

    const data = await response.json();
    res.status(200).json(data);
}
