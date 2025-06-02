"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Volume2, Play, Pause, RotateCcw, Eye } from "lucide-react"

interface ArticulationVisualizerProps {
  selectedSound: string | null
}

export default function ArticulationVisualizer({ selectedSound }: ArticulationVisualizerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState([1])
  const [viewMode, setViewMode] = useState<"sagittal" | "3d" | "waveform">("sagittal")

  const articulationData = {
    "/i/": {
      tongue: "high front",
      lips: "unrounded",
      velum: "raised",
      voicing: "voiced",
      description: "Close front unrounded vowel",
    },
    "/ɑ/": {
      tongue: "low back",
      lips: "unrounded",
      velum: "raised",
      voicing: "voiced",
      description: "Open back unrounded vowel",
    },
    "/p/": {
      tongue: "neutral",
      lips: "bilabial closure",
      velum: "raised",
      voicing: "voiceless",
      description: "Voiceless bilabial plosive",
    },
  }

  const currentData = selectedSound ? articulationData[selectedSound as keyof typeof articulationData] : null

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visualization Area */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Articulation Visualization
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={viewMode === "sagittal" ? "default" : "outline"}
                  onClick={() => setViewMode("sagittal")}
                >
                  Sagittal
                </Button>
                <Button size="sm" variant={viewMode === "3d" ? "default" : "outline"} onClick={() => setViewMode("3d")}>
                  3D
                </Button>
                <Button
                  size="sm"
                  variant={viewMode === "waveform" ? "default" : "outline"}
                  onClick={() => setViewMode("waveform")}
                >
                  Waveform
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
              {selectedSound ? (
                <div className="text-center">
                  {viewMode === "sagittal" && (
                    <div className="relative w-full h-full">
                      {/* Simplified sagittal view representation */}
                      <svg viewBox="0 0 300 300" className="w-full h-full">
                        {/* Head outline */}
                        <path
                          d="M50 150 Q50 50 150 50 Q250 50 250 150 Q250 200 200 250 Q150 270 100 250 Q50 200 50 150"
                          fill="none"
                          stroke="#666"
                          strokeWidth="2"
                        />
                        {/* Tongue position based on sound */}
                        <ellipse
                          cx={selectedSound === "/i/" ? 180 : selectedSound === "/ɑ/" ? 120 : 150}
                          cy={selectedSound === "/i/" ? 120 : selectedSound === "/ɑ/" ? 200 : 160}
                          rx="40"
                          ry="15"
                          fill="#ff6b6b"
                          opacity="0.7"
                        />
                        {/* Lips */}
                        <line x1="250" y1="150" x2="270" y2="150" stroke="#333" strokeWidth="4" strokeLinecap="round" />
                      </svg>
                      <div className="absolute bottom-4 left-4 text-6xl font-mono">{selectedSound}</div>
                    </div>
                  )}

                  {viewMode === "3d" && (
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="text-8xl font-mono mb-4">{selectedSound}</div>
                      <p className="text-gray-600">3D articulation model would appear here</p>
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          Front View
                        </Button>
                        <Button size="sm" variant="outline">
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Rotate
                        </Button>
                      </div>
                    </div>
                  )}

                  {viewMode === "waveform" && (
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="text-6xl font-mono mb-4">{selectedSound}</div>
                      {/* Simulated waveform */}
                      <svg viewBox="0 0 200 60" className="w-full h-16 mb-4">
                        <path
                          d="M0 30 Q25 10 50 30 T100 30 T150 30 T200 30"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="2"
                        />
                      </svg>
                      <p className="text-gray-600">Audio waveform and spectrogram</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <Eye className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Select an IPA symbol to see articulation</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Controls and Details */}
        <div className="space-y-6">
          {/* Playback Controls */}
          <Card>
            <CardHeader>
              <CardTitle>Audio Controls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Button onClick={() => setIsPlaying(!isPlaying)} disabled={!selectedSound}>
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button variant="outline" disabled={!selectedSound}>
                    <Volume2 className="w-4 h-4 mr-2" />
                    Native Speaker
                  </Button>
                  <Button variant="outline" disabled={!selectedSound}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Loop
                  </Button>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Playback Speed</label>
                  <Slider
                    value={playbackSpeed}
                    onValueChange={setPlaybackSpeed}
                    max={2}
                    min={0.25}
                    step={0.25}
                    className="w-full"
                  />
                  <div className="text-sm text-gray-600 text-center">{playbackSpeed[0]}x speed</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Articulation Details */}
          <Card>
            <CardHeader>
              <CardTitle>Articulation Details</CardTitle>
            </CardHeader>
            <CardContent>
              {currentData ? (
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-lg mb-2">{selectedSound}</h4>
                    <p className="text-sm text-gray-600 mb-3">{currentData.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-sm font-medium">Tongue:</span>
                      <Badge variant="outline" className="ml-2">
                        {currentData.tongue}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Lips:</span>
                      <Badge variant="outline" className="ml-2">
                        {currentData.lips}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Velum:</span>
                      <Badge variant="outline" className="ml-2">
                        {currentData.velum}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Voicing:</span>
                      <Badge variant="outline" className="ml-2">
                        {currentData.voicing}
                      </Badge>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">Select a sound to see articulation details</p>
              )}
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Pronunciation Tips</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedSound ? (
                <div className="space-y-2">
                  <p className="text-sm">
                    <strong>Tip:</strong> Focus on the tongue position and lip shape shown in the visualization.
                  </p>
                  <p className="text-sm">
                    <strong>Practice:</strong> Try to match the articulation while listening to the audio.
                  </p>
                  <p className="text-sm">
                    <strong>Common mistake:</strong> Specific guidance would appear here based on the selected sound.
                  </p>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Select a sound to see pronunciation tips</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
