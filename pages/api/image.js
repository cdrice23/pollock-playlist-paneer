import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (!req.body.prompt) {
    return res
      .status(400)
      .json({ message: "Prompt required for image generation." });
  }
  const openai = new OpenAIApi(configuration);
  const response = await openai.createImage({
    prompt: req.body.prompt,
    n: 1,
    size: "512x512",
  });

  if (!response.data) throw new Error("Unable to generate image");
  res.status(200).json({
    imageUrl: response.data.data[0].url,
    expirationDate: new Date(Date.now() + 2 * 60 * 60 * 1000),
  });
}
