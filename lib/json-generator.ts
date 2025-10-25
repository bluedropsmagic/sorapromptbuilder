import { BuilderState } from "./schema";

interface SoraShot {
  duration: number;
  Scene: string;
  character: string;
  cinematography: string;
  audio: string;
  product?: string;
  actions: string;
  ugc_authenticity_keywords: string[];
  quality_control_negatives: string[];
}

interface SoraJSON {
  model: string;
  aspect_ratio: "portrait" | "square" | "landscape";
  n_frames: number;
  shots: SoraShot[];
}

export function generateSoraJSON(state: BuilderState): SoraJSON {
  const aspectRatioMap = {
    "9:16": "portrait" as const,
    "1:1": "square" as const,
    "16:9": "landscape" as const,
  };

  const totalDuration = state.shots.reduce(
    (sum, shot) => sum + shot.duration,
    0
  );
  const nFrames = Math.round(state.fps * totalDuration);

  const deviceMap = {
    iphone_15_pro_front: "iPhone 15 Pro front-facing camera",
    iphone_14_front: "iPhone 14 front-facing camera",
    pixel_8_front: "Google Pixel 8 front-facing camera",
    dslr: "DSLR camera",
  };

  const characterDesc = `${state.character.ethnicity_gender}, ${state.character.age_range}, with ${state.character.hair}, ${state.character.eyes}, ${state.character.skin}. Wearing ${state.character.outfit}${
    state.character.accessories
      ? `, accessorized with ${state.character.accessories}`
      : ""
  }. Natural skin texture without filters. Personality: ${state.character.persona_tone.join(", ")}.`;

  const baseCinematography = `${state.cinematography.framing}, ${state.cinematography.angle}, ${state.cinematography.motion}, ${state.cinematography.dof}, ${state.cinematography.color_grade}`;

  const baseAudio = `${state.audio.mic}${
    state.audio.room_reverb ? `, ${state.audio.room_reverb}` : ""
  }${state.audio.bg_noise ? `, with faint ${state.audio.bg_noise} in the background` : ""}${
    !state.audio.music ? ", no music" : ""
  }`;

  const productDesc = state.product
    ? `${state.product.name} - ${state.product.form}, with ${state.product.jar_label} label${
        state.product.emphasis ? `. ${state.product.emphasis}` : ""
      }. Label clearly legible.`
    : undefined;

  const ugcKeywords = [
    state.device.includes("iphone") || state.device.includes("pixel")
      ? "smartphone selfie"
      : "camera recording",
    state.cinematography.motion.includes("handheld")
      ? "handheld realism"
      : "stable shot",
    state.setting.location.includes("kitchen") ||
    state.setting.location.includes("home")
      ? "home setting"
      : "location setting",
    state.setting.lighting.includes("natural") ? "natural light" : "lighting",
    state.style === "UGC selfie" ? "direct-to-camera" : "on-camera",
  ];

  if (state.single_take) {
    ugcKeywords.push("single take");
  }

  const shots: SoraShot[] = state.shots.map((shot, index) => {
    const sceneText = `${deviceMap[state.device]} ${state.style.toLowerCase()} in ${
      state.setting.location
    }. ${state.setting.background_elems}. ${shot.sceneSummary}${
      state.single_take ? ". No cuts; one continuous take." : ""
    }`;

    const shotCinematography = shot.cinematography
      ? `${baseCinematography}. ${shot.cinematography}`
      : baseCinematography;

    const shotAudio = shot.audioNotes
      ? `${baseAudio}. ${shot.audioNotes}`
      : baseAudio;

    return {
      duration: shot.duration,
      Scene: sceneText,
      character: characterDesc,
      cinematography: shotCinematography,
      audio: shotAudio,
      ...(productDesc && { product: productDesc }),
      actions: shot.actions,
      ugc_authenticity_keywords: ugcKeywords,
      quality_control_negatives: state.qc_negatives,
    };
  });

  return {
    model: "sora-2-pro-storyboard",
    aspect_ratio: aspectRatioMap[state.aspect_ratio_ui],
    n_frames: nFrames,
    shots,
  };
}

export function generateMarkdown(state: BuilderState): string {
  const json = generateSoraJSON(state);
  let md = `# Sora UGC Prompt\n\n`;
  md += `**Model:** ${json.model}\n`;
  md += `**Aspect Ratio:** ${json.aspect_ratio}\n`;
  md += `**Frames:** ${json.n_frames}\n\n`;

  json.shots.forEach((shot, i) => {
    md += `## Shot ${i + 1} (${shot.duration}s)\n\n`;
    md += `**Scene:** ${shot.Scene}\n\n`;
    md += `**Character:** ${shot.character}\n\n`;
    md += `**Cinematography:** ${shot.cinematography}\n\n`;
    md += `**Audio:** ${shot.audio}\n\n`;
    if (shot.product) {
      md += `**Product:** ${shot.product}\n\n`;
    }
    md += `**Actions:** ${shot.actions}\n\n`;
  });

  return md;
}
