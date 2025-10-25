"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookOpen, Sparkles, Video } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold">
            UGC Sora Builder
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-4xl font-bold">About UGC Sora Builder</h1>
            <p className="text-xl text-muted-foreground">
              Your complete guide to creating professional Sora AI video prompts
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                What is UGC Sora Builder?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                UGC Sora Builder is a guided wizard tool that helps content creators build
                detailed JSON prompts for OpenAI&apos;s Sora AI video generation model (sora-2-pro-storyboard).
              </p>
              <p>
                Instead of manually writing complex JSON structures, you can use our intuitive
                interface to select visual elements, audio settings, character details, and more.
                The app generates production-ready JSON prompts that you can immediately use with Sora.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5 text-primary" />
                How It Works
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4 list-decimal list-inside">
                <li>
                  <strong>Choose Format & Technique:</strong> Select aspect ratio, device,
                  style (UGC selfie, talking head, etc.), and technical settings.
                </li>
                <li>
                  <strong>Define Character:</strong> Describe your character&apos;s physical
                  attributes, outfit, and personality tone.
                </li>
                <li>
                  <strong>Set the Scene:</strong> Configure location, background elements,
                  lighting, and cinematography (framing, angle, motion, etc.).
                </li>
                <li>
                  <strong>Configure Audio & Product:</strong> Set up microphone, reverb,
                  background noise, and optionally add a product to showcase.
                </li>
                <li>
                  <strong>Write Your Script:</strong> Create shots with duration, dialogue,
                  actions, and scene-specific notes. Add, duplicate, or reorder shots.
                </li>
                <li>
                  <strong>Preview & Export:</strong> Review your generated JSON, copy to
                  clipboard, or download as a .json file ready for Sora.
                </li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Using Your Prompt with Sora
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Once you&apos;ve generated your JSON prompt, you can use it with OpenAI&apos;s Sora API:
              </p>
              <ol className="space-y-2 list-decimal list-inside">
                <li>Copy the JSON from the preview tab or download the .json file</li>
                <li>Access the Sora API through your OpenAI account</li>
                <li>Submit your prompt using the sora-2-pro-storyboard model</li>
                <li>Wait for Sora to generate your video based on the detailed specifications</li>
              </ol>
              <p className="text-sm text-muted-foreground">
                Note: You need an active OpenAI account with access to Sora to generate videos.
                This tool only creates the prompts.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 list-disc list-inside">
                <li>Step-by-step wizard guides you through every aspect of video creation</li>
                <li>Live JSON preview updates in real-time as you make changes</li>
                <li>Preset templates for common scenarios (selfie kitchen, studio talking head, etc.)</li>
                <li>Multi-shot support with drag-and-drop reordering</li>
                <li>Automatic validation to ensure your prompt meets Sora requirements</li>
                <li>Export as JSON or Markdown format</li>
                <li>Local storage saves your progress automatically</li>
                <li>Quality control negatives to specify what should NOT appear</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tips for Best Results</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 list-disc list-inside">
                <li>Be specific with character descriptions and actions</li>
                <li>Use natural, conversational dialogue for UGC-style videos</li>
                <li>Consider lighting that matches your setting (natural light for home, studio lights for professional)</li>
                <li>Keep shots between 5-20 seconds for dynamic pacing</li>
                <li>Use handheld motion for authentic UGC feel</li>
                <li>Enable quality control negatives to avoid unwanted elements</li>
                <li>Test with presets first to understand the structure</li>
              </ul>
            </CardContent>
          </Card>

          <div className="pt-8 text-center">
            <Link href="/builder">
              <Button size="lg">
                Start Building Your Prompt
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
