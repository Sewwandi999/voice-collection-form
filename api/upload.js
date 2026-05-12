import { put } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return res.status(500).json({
        error: 'BLOB_READ_WRITE_TOKEN is missing'
      });
    }

    const chunks = [];

    for await (const chunk of req) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);

    if (buffer.length === 0) {
      return res.status(400).json({
        error: 'No audio data received'
      });
    }

    const contentType = req.headers['content-type'] || 'audio/webm';
    const extension = contentType.includes('mp4') ? 'm4a' : 'webm';

    const filename = `voice-recordings/voice-${Date.now()}.${extension}`;

    const blob = await put(filename, buffer, {
      access: 'public',
      contentType: contentType,
      addRandomSuffix: true
    });

    return res.status(200).json({
      message: 'Voice uploaded successfully!',
      url: blob.url,
      size: buffer.length,
      type: contentType
    });

  } catch (error) {
    return res.status(500).json({
      error: 'Upload failed',
      details: error.message
    });
  }
}