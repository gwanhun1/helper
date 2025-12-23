export const config = {
  runtime: "edge",
};

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const { who, how, worry } = await req.json();

    const difyApiKey = process.env.VITE_DIFY_API_KEY || process.env.DIFY_API_KEY;
    const difyBaseUrl = process.env.VITE_DIFY_BASE_URL || "https://api.dify.ai/v1";

    const response = await fetch(`${difyBaseUrl}/chat-messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${difyApiKey}`,
      },
      body: JSON.stringify({
        inputs: {
          who,
          how,
          worry,
        },
        query: "상담을 진행해줘.", // System prompt has everything, query is just a trigger
        response_mode: "blocking",
        user: "helper-user",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Dify API Error:", errorData);
      return new Response(
        JSON.stringify({ 
          error: "Dify API request failed", 
          details: errorData 
        }),
        { 
          status: response.status,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    const data = await response.json();
    
    return new Response(
      JSON.stringify({
        message: data.answer,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type",
        },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Handler Error:", error);
    return new Response(
      JSON.stringify({ 
        error: "Internal server error", 
        message: error instanceof Error ? error.message : "Unknown error" 
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        status: 500,
      }
    );
  }
}
