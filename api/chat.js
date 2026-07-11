export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
  
    const { prompt } = req.body;
    const GROQ_API_KEY = process.env.GROQ_API_KEY; 
  
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${GROQ_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            messages: [{ role: 'user', content: prompt }],
            model: 'llama3-8b-8192', // Groq-এর জনপ্রিয় মডেল
            temperature: 0.7,
            max_tokens: 500
        })
    };
  
    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', options);
        const data = await response.json();
        
        // রেসপন্স চেক
        if (data.choices) {
            res.status(200).json(data);
        } else {
            res.status(400).json(data);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
