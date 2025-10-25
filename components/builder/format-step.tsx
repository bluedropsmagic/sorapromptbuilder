"use client";

import { BuilderState } from "@/lib/schema";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface FormatStepProps {
  state: BuilderState;
  onChange: (updates: Partial<BuilderState>) => void;
}

export function FormatStep({ state, onChange }: FormatStepProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Format & Technical Settings</CardTitle>
          <CardDescription>
            Configure the technical parameters for your video
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="aspect-ratio">Aspect Ratio</Label>
              <Select
                value={state.aspect_ratio_ui}
                onValueChange={(value) =>
                  onChange({
                    aspect_ratio_ui: value as BuilderState["aspect_ratio_ui"],
                    resolution:
                      value === "9:16"
                        ? "1080x1920"
                        : value === "1:1"
                          ? "1080x1080"
                          : "1920x1080",
                  })
                }
              >
                <SelectTrigger id="aspect-ratio">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="9:16">9:16 (Portrait)</SelectItem>
                  <SelectItem value="1:1">1:1 (Square)</SelectItem>
                  <SelectItem value="16:9">16:9 (Landscape)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fps">FPS</Label>
              <Select
                value={state.fps.toString()}
                onValueChange={(value) =>
                  onChange({ fps: parseInt(value) })
                }
              >
                <SelectTrigger id="fps">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24">24</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                  <SelectItem value="60">60</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="device">Device</Label>
              <Select
                value={state.device}
                onValueChange={(value) =>
                  onChange({ device: value as BuilderState["device"] })
                }
              >
                <SelectTrigger id="device">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="iphone_15_pro_front">
                    iPhone 15 Pro (front)
                  </SelectItem>
                  <SelectItem value="iphone_14_front">
                    iPhone 14 (front)
                  </SelectItem>
                  <SelectItem value="pixel_8_front">
                    Google Pixel 8 (front)
                  </SelectItem>
                  <SelectItem value="dslr">DSLR Camera</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="style">Style</Label>
              <Select
                value={state.style}
                onValueChange={(value) =>
                  onChange({ style: value as BuilderState["style"] })
                }
              >
                <SelectTrigger id="style">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UGC selfie">UGC Selfie</SelectItem>
                  <SelectItem value="Talking head">Talking Head</SelectItem>
                  <SelectItem value="B-roll">B-roll</SelectItem>
                  <SelectItem value="Studio">Studio</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-0.5">
              <Label htmlFor="single-take">Single Take</Label>
              <p className="text-sm text-muted-foreground">
                Record as one continuous shot without cuts
              </p>
            </div>
            <Switch
              id="single-take"
              checked={state.single_take}
              onCheckedChange={(checked) =>
                onChange({ single_take: checked })
              }
            />
          </div>

          <div className="text-sm text-muted-foreground">
            <p>Resolution: {state.resolution}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
