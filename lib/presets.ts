import { BuilderState } from "./schema";

export interface Preset {
  id: string;
  name: string;
  description: string;
  state: BuilderState;
}

export const presets: Preset[] = [
  {
    id: "selfie-kitchen-iphone-15",
    name: "Selfie Kitchen iPhone 15 Pro",
    description: "UGC selfie in modern kitchen with natural lighting",
    state: {
      aspect_ratio_ui: "9:16",
      resolution: "1080x1920",
      fps: 30,
      device: "iphone_15_pro_front",
      style: "UGC selfie",
      single_take: true,
      character: {
        ethnicity_gender: "white woman",
        age_range: "early 30s",
        hair: "wavy blonde hair pulled to one side",
        eyes: "bright blue eyes",
        skin: "fair skin with light freckles",
        outfit: "red tank top",
        accessories: "delicate gold necklace",
        persona_tone: ["energetic", "persuasive"],
      },
      setting: {
        location: "modern kitchen",
        background_elems: "white cabinets, stainless steel appliances",
        lighting: "soft diffused natural light from window + warm ambient kitchen lighting",
      },
      cinematography: {
        framing: "medium close-up",
        angle: "slightly high angle",
        motion: "handheld with micro-jitters",
        dof: "no background blur",
        color_grade: "warm neutral, HDR on",
      },
      audio: {
        mic: "iPhone mic - clean vocal clarity",
        room_reverb: "light kitchen reverb",
        bg_noise: "faint refrigerator hum",
        music: false,
      },
      product: {
        name: "Body Gleam",
        form: "light yellow cream",
        jar_label: "caramel drip design",
        emphasis: "label in focus during shot 2",
      },
      qc_negatives: [
        "no subtitles",
        "no watermarks",
        "no text overlays",
        "no oversaturation",
        "no blur",
        "no distortion",
      ],
      shots: [
        {
          duration: 15,
          sceneSummary:
            "Creator introduces product enthusiastically to camera",
          actions:
            'Holds jar at chest level, brings it closer to camera. "Oh my god, you guys have to smell this! This Body Gleam cream literally smells like a caramel latte. I\'m obsessed!"',
          cinematography: "",
          audioNotes: "",
        },
        {
          duration: 10,
          sceneSummary: "Creator shows product label and mentions discount",
          actions:
            'Tilts jar to show label clearly. "And I have a discount code in my article - it\'s 20% off right now. Link is in my bio!"',
          cinematography: "",
          audioNotes: "",
        },
      ],
    },
  },
  {
    id: "talking-head-studio",
    name: "Studio Talking Head",
    description: "Professional talking head setup with controlled lighting",
    state: {
      aspect_ratio_ui: "16:9",
      resolution: "1920x1080",
      fps: 30,
      device: "dslr",
      style: "Studio",
      single_take: false,
      character: {
        ethnicity_gender: "asian man",
        age_range: "mid 20s",
        hair: "short black hair, styled",
        eyes: "dark brown eyes",
        skin: "medium tan complexion",
        outfit: "navy blue button-up shirt",
        accessories: "",
        persona_tone: ["professional", "warm"],
      },
      setting: {
        location: "home studio",
        background_elems: "soft bokeh lights, plants on shelf",
        lighting: "three-point lighting setup with key, fill, and rim lights",
      },
      cinematography: {
        framing: "medium close-up",
        angle: "eye level",
        motion: "static on tripod",
        dof: "shallow depth of field, f/2.8",
        color_grade: "cinematic neutral, slight teal-orange",
      },
      audio: {
        mic: "external lavalier mic - broadcast quality",
        room_reverb: "minimal room reverb with acoustic treatment",
        bg_noise: "",
        music: false,
      },
      product: undefined,
      qc_negatives: [
        "no subtitles",
        "no watermarks",
        "no oversaturation",
        "no distortion",
      ],
      shots: [
        {
          duration: 20,
          sceneSummary: "Professional introduction to topic",
          actions:
            'Looks directly at camera. "Hey everyone, today I want to talk about something really important..."',
          cinematography: "",
          audioNotes: "",
        },
      ],
    },
  },
];
