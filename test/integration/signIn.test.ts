import { describe, expect, it, vi, Mock } from "vitest";
import axios from "axios";

import { getCookies } from "../../src/lib/cookies";
import { signInAction } from "../../src/modules/auth/actions/signInAction";

// Mock de axios
vi.mock("axios");
const mockedAxios = axios as unknown as {
  post: (
    url: string,
    body: Record<string, string>
  ) => Promise<{ data: { token: string } }>;
};

// Mock del wrapper getCookies
vi.mock("../../src/lib/cookies", () => ({
  getCookies: vi.fn(),
}));

describe("signInAction", () => {
  it("sets cookie on successful login", async () => {
    const fakeToken = "FAKE_JWT_TOKEN";

    mockedAxios.post = vi.fn().mockResolvedValue({
      data: { token: fakeToken },
    });

    const setCookie = vi.fn();

    (getCookies as Mock).mockReturnValue({
      set: setCookie,
    });

    await signInAction("test@email.com", "1234");

    expect(mockedAxios.post).toHaveBeenCalledWith(
      "https://kata.conducerevel.com/films/auth/sign-in",
      {
        email: "test@email.com",
        password: "1234",
      }
    );

    expect(setCookie).toHaveBeenCalledWith(
      "jwt",
      fakeToken,
      expect.objectContaining({
        httpOnly: true,
        path: "/",
        secure: true,
      })
    );
  });
});
