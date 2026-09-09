import { describe, it, expect } from "vitest";
import { formatCost } from "@/utils/format-cost";

describe("Format Cost", () => {
  it("format string angka yang valid sebagai mata uang", () => {
    const res = formatCost("500000");
    expect(res).not.toBe("-");
    expect(res).toContain("$");
  });

  it("returns — for null", () => {
    expect(formatCost(null)).toBe("—");
  });

  it("returns — for undefined", () => {
    expect(formatCost(undefined)).toBe("—");
  });

  it("returns — for empty string", () => {
    expect(formatCost("")).toBe("—");
  });

  it("returns — for non-numeric string", () => {
    expect(formatCost("abc")).toBe("—");
  });

  it("format angka besar menggunakan notasi ringkas", () => {
    const result = formatCost("62000000");
    expect(result).toMatch(/jt|rb/i);
  });
});