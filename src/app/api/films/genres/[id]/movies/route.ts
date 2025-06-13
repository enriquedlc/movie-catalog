import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { createTokenRepositoryCookies } from "@/shared/token/infrastructure/token-repository-cookies";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id;

  const tokenRepository = createTokenRepositoryCookies();
  const token = await tokenRepository.get();

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const response = await axios.get(
    `https://kata.conducerevel.com/films/genres/${id}/movies`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return NextResponse.json(response.data);
}
