import { describe, expect, it } from "vitest";
import { normalizeSearch } from "../lib/search";
describe("menu search", () => {
  it("matches Turkish names without accents", () => {
    expect(normalizeSearch("Kıymalı Pide")).toContain(normalizeSearch("kiymali"));
    expect(normalizeSearch("İçecekler")).toBe("icecekler");
    expect(normalizeSearch("Tavuk Şiş")).toContain("sis");
  });
  it("preserves Cyrillic search", () => {
    expect(normalizeSearch("  КЕБАБ  ")).toBe("кебаб");
  });
});
