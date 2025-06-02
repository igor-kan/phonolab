"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface IPAChartProps {
  onSoundSelect: (sound: string) => void
  selectedSound: string | null
}

const vowels = [
  { symbol: "i", position: "close front unrounded" },
  { symbol: "y", position: "close front rounded" },
  { symbol: "ɨ", position: "close central unrounded" },
  { symbol: "ʉ", position: "close central rounded" },
  { symbol: "ɯ", position: "close back unrounded" },
  { symbol: "u", position: "close back rounded" },
  { symbol: "ɪ", position: "near-close front unrounded" },
  { symbol: "ʏ", position: "near-close front rounded" },
  { symbol: "ʊ", position: "near-close back rounded" },
  { symbol: "e", position: "close-mid front unrounded" },
  { symbol: "ø", position: "close-mid front rounded" },
  { symbol: "ɘ", position: "close-mid central unrounded" },
  { symbol: "ɵ", position: "close-mid central rounded" },
  { symbol: "ɤ", position: "close-mid back unrounded" },
  { symbol: "o", position: "close-mid back rounded" },
  { symbol: "ə", position: "mid central" },
  { symbol: "ɛ", position: "open-mid front unrounded" },
  { symbol: "œ", position: "open-mid front rounded" },
  { symbol: "ɜ", position: "open-mid central unrounded" },
  { symbol: "ɞ", position: "open-mid central rounded" },
  { symbol: "ʌ", position: "open-mid back unrounded" },
  { symbol: "ɔ", position: "open-mid back rounded" },
  { symbol: "æ", position: "near-open front unrounded" },
  { symbol: "ɐ", position: "near-open central" },
  { symbol: "a", position: "open front unrounded" },
  { symbol: "ɶ", position: "open front rounded" },
  { symbol: "ä", position: "open central unrounded" },
  { symbol: "ɑ", position: "open back unrounded" },
  { symbol: "ɒ", position: "open back rounded" },
]

const consonants = [
  { symbol: "p", type: "plosive", place: "bilabial", voice: "voiceless" },
  { symbol: "b", type: "plosive", place: "bilabial", voice: "voiced" },
  { symbol: "t", type: "plosive", place: "alveolar", voice: "voiceless" },
  { symbol: "d", type: "plosive", place: "alveolar", voice: "voiced" },
  { symbol: "k", type: "plosive", place: "velar", voice: "voiceless" },
  { symbol: "g", type: "plosive", place: "velar", voice: "voiced" },
  { symbol: "f", type: "fricative", place: "labiodental", voice: "voiceless" },
  { symbol: "v", type: "fricative", place: "labiodental", voice: "voiced" },
  { symbol: "θ", type: "fricative", place: "dental", voice: "voiceless" },
  { symbol: "ð", type: "fricative", place: "dental", voice: "voiced" },
  { symbol: "s", type: "fricative", place: "alveolar", voice: "voiceless" },
  { symbol: "z", type: "fricative", place: "alveolar", voice: "voiced" },
  { symbol: "ʃ", type: "fricative", place: "postalveolar", voice: "voiceless" },
  { symbol: "ʒ", type: "fricative", place: "postalveolar", voice: "voiced" },
  { symbol: "h", type: "fricative", place: "glottal", voice: "voiceless" },
  { symbol: "m", type: "nasal", place: "bilabial", voice: "voiced" },
  { symbol: "n", type: "nasal", place: "alveolar", voice: "voiced" },
  { symbol: "ŋ", type: "nasal", place: "velar", voice: "voiced" },
  { symbol: "l", type: "lateral", place: "alveolar", voice: "voiced" },
  { symbol: "ɹ", type: "approximant", place: "alveolar", voice: "voiced" },
  { symbol: "j", type: "approximant", place: "palatal", voice: "voiced" },
  { symbol: "w", type: "approximant", place: "labial-velar", voice: "voiced" },
  { symbol: "tʃ", type: "affricate", place: "postalveolar", voice: "voiceless" },
  { symbol: "dʒ", type: "affricate", place: "postalveolar", voice: "voiced" },
]

const diphthongs = [
  { symbol: "aɪ", example: "price" },
  { symbol: "aʊ", example: "mouth" },
  { symbol: "eɪ", example: "face" },
  { symbol: "oʊ", example: "goat" },
  { symbol: "ɔɪ", example: "choice" },
  { symbol: "ɪə", example: "near" },
  { symbol: "eə", example: "square" },
  { symbol: "ʊə", example: "cure" },
]

export default function IPAChart({ onSoundSelect, selectedSound }: IPAChartProps) {
  return (
    <div className="space-y-6">
      {/* Vowels */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Vowels
            <Badge variant="outline">{vowels.length} sounds</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
            {vowels.map((vowel) => (
              <Button
                key={vowel.symbol}
                variant={selectedSound === vowel.symbol ? "default" : "outline"}
                className="aspect-square text-lg font-mono"
                onClick={() => onSoundSelect(vowel.symbol)}
                title={vowel.position}
              >
                {vowel.symbol}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Consonants */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Consonants
            <Badge variant="outline">{consonants.length} sounds</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
            {consonants.map((consonant) => (
              <Button
                key={consonant.symbol}
                variant={selectedSound === consonant.symbol ? "default" : "outline"}
                className="aspect-square text-lg font-mono"
                onClick={() => onSoundSelect(consonant.symbol)}
                title={`${consonant.voice} ${consonant.place} ${consonant.type}`}
              >
                {consonant.symbol}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Diphthongs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Diphthongs
            <Badge variant="outline">{diphthongs.length} sounds</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
            {diphthongs.map((diphthong) => (
              <Button
                key={diphthong.symbol}
                variant={selectedSound === diphthong.symbol ? "default" : "outline"}
                className="aspect-square text-sm font-mono"
                onClick={() => onSoundSelect(diphthong.symbol)}
                title={`as in "${diphthong.example}"`}
              >
                {diphthong.symbol}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
