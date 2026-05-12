import { put } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const chunks = [];

    for await (const chunk of req) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);

    const filename = `voice-${Date.now()}.webm`;

    const blob = await put(filename, buffer, {
      access: 'public',
      contentType: req.headers['content-type'] || 'audio/webm',
    });

    return res.status(200).json({
      message: 'Voice uploaded successfully!',
      url: blob.url,
    });

  } catch (error) {
    return res.status(500).json({
      error: 'Upload failed',
      details: error.message,
    });
  }
}