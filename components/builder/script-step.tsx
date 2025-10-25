"use client";

import { BuilderState, ShotInput } from "@/lib/schema";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Copy, Plus, GripVertical } from "lucide-react";

interface ScriptStepProps {
  state: BuilderState;
  onChange: (updates: Partial<BuilderState>) => void;
}

export function ScriptStep({ state, onChange }: ScriptStepProps) {
  const updateShot = (index: number, updates: Partial<ShotInput>) => {
    const newShots = [...state.shots];
    newShots[index] = { ...newShots[index], ...updates };
    onChange({ shots: newShots });
  };

  const addShot = () => {
    onChange({
      shots: [
        ...state.shots,
        {
          duration: 10,
          sceneSummary: "",
          actions: "",
          cinematography: "",
          audioNotes: "",
        },
      ],
    });
  };

  const duplicateShot = (index: number) => {
    const newShots = [...state.shots];
    newShots.splice(index + 1, 0, { ...state.shots[index] });
    onChange({ shots: newShots });
  };

  const removeShot = (index: number) => {
    if (state.shots.length > 1) {
      onChange({
        shots: state.shots.filter((_, i) => i !== index),
      });
    }
  };

  const totalDuration = state.shots.reduce((sum, shot) => sum + shot.duration, 0);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Script & Shots</CardTitle>
          <CardDescription>
            Define each shot with timing, dialogue, and actions. Total duration: {totalDuration}s
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {state.shots.map((shot, index) => (
            <Card key={index} className="border-2">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                    <CardTitle className="text-lg">
                      Shot {index + 1}
                    </CardTitle>
                    <span className="text-sm text-muted-foreground">
                      ({shot.duration}s)
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => duplicateShot(index)}
                      title="Duplicate shot"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    {state.shots.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeShot(index)}
                        title="Remove shot"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`duration-${index}`}>
                    Duration: {shot.duration}s
                  </Label>
                  <Slider
                    id={`duration-${index}`}
                    min={1}
                    max={60}
                    step={1}
                    value={[shot.duration]}
                    onValueChange={(value) =>
                      updateShot(index, { duration: value[0] })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`summary-${index}`}>Scene Summary</Label>
                  <Textarea
                    id={`summary-${index}`}
                    placeholder="Brief description of what happens in this shot"
                    value={shot.sceneSummary}
                    onChange={(e) =>
                      updateShot(index, { sceneSummary: e.target.value })
                    }
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`actions-${index}`}>Actions & Dialogue</Label>
                  <Textarea
                    id={`actions-${index}`}
                    placeholder='e.g., Holds jar at chest level, brings it closer to camera. "Oh my god, you guys have to smell this!"'
                    value={shot.actions}
                    onChange={(e) =>
                      updateShot(index, { actions: e.target.value })
                    }
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground">
                    Use {"{"}"product_name"{"}"} as placeholder for dynamic product name
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`cinematography-${index}`}>
                    Cinematography Notes (Optional)
                  </Label>
                  <Textarea
                    id={`cinematography-${index}`}
                    placeholder="Any specific cinematography adjustments for this shot"
                    value={shot.cinematography || ""}
                    onChange={(e) =>
                      updateShot(index, { cinematography: e.target.value })
                    }
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`audio-${index}`}>
                    Audio Notes (Optional)
                  </Label>
                  <Textarea
                    id={`audio-${index}`}
                    placeholder="Any specific audio adjustments for this shot"
                    value={shot.audioNotes || ""}
                    onChange={(e) =>
                      updateShot(index, { audioNotes: e.target.value })
                    }
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          ))}

          <Button
            variant="outline"
            className="w-full"
            onClick={addShot}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Shot
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
