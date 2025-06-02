"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Volume2, Mic, RotateCcw, BookOpen, Target, Globe, User } from "lucide-react"
import IPAChart from "@/components/ipa-chart"
import NotationConverter from "@/components/notation-converter"
import LanguageModules from "@/components/language-modules"
import ArticulationVisualizer from "@/components/articulation-visualizer"
import PracticeSession from "@/components/practice-session"
import UserProfile from "@/components/user-profile"

export default function PhonoLab() {
  const [activeTab, setActiveTab] = useState("explorer")
  const [selectedSound, setSelectedSound] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">🎯 PhonoLab</h1>
          <p className="text-lg text-gray-600 mb-4">Master the sound of language—from symbol to speech</p>
          <div className="flex justify-center gap-2 flex-wrap">
            <Badge variant="secondary">IPA Training</Badge>
            <Badge variant="secondary">Multi-Language</Badge>
            <Badge variant="secondary">Speech Analysis</Badge>
            <Badge variant="secondary">Visual Learning</Badge>
          </div>
        </div>

        {/* Main Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="explorer" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              IPA Explorer
            </TabsTrigger>
            <TabsTrigger value="converter" className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4" />
              Converter
            </TabsTrigger>
            <TabsTrigger value="languages" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Languages
            </TabsTrigger>
            <TabsTrigger value="visualizer" className="flex items-center gap-2">
              <Volume2 className="w-4 h-4" />
              Visualizer
            </TabsTrigger>
            <TabsTrigger value="practice" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Practice
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          {/* IPA Explorer */}
          <TabsContent value="explorer">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Interactive IPA Chart</CardTitle>
                    <CardDescription>Click any symbol to hear pronunciation and see articulation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <IPAChart onSoundSelect={setSelectedSound} selectedSound={selectedSound} />
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Sound Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedSound ? (
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="text-6xl font-mono mb-2">{selectedSound}</div>
                          <p className="text-sm text-gray-600">Selected IPA Symbol</p>
                        </div>

                        <div className="space-y-2">
                          <Button className="w-full" variant="outline">
                            <Volume2 className="w-4 h-4 mr-2" />
                            Play RP Pronunciation
                          </Button>
                          <Button className="w-full" variant="outline">
                            <Volume2 className="w-4 h-4 mr-2" />
                            Play GA Pronunciation
                          </Button>
                          <Button className="w-full" variant="outline">
                            <Mic className="w-4 h-4 mr-2" />
                            Record Your Pronunciation
                          </Button>
                        </div>

                        <div className="bg-gray-50 p-3 rounded-lg">
                          <h4 className="font-semibold mb-2">Articulation</h4>
                          <p className="text-sm text-gray-600">
                            Place of articulation, manner, and voicing details would appear here
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">Select an IPA symbol to see details</p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Vowels Mastered</span>
                          <span>12/20</span>
                        </div>
                        <Progress value={60} />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Consonants Mastered</span>
                          <span>18/24</span>
                        </div>
                        <Progress value={75} />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Overall Progress</span>
                          <span>68%</span>
                        </div>
                        <Progress value={68} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Notation Converter */}
          <TabsContent value="converter">
            <NotationConverter />
          </TabsContent>

          {/* Language Modules */}
          <TabsContent value="languages">
            <LanguageModules />
          </TabsContent>

          {/* Articulation Visualizer */}
          <TabsContent value="visualizer">
            <ArticulationVisualizer selectedSound={selectedSound} />
          </TabsContent>

          {/* Practice Session */}
          <TabsContent value="practice">
            <PracticeSession />
          </TabsContent>

          {/* User Profile */}
          <TabsContent value="profile">
            <UserProfile />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
