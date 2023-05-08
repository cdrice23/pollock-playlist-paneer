export const config = {
  runtime: "edge",
};

export default async function handler(req, res) {
  if (!req.body.prompt) {
    return res
      .status(400)
      .json({ message: "Prompt required for image generation." });
  }

  const response = await fetch("/api/image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: req.body.prompt,
    }),
  });

  const data = await response.json();

  if (!data.imageUrl) throw new Error("Unable to generate image");
  res.status(200).json({
    imageUrl: data.imageUrl,
    expirationDate: data.expirationDate,
  });
}
