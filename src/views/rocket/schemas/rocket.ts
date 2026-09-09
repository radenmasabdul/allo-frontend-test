import { z } from "zod";

export const rocketSchema = z.object({
  name: z.string().min(1, "Rocket name is required"),
  image_url: z.string().url("Please enter a valid image URL"),
  launch_cost: z
    .string()
    .min(1, "Launch cost is required")
    .regex(/^\d+$/, "Launch cost must be a number"),
  country_code: z.string().min(1, "Country is required"),
  maiden_flight: z.date({
    required_error: "First flight is required",
  }),
  description: z.string().min(1, "Description is required"),
});

export type RocketForm = z.infer<typeof rocketSchema>;