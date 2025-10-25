"use client";

import { BuilderState } from "@/lib/schema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface SettingStepProps {
  state: BuilderState;
  onChange: (updates: Partial<BuilderState>) => void;
}

const locationPresets = [
  "modern kitchen",
  "living room",
  "bedroom",
  "bathroom",
  "home office",
  "outdoor patio",
  "coffee shop",
  "studio",
  "custom",
];

const framingOptions = [
  "extreme close-up",
  "close-up",
  "medium close-up",
  "medium shot",
  "waist-up",
  "full body",
];

const angleOptions = [
  "slightly high angle",
  "eye level",
  "slightly low angle",
  "high angle",
  "low angle",
];

const motionOptions = [
  "handheld with micro-jitters",
  "static on tripod",
  "slow pan right",
  "slow pan left",
  "slow zoom in",
  "gimbal smooth",
];

const dofOptions = [
  "no background blur",
  "slight background blur",
  "shallow depth of field, f/2.8",
  "deep focus, f/8",
];

const colorGradeOptions = [
  "warm neutral, HDR on",
  "warm neutral, HDR off",
  "cool neutral",
  "cinematic neutral, slight teal-orange",
  "vibrant, saturated",
  "muted, desaturated",
];

export function SettingStep({ state, onChange }: SettingStepProps) {
  const updateSetting = (field: keyof BuilderState["setting"], value: string) => {
    onChange({
      setting: {
        ...state.setting,
        [field]: value,
      },
    });
  };

  const updateCinematography = (
    field: keyof BuilderState["cinematography"],
    value: string
  ) => {
    onChange({
      cinematography: {
        ...state.cinematography,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Setting & Location</CardTitle>
          <CardDescription>
            Define where your video takes place
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Select
              value={locationPresets.includes(state.setting.location) ? state.setting.location : "custom"}
              onValueChange={(value) => {
                if (value !== "custom") {
                  updateSetting("location", value);
                }
              }}
            >
              <SelectTrigger id="location">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {locationPresets.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {(!locationPresets.includes(state.setting.location) || state.setting.location === "custom") && (
              <Input
                placeholder="Enter custom location"
                value={state.setting.location === "custom" ? "" : state.setting.location}
                onChange={(e) => updateSetting("location", e.target.value)}
              />
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="background">Background Elements</Label>
            <Textarea
              id="background"
              placeholder="e.g., white cabinets, stainless steel appliances"
              value={state.setting.background_elems}
              onChange={(e) => updateSetting("background_elems", e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lighting">Lighting</Label>
            <Textarea
              id="lighting"
              placeholder="e.g., soft diffused natural light from window + warm ambient kitchen lighting"
              value={state.setting.lighting}
              onChange={(e) => updateSetting("lighting", e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cinematography</CardTitle>
          <CardDescription>
            Configure camera settings and visual style
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="framing">Framing</Label>
              <Select
                value={state.cinematography.framing}
                onValueChange={(value) => updateCinematography("framing", value)}
              >
                <SelectTrigger id="framing">
                  <SelectValue placeholder="Select framing" />
                </SelectTrigger>
                <SelectContent>
                  {framingOptions.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="angle">Angle</Label>
              <Select
                value={state.cinematography.angle}
                onValueChange={(value) => updateCinematography("angle", value)}
              >
                <SelectTrigger id="angle">
                  <SelectValue placeholder="Select angle" />
                </SelectTrigger>
                <SelectContent>
                  {angleOptions.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="motion">Motion</Label>
              <Select
                value={state.cinematography.motion}
                onValueChange={(value) => updateCinematography("motion", value)}
              >
                <SelectTrigger id="motion">
                  <SelectValue placeholder="Select motion" />
                </SelectTrigger>
                <SelectContent>
                  {motionOptions.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dof">Depth of Field</Label>
              <Select
                value={state.cinematography.dof}
                onValueChange={(value) => updateCinematography("dof", value)}
              >
                <SelectTrigger id="dof">
                  <SelectValue placeholder="Select DOF" />
                </SelectTrigger>
                <SelectContent>
                  {dofOptions.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="color-grade">Color Grade</Label>
              <Select
                value={state.cinematography.color_grade}
                onValueChange={(value) => updateCinematography("color_grade", value)}
              >
                <SelectTrigger id="color-grade">
                  <SelectValue placeholder="Select color grade" />
                </SelectTrigger>
                <SelectContent>
                  {colorGradeOptions.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
