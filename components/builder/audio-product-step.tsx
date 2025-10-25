"use client";

import { BuilderState } from "@/lib/schema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface AudioProductStepProps {
  state: BuilderState;
  onChange: (updates: Partial<BuilderState>) => void;
}

const qcNegativeOptions = [
  "no subtitles",
  "no watermarks",
  "no text overlays",
  "no oversaturation",
  "no blur",
  "no distortion",
  "no filters",
  "no excessive color grading",
];

export function AudioProductStep({ state, onChange }: AudioProductStepProps) {
  const updateAudio = (field: keyof BuilderState["audio"], value: string | boolean) => {
    onChange({
      audio: {
        ...state.audio,
        [field]: value,
      },
    });
  };

  const updateProduct = (field: string, value: string) => {
    onChange({
      product: {
        ...state.product,
        [field]: value,
      } as BuilderState["product"],
    });
  };

  const removeProduct = () => {
    onChange({ product: undefined });
  };

  const addProduct = () => {
    onChange({
      product: {
        name: "",
        form: "",
        jar_label: "",
        emphasis: "",
      },
    });
  };

  const toggleQCNegative = (negative: string) => {
    const current = state.qc_negatives;
    const updated = current.includes(negative)
      ? current.filter((n) => n !== negative)
      : [...current, negative];
    onChange({ qc_negatives: updated });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Audio Settings</CardTitle>
          <CardDescription>
            Configure microphone, reverb, and background audio
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="mic">Microphone</Label>
            <Input
              id="mic"
              placeholder="e.g., iPhone mic - clean vocal clarity"
              value={state.audio.mic}
              onChange={(e) => updateAudio("mic", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reverb">Room Reverb</Label>
            <Input
              id="reverb"
              placeholder="e.g., light kitchen reverb"
              value={state.audio.room_reverb}
              onChange={(e) => updateAudio("room_reverb", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bg-noise">Background Noise (Optional)</Label>
            <Input
              id="bg-noise"
              placeholder="e.g., faint refrigerator hum"
              value={state.audio.bg_noise || ""}
              onChange={(e) => updateAudio("bg_noise", e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-0.5">
              <Label htmlFor="music">Background Music</Label>
              <p className="text-sm text-muted-foreground">
                Add music to the video
              </p>
            </div>
            <Switch
              id="music"
              checked={state.audio.music}
              onCheckedChange={(checked) => updateAudio("music", checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Product (Optional)</CardTitle>
          <CardDescription>
            Add a product to showcase in your video
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!state.product ? (
            <button
              onClick={addProduct}
              className="w-full p-4 border-2 border-dashed rounded-lg hover:border-primary hover:bg-accent transition-colors"
            >
              + Add Product
            </button>
          ) : (
            <>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="product-name">Product Name</Label>
                  <Input
                    id="product-name"
                    placeholder="e.g., Body Gleam"
                    value={state.product.name}
                    onChange={(e) => updateProduct("name", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="product-form">Form & Description</Label>
                  <Input
                    id="product-form"
                    placeholder="e.g., light yellow cream"
                    value={state.product.form}
                    onChange={(e) => updateProduct("form", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="product-label">Label Design</Label>
                  <Input
                    id="product-label"
                    placeholder="e.g., caramel drip design"
                    value={state.product.jar_label}
                    onChange={(e) => updateProduct("jar_label", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="product-emphasis">Emphasis (Optional)</Label>
                  <Textarea
                    id="product-emphasis"
                    placeholder="e.g., label in focus during shot 2"
                    value={state.product.emphasis || ""}
                    onChange={(e) => updateProduct("emphasis", e.target.value)}
                    rows={2}
                  />
                </div>
              </div>

              <button
                onClick={removeProduct}
                className="text-sm text-destructive hover:underline"
              >
                Remove Product
              </button>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quality Control Negatives</CardTitle>
          <CardDescription>
            Specify what should NOT appear in the video
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {qcNegativeOptions.map((negative) => (
              <div key={negative} className="flex items-center space-x-2">
                <Checkbox
                  id={`qc-${negative}`}
                  checked={state.qc_negatives.includes(negative)}
                  onCheckedChange={() => toggleQCNegative(negative)}
                />
                <label
                  htmlFor={`qc-${negative}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {negative}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
