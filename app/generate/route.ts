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

  await new Promise((resolve) => setTimeout(resolve, 3000));

  return NextResponse.json([imageUrl, generatedImageUrl]);
}
