"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Target, Calendar, TrendingUp, BookOpen } from "lucide-react"

const achievements = [
  { id: 1, name: "Vowel Master", description: "Mastered all English vowels", icon: "🎯", earned: true },
  {
    id: 2,
    name: "Consonant Champion",
    description: "Perfect score on consonant identification",
    icon: "🏆",
    earned: true,
  },
  { id: 3, name: "Diphthong Dynamo", description: "Completed all diphthong exercises", icon: "⚡", earned: false },
  { id: 4, name: "Multi-lingual", description: "Practiced 3+ languages", icon: "🌍", earned: true },
  { id: 5, name: "Streak Master", description: "7-day practice streak", icon: "🔥", earned: false },
  { id: 6, name: "Perfectionist", description: "100% accuracy in a practice session", icon: "💎", earned: true },
]

const languageProgress = [
  { language: "English", progress: 85, sounds: 44, mastered: 37 },
  { language: "Spanish", progress: 60, sounds: 24, mastered: 14 },
  { language: "French", progress: 35, sounds: 37, mastered: 13 },
  { language: "German", progress: 20, sounds: 40, mastered: 8 },
]

const recentActivity = [
  { date: "2024-01-15", activity: "Completed Vowel Practice", score: "9/10", type: "practice" },
  { date: "2024-01-14", activity: "Learned French /y/ sound", score: "New", type: "learning" },
  { date: "2024-01-13", activity: "Minimal Pairs Challenge", score: "8/10", type: "challenge" },
  { date: "2024-01-12", activity: "IPA Chart Review", score: "Complete", type: "review" },
  { date: "2024-01-11", activity: "German Consonants", score: "7/10", type: "practice" },
]

const problemSounds = [
  { sound: "/θ/", language: "English", attempts: 15, accuracy: 65 },
  { sound: "/ʁ/", language: "French", attempts: 8, accuracy: 45 },
  { sound: "/ɯ/", language: "Korean", attempts: 12, accuracy: 55 },
  { sound: "/ɲ/", language: "Spanish", attempts: 6, accuracy: 70 },
]

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-6">
            <Avatar className="w-20 h-20">
              <AvatarImage src="/placeholder.svg?height=80&width=80" />
              <AvatarFallback className="text-2xl">PL</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">Phonetics Learner</h2>
              <p className="text-gray-600">Learning pronunciation since January 2024</p>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary">Intermediate</Badge>
                <Badge variant="outline">4 Languages</Badge>
                <Badge variant="outline">127 Sounds Learned</Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">Level 8</div>
              <div className="text-sm text-gray-600">2,340 XP</div>
              <Progress value={75} className="w-32 mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold">127</div>
                    <div className="text-sm text-gray-600">Sounds Mastered</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold">23</div>
                    <div className="text-sm text-gray-600">Days Streak</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="text-2xl font-bold">82%</div>
                    <div className="text-sm text-gray-600">Avg Accuracy</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-orange-600" />
                  <div>
                    <div className="text-2xl font-bold">4</div>
                    <div className="text-sm text-gray-600">Languages</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Problem Sounds</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {problemSounds.map((sound, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl font-mono">{sound.sound}</div>
                        <div>
                          <div className="font-medium">{sound.language}</div>
                          <div className="text-sm text-gray-600">{sound.attempts} attempts</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{sound.accuracy}%</div>
                        <Button size="sm" variant="outline">
                          Practice
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements
                    .filter((a) => a.earned)
                    .slice(0, 4)
                    .map((achievement) => (
                      <div key={achievement.id} className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div>
                          <div className="font-medium">{achievement.name}</div>
                          <div className="text-sm text-gray-600">{achievement.description}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Progress Tab */}
        <TabsContent value="progress" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Language Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {languageProgress.map((lang, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">{lang.language}</h3>
                      <span className="text-sm text-gray-600">
                        {lang.mastered}/{lang.sounds} sounds
                      </span>
                    </div>
                    <Progress value={lang.progress} />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{lang.progress}% complete</span>
                      <span>{lang.sounds - lang.mastered} remaining</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className={achievement.earned ? "border-green-200 bg-green-50" : "opacity-60"}>
                <CardContent className="pt-6">
                  <div className="text-center space-y-2">
                    <div className="text-4xl">{achievement.icon}</div>
                    <h3 className="font-semibold">{achievement.name}</h3>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                    {achievement.earned ? (
                      <Badge variant="default">Earned</Badge>
                    ) : (
                      <Badge variant="outline">Locked</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          activity.type === "practice"
                            ? "bg-blue-500"
                            : activity.type === "learning"
                              ? "bg-green-500"
                              : activity.type === "challenge"
                                ? "bg-purple-500"
                                : "bg-gray-500"
                        }`}
                      />
                      <div>
                        <div className="font-medium">{activity.activity}</div>
                        <div className="text-sm text-gray-600">{activity.date}</div>
                      </div>
                    </div>
                    <Badge variant="outline">{activity.score}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
