"use client";

import { BuilderState } from "@/lib/schema";
import { generateSoraJSON, generateMarkdown } from "@/lib/json-generator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Download, FileJson, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PreviewStepProps {
  state: BuilderState;
}

export function PreviewStep({ state }: PreviewStepProps) {
  const { toast } = useToast();
  const soraJSON = generateSoraJSON(state);
  const markdown = generateMarkdown(state);
  const jsonString = JSON.stringify(soraJSON, null, 2);

  const copyJSON = async () => {
    try {
      await navigator.clipboard.writeText(jsonString);
      toast({
        title: "Copied!",
        description: "JSON copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const downloadJSON = () => {
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sora-prompt.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "Downloaded!",
      description: "JSON file downloaded successfully",
    });
  };

  const copyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      toast({
        title: "Copied!",
        description: "Markdown copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Preview & Export</CardTitle>
          <CardDescription>
            Review your generated prompt and export in your preferred format
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="json" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="json">JSON</TabsTrigger>
              <TabsTrigger value="markdown">Markdown</TabsTrigger>
              <TabsTrigger value="summary">Summary</TabsTrigger>
            </TabsList>

            <TabsContent value="json" className="space-y-4">
              <div className="flex gap-2">
                <Button onClick={copyJSON} variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy JSON
                </Button>
                <Button onClick={downloadJSON} variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download .json
                </Button>
              </div>
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs max-h-[600px] overflow-y-auto">
                  <code>{jsonString}</code>
                </pre>
              </div>
            </TabsContent>

            <TabsContent value="markdown" className="space-y-4">
              <div className="flex gap-2">
                <Button onClick={copyMarkdown} variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Markdown
                </Button>
              </div>
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs max-h-[600px] overflow-y-auto whitespace-pre-wrap">
                  <code>{markdown}</code>
                </pre>
              </div>
            </TabsContent>

            <TabsContent value="summary" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Format</h3>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>Aspect Ratio: {state.aspect_ratio_ui}</li>
                    <li>Resolution: {state.resolution}</li>
                    <li>FPS: {state.fps}</li>
                    <li>Device: {state.device.replace(/_/g, " ")}</li>
                    <li>Style: {state.style}</li>
                    <li>Single Take: {state.single_take ? "Yes" : "No"}</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Character</h3>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>{state.character.ethnicity_gender}, {state.character.age_range}</li>
                    <li>Hair: {state.character.hair}</li>
                    <li>Eyes: {state.character.eyes}</li>
                    <li>Outfit: {state.character.outfit}</li>
                    <li>Tone: {state.character.persona_tone.join(", ")}</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Setting</h3>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>Location: {state.setting.location}</li>
                    <li>Background: {state.setting.background_elems}</li>
                    <li>Lighting: {state.setting.lighting}</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Cinematography</h3>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>Framing: {state.cinematography.framing}</li>
                    <li>Angle: {state.cinematography.angle}</li>
                    <li>Motion: {state.cinematography.motion}</li>
                    <li>DOF: {state.cinematography.dof}</li>
                    <li>Color: {state.cinematography.color_grade}</li>
                  </ul>
                </div>

                {state.product && (
                  <div>
                    <h3 className="font-semibold mb-2">Product</h3>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Name: {state.product.name}</li>
                      <li>Form: {state.product.form}</li>
                      <li>Label: {state.product.jar_label}</li>
                    </ul>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold mb-2">Shots</h3>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {state.shots.map((shot, i) => (
                      <li key={i}>
                        Shot {i + 1}: {shot.duration}s - {shot.sceneSummary || "No summary"}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
