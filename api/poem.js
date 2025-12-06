
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const systemPrompt = "Você é um poeta romântico. Escreva APENAS o poema, com 8 a 12 versos românticos em português. Use vocabulário simples e sincero. NÃO inclua títulos, introduções, asteriscos ou qualquer texto além dos versos do poema.";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Use POST' });
    }

    const { keyword } = req.body;
    if (!keyword) {
        return res.status(400).json({ error: 'Keyword obrigatória' });
    }
    const userQuery = `Escreva apenas os versos de um poema de amor sobre: "${keyword}". Sem títulos, sem introduções, sem asteriscos, apenas os versos.`;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(userQuery);
        const text = result.response.text();
        return res.status(200).json({ poem: text });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
}
