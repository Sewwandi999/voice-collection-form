import { handleUpload } from "@vercel/blob/client";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {

    const body = req.body;

    const jsonResponse = await handleUpload({
      body,
      request: req,

      onBeforeGenerateToken: async (pathname, clientPayload) => {

        return {
          allowedContentTypes: [
            "audio/webm",
            "audio/webm;codecs=opus",
            "audio/mp4",
            "audio/aac"
          ],

          addRandomSuffix: true,

          tokenPayload: JSON.stringify({
            uploadedAt: new Date().toISOString(),
            metadata: clientPayload || ""
          })
        };
      },

      onUploadCompleted: async ({ blob, tokenPayload }) => {

        console.log("Upload completed");
        console.log(blob.url);
        console.log(tokenPayload);

      }
    });

    return res.status(200).json(jsonResponse);

  } catch (error) {

    console.error(error);

    return res.status(400).json({
      error: error.message
    });
  }
}