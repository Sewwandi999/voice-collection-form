import { handleUpload } from '@vercel/blob/client';

export default async function handler(request, response) {
  const body = await request.json();

  try {
    const jsonResponse = await handleUpload({
      body,
      request,

      onBeforeGenerateToken: async (pathname, clientPayload) => {
        return {
          allowedContentTypes: [
            'audio/webm',
            'audio/webm;codecs=opus',
            'audio/mp4',
            'audio/aac'
          ],
          addRandomSuffix: true,
          tokenPayload: clientPayload || ''
        };
      },

      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log('Upload completed:', blob.url);
        console.log('Metadata:', tokenPayload);
      }
    });

    return response.status(200).json(jsonResponse);

  } catch (error) {
    return response.status(400).json({
      error: error.message
    });
  }
}