"use client";

import { useState, useEffect } from "react";
import { BuilderState, defaultBuilderState } from "@/lib/schema";
import { presets } from "@/lib/presets";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FormatStep } from "@/components/builder/format-step";
import { CharacterStep } from "@/components/builder/character-step";
import { SettingStep } from "@/components/builder/setting-step";
import { AudioProductStep } from "@/components/builder/audio-product-step";
import { ScriptStep } from "@/components/builder/script-step";
import { PreviewStep } from "@/components/builder/preview-step";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import Link from "next/link";

const STORAGE_KEY = "ugc-sora-builder-state";

const steps = [
  { id: 1, name: "Format", component: FormatStep },
  { id: 2, name: "Character", component: CharacterStep },
  { id: 3, name: "Setting", component: SettingStep },
  { id: 4, name: "Audio & Product", component: AudioProductStep },
  { id: 5, name: "Script", component: ScriptStep },
  { id: 6, name: "Preview", component: PreviewStep },
];

export default function BuilderPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [state, setState] = useState<BuilderState>(defaultBuilderState);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const params = new URLSearchParams(window.location.search);
    const presetId = params.get("preset");

    if (presetId) {
      const preset = presets.find((p) => p.id === presetId);
      if (preset) {
        setState(preset.state);
        return;
      }
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setState(JSON.parse(saved));
      } catch (error) {
        console.error("Failed to load saved state:", error);
      }
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const presetId = params.get("preset");

    if (!presetId && mounted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, mounted]);

  const updateState = (updates: Partial<BuilderState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const resetState = () => {
    if (confirm("Are you sure you want to reset all fields?")) {
      setState(defaultBuilderState);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const currentStepData = steps.find((s) => s.id === currentStep);
  const StepComponent = currentStepData?.component;
  const progress = (currentStep / steps.length) * 100;

  if (!mounted) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold">
              UGC Sora Builder
            </Link>
            <Button variant="outline" size="sm" onClick={resetState}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                Step {currentStep}: {currentStepData?.name}
              </h2>
              <span className="text-sm text-muted-foreground">
                {currentStep} of {steps.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex gap-2 flex-wrap">
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    currentStep === step.id
                      ? "bg-primary text-primary-foreground"
                      : currentStep > step.id
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step.name}
                </button>
              ))}
            </div>
          </div>

          <div className="min-h-[400px]">
            {StepComponent && (
              <StepComponent state={state} onChange={updateState} />
            )}
          </div>

          <div className="flex items-center justify-between pt-6 border-t">
            <Button
              variant="outline"
              onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {currentStep < steps.length ? (
              <Button
                onClick={() =>
                  setCurrentStep((prev) => Math.min(steps.length, prev + 1))
                }
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Link href="/">
                <Button>Finish</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
