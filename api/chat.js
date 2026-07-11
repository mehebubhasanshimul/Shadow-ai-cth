export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
  
    const { prompt } = req.body;
    const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY; 
  
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': RAPIDAPI_KEY,
            'x-rapidapi-host': 'cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            messages: [{ role: 'user', content: prompt }],
            model: 'gpt-4o',
            max_tokens: 500,
            temperature: 0.9
        })
    };
  
    try {
        const response = await fetch('https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions', options);
        const data = await response.json();
        
        // RapidAPI থেকে যাই আসুক (সফল বা এরর), আমরা ফ্রন্টএন্ডে পাঠিয়ে দেবো
        res.status(200).json(data);
    } catch (error) {
        // যদি fetch করতে গিয়েই কোড ক্র্যাশ করে
        res.status(200).json({ error: "Fetch Failed: " + error.message });
    }
}
