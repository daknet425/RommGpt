import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { imageUrl, theme, room } = await request.json();

  const prompt =
    room === "Gaming Room"
      ? "ultra realistic modern gaming room interior design, RGB lighting, gaming setup, high quality architectural photography"
      : `ultra realistic ${theme.toLowerCase()} ${room.toLowerCase()} interior design, luxury furniture, natural lighting, architectural digest style, 8k resolution`;

  const encodedPrompt = encodeURIComponent(prompt);
  const seed = Math.floor(Math.random() * 1000000);
  const generatedImageUrl = `https://pollinations.ai{encodedPrompt}?width=1024&height=768&seed=${seed}&nologo=true&model=flux`;

  try {
    const imgRes = await fetch(generatedImageUrl);
    const arrayBuffer = await imgRes.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const dataUrl = `data:image/jpeg;base64,${base64}`;
    return NextResponse.json([imageUrl, dataUrl]);
  } catch (error) {
    return NextResponse.json([imageUrl, generatedImageUrl]);
  }
}
