export default async function handler(req, res) {
    const hasKey = !!process.env.GEMINI_API_KEY;
    const keyPreview = process.env.GEMINI_API_KEY
        ? process.env.GEMINI_API_KEY.substring(0, 10) + '...'
        : 'NÃO CONFIGURADA';

    return res.status(200).json({
        message: 'API funcionando!',
        hasKey: hasKey,
        keyPreview: keyPreview,
        method: req.method
    });
}