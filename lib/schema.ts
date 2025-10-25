import { z } from "zod";

export const AspectRatioUISchema = z.enum(["9:16", "1:1", "16:9"]);
export const DevicePresetSchema = z.enum([
  "iphone_15_pro_front",
  "iphone_14_front",
  "pixel_8_front",
  "dslr",
]);
export const StyleSchema = z.enum([
  "UGC selfie",
  "Talking head",
  "B-roll",
  "Studio",
]);

export const CharacterSchema = z.object({
  ethnicity_gender: z.string().min(1, "Required"),
  age_range: z.string().min(1, "Required"),
  hair: z.string().min(1, "Required"),
  eyes: z.string().min(1, "Required"),
  skin: z.string().min(1, "Required"),
  outfit: z.string().min(1, "Required"),
  accessories: z.string().optional(),
  persona_tone: z.array(z.string()).min(1, "Select at least one"),
});

export const SettingSchema = z.object({
  location: z.string().min(1, "Required"),
  background_elems: z.string().min(1, "Required"),
  lighting: z.string().min(1, "Required"),
});

export const CinematographySchema = z.object({
  framing: z.string().min(1, "Required"),
  angle: z.string().min(1, "Required"),
  motion: z.string().min(1, "Required"),
  dof: z.string().min(1, "Required"),
  color_grade: z.string().min(1, "Required"),
});

export const AudioSchema = z.object({
  mic: z.string().min(1, "Required"),
  room_reverb: z.string().min(1, "Required"),
  bg_noise: z.string().optional(),
  music: z.boolean(),
});

export const ProductSchema = z
  .object({
    name: z.string(),
    form: z.string(),
    jar_label: z.string(),
    emphasis: z.string().optional(),
  })
  .optional();

export const ShotInputSchema = z.object({
  duration: z.number().min(1, "Duration must be at least 1s"),
  sceneSummary: z.string().min(1, "Scene summary required"),
  actions: z.string().min(1, "Actions required"),
  cinematography: z.string().optional(),
  audioNotes: z.string().optional(),
});

export const BuilderStateSchema = z.object({
  aspect_ratio_ui: AspectRatioUISchema,
  resolution: z.string(),
  fps: z.number().int().refine((val) => [24, 25, 30, 60].includes(val)),
  device: DevicePresetSchema,
  style: StyleSchema,
  single_take: z.boolean(),
  character: CharacterSchema,
  setting: SettingSchema,
  cinematography: CinematographySchema,
  audio: AudioSchema,
  product: ProductSchema,
  qc_negatives: z.array(z.string()),
  shots: z
    .array(ShotInputSchema)
    .min(1, "At least one shot required")
    .refine(
      (shots) => shots.reduce((sum, shot) => sum + shot.duration, 0) >= 5,
      "Total duration must be at least 5 seconds"
    ),
});

export type BuilderState = z.infer<typeof BuilderStateSchema>;
export type ShotInput = z.infer<typeof ShotInputSchema>;
export type AspectRatioUI = z.infer<typeof AspectRatioUISchema>;
export type DevicePreset = z.infer<typeof DevicePresetSchema>;
export type StyleType = z.infer<typeof StyleSchema>;

export const defaultBuilderState: BuilderState = {
  aspect_ratio_ui: "9:16",
  resolution: "1080x1920",
  fps: 30,
  device: "iphone_15_pro_front",
  style: "UGC selfie",
  single_take: true,
  character: {
    ethnicity_gender: "",
    age_range: "",
    hair: "",
    eyes: "",
    skin: "",
    outfit: "",
    accessories: "",
    persona_tone: [],
  },
  setting: {
    location: "",
    background_elems: "",
    lighting: "",
  },
  cinematography: {
    framing: "",
    angle: "",
    motion: "",
    dof: "",
    color_grade: "",
  },
  audio: {
    mic: "",
    room_reverb: "",
    bg_noise: "",
    music: false,
  },
  product: undefined,
  qc_negatives: [],
  shots: [
    {
      duration: 15,
      sceneSummary: "",
      actions: "",
      cinematography: "",
      audioNotes: "",
    },
  ],
};
