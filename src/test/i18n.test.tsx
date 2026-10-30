import { cleanup, render, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { LangProvider } from "@/lib/i18n";

afterEach(() => {
  cleanup();
  localStorage.clear();
  document.documentElement.lang = "tr";
});

describe("saved language", () => {
  it("restores Russian (ru) after loading the website", async () => {
    localStorage.setItem("lang", "ru");
    render(<LangProvider><div /></LangProvider>);
    await waitFor(() => expect(document.documentElement.lang).toBe("ru"));
  });
});