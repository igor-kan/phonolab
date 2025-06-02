"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Volume2, BookOpen, Target, Globe } from "lucide-react"

const languages = [
  {
    name: "English",
    dialects: ["Received Pronunciation (RP)", "General American (GA)", "Australian", "Irish", "Scottish", "Indian"],
    progress: 75,
    sounds: 44,
    difficulty: "Beginner",
  },
  {
    name: "Spanish",
    dialects: ["Castilian", "Mexican", "Argentinian", "Colombian"],
    progress: 45,
    sounds: 24,
    difficulty: "Beginner",
  },
  {
    name: "French",
    dialects: ["Standard French", "Quebecois", "Belgian"],
    progress: 30,
    sounds: 37,
    difficulty: "Intermediate",
  },
  {
    name: "German",
    dialects: ["Standard German", "Austrian", "Swiss"],
    progress: 20,
    sounds: 40,
    difficulty: "Intermediate",
  },
  {
    name: "Mandarin",
    dialects: ["Standard Mandarin", "Beijing", "Taiwan"],
    progress: 10,
    sounds: 25,
    difficulty: "Advanced",
  },
  {
    name: "Arabic",
    dialects: ["Modern Standard", "Egyptian", "Levantine", "Gulf"],
    progress: 5,
    sounds: 28,
    difficulty: "Advanced",
  },
]

const minimalPairs = [
  { word1: "bit", ipa1: "/bɪt/", word2: "beat", ipa2: "/biːt/", focus: "/ɪ/ vs /iː/" },
  { word1: "ship", ipa1: "/ʃɪp/", word2: "sheep", ipa2: "/ʃiːp/", focus: "/ɪ/ vs /iː/" },
  { word1: "cat", ipa1: "/kæt/", word2: "cut", ipa2: "/kʌt/", focus: "/æ/ vs /ʌ/" },
  { word1: "pen", ipa1: "/pen/", word2: "pan", ipa2: "/pæn/", focus: "/e/ vs /æ/" },
]

export default function LanguageModules() {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const [selectedDialect, setSelectedDialect] = useState<string | null>(null)

  const currentLanguage = languages.find((lang) => lang.name === selectedLanguage)

  return (
    <div className="space-y-6">
      {!selectedLanguage ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {languages.map((language) => (
            <Card key={language.name} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    {language.name}
                  </CardTitle>
                  <Badge
                    variant={
                      language.difficulty === "Beginner"
                        ? "default"
                        : language.difficulty === "Intermediate"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {language.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{language.progress}%</span>
                    </div>
                    <Progress value={language.progress} />
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>Sounds:</span>
                    <span>{language.sounds}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>Dialects:</span>
                    <span>{language.dialects.length}</span>
                  </div>

                  <Button className="w-full" onClick={() => setSelectedLanguage(language.name)}>
                    Start Learning
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" onClick={() => setSelectedLanguage(null)}>
              ← Back to Languages
            </Button>
            <h2 className="text-2xl font-bold">{selectedLanguage}</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Dialect Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Select Dialect</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {currentLanguage?.dialects.map((dialect) => (
                      <Button
                        key={dialect}
                        variant={selectedDialect === dialect ? "default" : "outline"}
                        onClick={() => setSelectedDialect(dialect)}
                        className="text-left justify-start"
                      >
                        {dialect}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Minimal Pairs Practice */}
              <Card>
                <CardHeader>
                  <CardTitle>Minimal Pairs Practice</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {minimalPairs.map((pair, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="font-semibold">{pair.word1}</div>
                            <div className="text-sm text-gray-600 font-mono">{pair.ipa1}</div>
                          </div>
                          <span className="text-gray-400">vs</span>
                          <div className="text-center">
                            <div className="font-semibold">{pair.word2}</div>
                            <div className="text-sm text-gray-600 font-mono">{pair.ipa2}</div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Volume2 className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            Practice
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Language Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Overall</span>
                        <span>{currentLanguage?.progress}%</span>
                      </div>
                      <Progress value={currentLanguage?.progress} />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold">{currentLanguage?.sounds}</div>
                        <div className="text-sm text-gray-600">Total Sounds</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">
                          {Math.floor(((currentLanguage?.progress || 0) * (currentLanguage?.sounds || 0)) / 100)}
                        </div>
                        <div className="text-sm text-gray-600">Mastered</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button className="w-full" variant="outline">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Phonology Overview
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Target className="w-4 h-4 mr-2" />
                      Common Mistakes
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Volume2 className="w-4 h-4 mr-2" />
                      Listen & Repeat
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Dialect Info */}
              {selectedDialect && (
                <Card>
                  <CardHeader>
                    <CardTitle>{selectedDialect}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600">
                        Learn the specific pronunciation patterns and phonological rules for {selectedDialect}.
                      </p>
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="font-semibold">Key Features:</span>
                          <ul className="list-disc list-inside mt-1 text-gray-600">
                            <li>Rhotic vs non-rhotic</li>
                            <li>Vowel system differences</li>
                            <li>Consonant variations</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
