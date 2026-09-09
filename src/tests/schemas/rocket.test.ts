import { describe, it, expect } from "vitest";
import { rocketSchema } from "@/views/rocket/schemas/rocket";

const validData = {
  name: "Falcon 9",
  image_url: "https://example.com/falcon9.jpg",
  launch_cost: "62000000",
  country_code: "USA",
  maiden_flight: new Date("2010-06-04"),
  description: "A reusable rocket by SpaceX",
};

describe("Rocket Schema", () => {
  it("lolos validasi dengan data yang valid", () => {
    expect(() => rocketSchema.parse(validData)).not.toThrow();
  });

  it("gagal jika name kosong", () => {
    const result = rocketSchema.safeParse({ ...validData, name: "" });
    expect(result.success).toBe(false);
  });

  it("gagal jika image_url bukan URL valid", () => {
    const result = rocketSchema.safeParse({ ...validData, image_url: "not-a-url" });
    expect(result.success).toBe(false);
  });

  it("gagal jika launch_cost kosong", () => {
    const result = rocketSchema.safeParse({ ...validData, launch_cost: "" });
    expect(result.success).toBe(false);
  });

  it("gagal jika launch_cost bukan angka", () => {
    const result = rocketSchema.safeParse({ ...validData, launch_cost: "abc" });
    expect(result.success).toBe(false);
  });

  it("gagal jika country_code kosong", () => {
    const result = rocketSchema.safeParse({ ...validData, country_code: "" });
    expect(result.success).toBe(false);
  });

  it("gagal jika maiden_flight bukan Date", () => {
    const result = rocketSchema.safeParse({ ...validData, maiden_flight: "2010-06-04" });
    expect(result.success).toBe(false);
  });

  it("gagal jika description kosong", () => {
    const result = rocketSchema.safeParse({ ...validData, description: "" });
    expect(result.success).toBe(false);
  });
});
