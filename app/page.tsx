"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { presets } from "@/lib/presets";
import { ArrowRight, Sparkles, Video, Wand2 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto space-y-16">
          <section className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-sm font-medium text-primary mb-4">
              <Sparkles className="h-4 w-4" />
              Sora Prompt Builder
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Build Your Perfect
              <span className="block text-primary mt-2">UGC Video Prompt</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Create professional Sora AI video prompts through a guided wizard.
              No technical knowledge required.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Link href="/builder">
                <Button size="lg" className="gap-2">
                  <Wand2 className="h-5 w-5" />
                  Build Your Prompt
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </section>

          <section className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Quick Start with Presets</h2>
              <p className="text-muted-foreground">
                Start with a template and customize to your needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {presets.map((preset) => (
                <Card key={preset.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="flex items-center gap-2">
                          <Video className="h-5 w-5 text-primary" />
                          {preset.name}
                        </CardTitle>
                        <CardDescription>{preset.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-primary/10 text-xs font-medium">
                          {preset.state.aspect_ratio_ui}
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-primary/10 text-xs font-medium">
                          {preset.state.fps} FPS
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-primary/10 text-xs font-medium">
                          {preset.state.style}
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-primary/10 text-xs font-medium">
                          {preset.state.shots.length} {preset.state.shots.length === 1 ? "shot" : "shots"}
                        </span>
                      </div>
                      <Link href={`/builder?preset=${preset.id}`}>
                        <Button className="w-full gap-2">
                          Load Preset
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Wand2 className="h-5 w-5 text-primary" />
                  </div>
                  Guided Wizard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Step-by-step process guides you through every aspect of your video prompt
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Video className="h-5 w-5 text-primary" />
                  </div>
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  See your JSON prompt update in real-time as you make changes
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  Export Ready
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Copy to clipboard or download as JSON for immediate use with Sora
                </p>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
