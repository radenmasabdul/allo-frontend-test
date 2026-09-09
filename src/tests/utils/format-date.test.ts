import { describe, it, expect } from "vitest";
import { formatDate, formatDateToApi } from "@/utils/format-date";

describe("Format Date", () => {
  it("format string tanggal yang benar", () => {
    const result = formatDate("2010-06-04");
    expect(result).not.toBe("—");
  });

  it("returns — for null", () => {
    expect(formatDate(null)).toBe("—");
  });

  it("returns — for undefined", () => {
    expect(formatDate(undefined)).toBe("—");
  });
});

describe("Format Date to Api", () => {
  it("format tanggal menjadi YYYY-MM-DD", () => {
    const date = new Date(2024, 0, 5);
    expect(formatDateToApi(date)).toBe("2024-01-05");
  });

  it("menambahkan angka nol di depan bulan dan hari yang hanya terdiri dari satu digit", () => {
    const date = new Date(2024, 8, 9);
    expect(formatDateToApi(date)).toBe("2024-09-09");
  });

  it("Menangani bulan Desember dengan benar", () => {
    const date = new Date(2024, 11, 31);
    expect(formatDateToApi(date)).toBe("2024-12-31");
  });
});