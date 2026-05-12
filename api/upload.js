import { put } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed'
    });
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

    if (!buffer || buffer.length === 0) {
      return res.status(400).json({
        error: 'No audio data received'
      });
    }

    const contentType = req.headers['content-type'] || 'audio/webm';

    let extension = 'webm';

    if (contentType.includes('mp4')) {
      extension = 'm4a';
    } else if (contentType.includes('aac')) {
      extension = 'aac';
    } else if (contentType.includes('wav')) {
      extension = 'wav';
    }

    let metadata = {};

    if (req.headers['x-metadata']) {
      try {
        metadata = JSON.parse(decodeURIComponent(req.headers['x-metadata']));
      } catch (error) {
        metadata = {};
      }
    }

    const emotion = metadata.emotion || 'unknown';
    const language = metadata.language || 'unknown';
    const timestamp = Date.now();

    const audioFilename =
      `voice-recordings/${emotion}/${language}/voice-${timestamp}.${extension}`;

    const metadataFilename =
      `voice-recordings/${emotion}/${language}/metadata-${timestamp}.json`;

    const audioBlob = await put(audioFilename, buffer, {
      access: 'public',
      contentType: contentType,
      addRandomSuffix: true
    });

    const metadataObject = {
      audio_url: audioBlob.url,
      audio_filename: audioFilename,
      file_size_bytes: buffer.length,
      content_type: contentType,
      submitted_at: new Date().toISOString(),
      ...metadata
    };

    const metadataBlob = await put(
      metadataFilename,
      JSON.stringify(metadataObject, null, 2),
      {
        access: 'public',
        contentType: 'application/json',
        addRandomSuffix: true
      }
    );

    return res.status(200).json({
      message: 'Voice uploaded successfully!',
      url: audioBlob.url,
      metadata_url: metadataBlob.url,
      size: buffer.length,
      type: contentType,
      metadata: metadataObject
    });

  } catch (error) {
    return res.status(500).json({
      error: 'Upload failed',
      details: error.message
    });
  }
}