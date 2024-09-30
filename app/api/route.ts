import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const baseURL =
    "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell";
  //   "https://api-inference.huggingface.co/models/aleksa-codes/flux-ghibsky-illustration";
  try {
    const response = await fetch(baseURL, {
      headers: {
        Authorization: `Bearer ${process.env.HUGGING_FACE_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
    // console.log(response)
    const result = await response.blob();
    // console.log("ImageResult", result);
    return new NextResponse(result, {
      status: 200,
      headers: { "Content-Type": "image/png" },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch image" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
