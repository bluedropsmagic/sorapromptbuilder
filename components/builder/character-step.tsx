"use client";

import { BuilderState } from "@/lib/schema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface CharacterStepProps {
  state: BuilderState;
  onChange: (updates: Partial<BuilderState>) => void;
}

const personaTones = [
  "energetic",
  "warm",
  "persuasive",
  "neutral",
  "professional",
  "casual",
  "enthusiastic",
  "calm",
];

export function CharacterStep({ state, onChange }: CharacterStepProps) {
  const updateCharacter = (field: keyof BuilderState["character"], value: string | string[]) => {
    onChange({
      character: {
        ...state.character,
        [field]: value,
      },
    });
  };

  const togglePersonaTone = (tone: string) => {
    const current = state.character.persona_tone;
    const updated = current.includes(tone)
      ? current.filter((t) => t !== tone)
      : [...current, tone];
    updateCharacter("persona_tone", updated);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Character Details</CardTitle>
          <CardDescription>
            Define the physical attributes and personality of your character
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="ethnicity-gender">Ethnicity & Gender</Label>
              <Input
                id="ethnicity-gender"
                placeholder="e.g., white woman"
                value={state.character.ethnicity_gender}
                onChange={(e) =>
                  updateCharacter("ethnicity_gender", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age-range">Age Range</Label>
              <Input
                id="age-range"
                placeholder="e.g., early 30s"
                value={state.character.age_range}
                onChange={(e) => updateCharacter("age_range", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hair">Hair</Label>
              <Input
                id="hair"
                placeholder="e.g., wavy blonde hair pulled to one side"
                value={state.character.hair}
                onChange={(e) => updateCharacter("hair", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="eyes">Eyes</Label>
              <Input
                id="eyes"
                placeholder="e.g., bright blue eyes"
                value={state.character.eyes}
                onChange={(e) => updateCharacter("eyes", e.target.value)}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="skin">Skin & Features</Label>
              <Input
                id="skin"
                placeholder="e.g., fair skin with light freckles"
                value={state.character.skin}
                onChange={(e) => updateCharacter("skin", e.target.value)}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="outfit">Outfit</Label>
              <Input
                id="outfit"
                placeholder="e.g., red tank top"
                value={state.character.outfit}
                onChange={(e) => updateCharacter("outfit", e.target.value)}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="accessories">Accessories (Optional)</Label>
              <Input
                id="accessories"
                placeholder="e.g., delicate gold necklace"
                value={state.character.accessories || ""}
                onChange={(e) => updateCharacter("accessories", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label>Personality Tone (Select at least one)</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {personaTones.map((tone) => (
                <div key={tone} className="flex items-center space-x-2">
                  <Checkbox
                    id={`tone-${tone}`}
                    checked={state.character.persona_tone.includes(tone)}
                    onCheckedChange={() => togglePersonaTone(tone)}
                  />
                  <label
                    htmlFor={`tone-${tone}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize cursor-pointer"
                  >
                    {tone}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
