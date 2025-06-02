"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Volume2, Mic, CheckCircle, XCircle, Target } from "lucide-react"

const practiceTypes = [
  { id: "listen-identify", name: "Listen & Identify", description: "Hear a sound and identify the IPA symbol" },
  { id: "speak-match", name: "Speak & Match", description: "Pronounce a sound and get feedback" },
  { id: "transcribe", name: "Transcribe Words", description: "Write the IPA transcription for words" },
  { id: "minimal-pairs", name: "Minimal Pairs", description: "Distinguish between similar sounds" },
]

const sampleQuestions = {
  "listen-identify": [
    {
      id: 1,
      audio: "/i/",
      options: ["/i/", "/ɪ/", "/e/", "/ɛ/"],
      correct: "/i/",
      explanation: 'This is the close front unrounded vowel /i/ as in "see"',
    },
    {
      id: 2,
      audio: "/θ/",
      options: ["/θ/", "/ð/", "/s/", "/f/"],
      correct: "/θ/",
      explanation: 'This is the voiceless dental fricative /θ/ as in "think"',
    },
  ],
  "minimal-pairs": [
    {
      id: 1,
      word1: "ship",
      word2: "sheep",
      ipa1: "/ʃɪp/",
      ipa2: "/ʃiːp/",
      question: "Which word did you hear?",
      correct: "ship",
    },
  ],
}

export default function PracticeSession() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [totalQuestions] = useState(10)

  const handleStartPractice = (type: string) => {
    setSelectedType(type)
    setCurrentQuestion(0)
    setScore(0)
    setShowResult(false)
    setSelectedAnswer("")
  }

  const handleSubmitAnswer = () => {
    const questions = sampleQuestions[selectedType as keyof typeof sampleQuestions] || []
    const current = questions[currentQuestion % questions.length]

    if (selectedAnswer === current.correct) {
      setScore(score + 1)
    }

    setShowResult(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer("")
      setShowResult(false)
    } else {
      // End of practice session
      setSelectedType(null)
    }
  }

  const getCurrentQuestion = () => {
    const questions = sampleQuestions[selectedType as keyof typeof sampleQuestions] || []
    return questions[currentQuestion % questions.length]
  }

  if (!selectedType) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Choose Practice Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {practiceTypes.map((type) => (
                <Card key={type.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{type.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{type.description}</p>
                    <Button className="w-full" onClick={() => handleStartPractice(type.id)}>
                      Start Practice
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Listen & Identify</span>
                  <Badge variant="outline">85%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Minimal Pairs</span>
                  <Badge variant="outline">72%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Transcription</span>
                  <Badge variant="outline">68%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommended Focus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-orange-500" />
                  <span className="text-sm">Vowel distinctions (/ɪ/ vs /iː/)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-orange-500" />
                  <span className="text-sm">Dental fricatives (/θ/ vs /ð/)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-orange-500" />
                  <span className="text-sm">Diphthong recognition</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const question = getCurrentQuestion()
  const progress = ((currentQuestion + 1) / totalQuestions) * 100

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{practiceTypes.find((t) => t.id === selectedType)?.name}</CardTitle>
            <Button variant="outline" onClick={() => setSelectedType(null)}>
              Exit Practice
            </Button>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>
                Question {currentQuestion + 1} of {totalQuestions}
              </span>
              <span>
                Score: {score}/{currentQuestion + (showResult ? 1 : 0)}
              </span>
            </div>
            <Progress value={progress} />
          </div>
        </CardHeader>
      </Card>

      {/* Question Card */}
      <Card>
        <CardHeader>
          <CardTitle>
            {selectedType === "listen-identify" && "Listen to the sound and select the correct IPA symbol"}
            {selectedType === "minimal-pairs" && "Listen and identify which word you hear"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Audio Player */}
            <div className="text-center">
              <Button size="lg" className="mb-4">
                <Volume2 className="w-6 h-6 mr-2" />
                Play Audio
              </Button>
              {selectedType === "listen-identify" && <div className="text-4xl font-mono">[?]</div>}
            </div>

            {/* Answer Options */}
            {selectedType === "listen-identify" && question && (
              <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                <div className="grid grid-cols-2 gap-4">
                  {question.options.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="text-2xl font-mono cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            )}

            {selectedType === "minimal-pairs" && question && (
              <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={question.word1} id={question.word1} />
                    <Label htmlFor={question.word1} className="cursor-pointer">
                      <div className="flex items-center gap-4">
                        <span className="text-xl font-semibold">{question.word1}</span>
                        <span className="text-sm font-mono text-gray-600">{question.ipa1}</span>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={question.word2} id={question.word2} />
                    <Label htmlFor={question.word2} className="cursor-pointer">
                      <div className="flex items-center gap-4">
                        <span className="text-xl font-semibold">{question.word2}</span>
                        <span className="text-sm font-mono text-gray-600">{question.ipa2}</span>
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            )}

            {/* Submit/Next Button */}
            <div className="text-center">
              {!showResult ? (
                <Button onClick={handleSubmitAnswer} disabled={!selectedAnswer} size="lg">
                  Submit Answer
                </Button>
              ) : (
                <div className="space-y-4">
                  {/* Result Display */}
                  <div className="text-center">
                    {selectedAnswer === question.correct ? (
                      <div className="flex items-center justify-center gap-2 text-green-600">
                        <CheckCircle className="w-8 h-8" />
                        <span className="text-xl font-semibold">Correct!</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2 text-red-600">
                        <XCircle className="w-8 h-8" />
                        <span className="text-xl font-semibold">Incorrect</span>
                      </div>
                    )}
                  </div>

                  {/* Explanation */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm">
                      <strong>Correct answer:</strong> {question.correct}
                    </p>
                    <p className="text-sm mt-2">{question.explanation}</p>
                  </div>

                  {/* Next Button */}
                  <Button onClick={handleNextQuestion} size="lg">
                    {currentQuestion < totalQuestions - 1 ? "Next Question" : "Finish Practice"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recording Section for Speech Practice */}
      {selectedType === "speak-match" && (
        <Card>
          <CardHeader>
            <CardTitle>Record Your Pronunciation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="text-6xl font-mono mb-4">/θ/</div>
              <Button size="lg" variant="outline">
                <Mic className="w-6 h-6 mr-2" />
                Start Recording
              </Button>
              <p className="text-sm text-gray-600">Say the sound clearly and we'll analyze your pronunciation</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
