"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Copy } from "lucide-react"

const notationData = [
  {
    ipa_rp: "/iː/",
    ipa_ga: "/i/",
    dsp: "ē",
    ced: "/i/",
    erfr: "ē",
    xsampa: "i",
    arpabet: "IY",
    kirshenbaum: "i",
    sampa: "i",
  },
  {
    ipa_rp: "/ɪ/",
    ipa_ga: "/ɪ/",
    dsp: "i",
    ced: "/ɪ/",
    erfr: "ĭ",
    xsampa: "I",
    arpabet: "IH",
    kirshenbaum: "i",
    sampa: "I",
  },
  {
    ipa_rp: "/e/",
    ipa_ga: "/e/",
    dsp: "ā",
    ced: "/e/",
    erfr: "ā",
    xsampa: "e",
    arpabet: "EY",
    kirshenbaum: "e",
    sampa: "e",
  },
  {
    ipa_rp: "/ɛ/",
    ipa_ga: "/ɛ/",
    dsp: "e",
    ced: "/e/",
    erfr: "ĕ",
    xsampa: "E",
    arpabet: "EH",
    kirshenbaum: "E",
    sampa: "E",
  },
  {
    ipa_rp: "/æ/",
    ipa_ga: "/æ/",
    dsp: "a",
    ced: "/æ/",
    erfr: "ă",
    xsampa: "{",
    arpabet: "AE",
    kirshenbaum: "ae",
    sampa: "AE",
  },
  {
    ipa_rp: "/ʌ/",
    ipa_ga: "/ʌ/",
    dsp: "u",
    ced: "/ʌ/",
    erfr: "ŭ",
    xsampa: "V",
    arpabet: "AH",
    kirshenbaum: "v",
    sampa: "V",
  },
  {
    ipa_rp: "/ɑː/",
    ipa_ga: "/ɑ/",
    dsp: "o",
    ced: "/ɑ/",
    erfr: "ä",
    xsampa: "A",
    arpabet: "AA",
    kirshenbaum: "a",
    sampa: "A",
  },
  {
    ipa_rp: "/ɒ/",
    ipa_ga: "/ɑ/",
    dsp: "o",
    ced: "/ɒ/",
    erfr: "ô",
    xsampa: "Q",
    arpabet: "AA",
    kirshenbaum: "o",
    sampa: "Q",
  },
  {
    ipa_rp: "/ɔː/",
    ipa_ga: "/ɔ/",
    dsp: "ô",
    ced: "/ɔ/",
    erfr: "ô",
    xsampa: "O",
    arpabet: "AO",
    kirshenbaum: "c",
    sampa: "O",
  },
  {
    ipa_rp: "/ə/",
    ipa_ga: "/ə/",
    dsp: "ə",
    ced: "/ə/",
    erfr: "ə",
    xsampa: "@",
    arpabet: "AH",
    kirshenbaum: "uh",
    sampa: "@",
  },
  {
    ipa_rp: "/uː/",
    ipa_ga: "/u/",
    dsp: "ū",
    ced: "/u/",
    erfr: "ū",
    xsampa: "u",
    arpabet: "UW",
    kirshenbaum: "u",
    sampa: "u",
  },
  {
    ipa_rp: "/ʊ/",
    ipa_ga: "/ʊ/",
    dsp: "oo",
    ced: "/ʊ/",
    erfr: "˘",
    xsampa: "U",
    arpabet: "UH",
    kirshenbaum: "U",
    sampa: "U",
  },
  {
    ipa_rp: "/aɪ/",
    ipa_ga: "/aɪ/",
    dsp: "ī",
    ced: "/aɪ/",
    erfr: "ī",
    xsampa: "aI",
    arpabet: "AY",
    kirshenbaum: "ai",
    sampa: "ai",
  },
  {
    ipa_rp: "/aʊ/",
    ipa_ga: "/aʊ/",
    dsp: "ou",
    ced: "/aʊ/",
    erfr: "ou",
    xsampa: "aU",
    arpabet: "AW",
    kirshenbaum: "au",
    sampa: "aw",
  },
  {
    ipa_rp: "/ɔɪ/",
    ipa_ga: "/ɔɪ/",
    dsp: "oi",
    ced: "/ɔɪ/",
    erfr: "oi",
    xsampa: "OI",
    arpabet: "OY",
    kirshenbaum: "oi",
    sampa: "oy",
  },
  {
    ipa_rp: "/əʊ/",
    ipa_ga: "/oʊ/",
    dsp: "ō",
    ced: "/əʊ/",
    erfr: "ō",
    xsampa: "@U",
    arpabet: "OW",
    kirshenbaum: "ou",
    sampa: "oU",
  },
  {
    ipa_rp: "/eɪ/",
    ipa_ga: "/eɪ/",
    dsp: "ā",
    ced: "/eɪ/",
    erfr: "ā",
    xsampa: "eI",
    arpabet: "EY",
    kirshenbaum: "ei",
    sampa: "ei",
  },
]

export default function NotationConverter() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedWord, setSelectedWord] = useState("")

  const filteredData = notationData.filter((row) =>
    Object.values(row).some((value) => value.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Cross-Notation Converter</CardTitle>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by IPA symbol, notation, or word..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Button variant="outline">
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>IPA (RP)</TableHead>
                  <TableHead>IPA (GA)</TableHead>
                  <TableHead>DSP (M-W)</TableHead>
                  <TableHead>CED Style</TableHead>
                  <TableHead>ERFR</TableHead>
                  <TableHead>X-SAMPA</TableHead>
                  <TableHead>ARPAbet</TableHead>
                  <TableHead>Kirshenbaum</TableHead>
                  <TableHead>SAMPA</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-mono">{row.ipa_rp}</TableCell>
                    <TableCell className="font-mono">{row.ipa_ga}</TableCell>
                    <TableCell className="font-mono">{row.dsp}</TableCell>
                    <TableCell className="font-mono">{row.ced}</TableCell>
                    <TableCell className="font-mono">{row.erfr}</TableCell>
                    <TableCell className="font-mono">{row.xsampa}</TableCell>
                    <TableCell className="font-mono">{row.arpabet}</TableCell>
                    <TableCell className="font-mono">{row.kirshenbaum}</TableCell>
                    <TableCell className="font-mono">{row.sampa}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" onClick={() => copyToClipboard(row.ipa_rp)}>
                        <Copy className="w-3 h-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Word Lookup</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                placeholder="Enter a word to see all notations..."
                value={selectedWord}
                onChange={(e) => setSelectedWord(e.target.value)}
              />

              {selectedWord && (
                <div className="space-y-3">
                  <h4 className="font-semibold">Transcriptions for "{selectedWord}":</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Badge variant="outline">IPA (RP): /wɜːd/</Badge>
                    <Badge variant="outline">IPA (GA): /wɝd/</Badge>
                    <Badge variant="outline">ARPAbet: W ER D</Badge>
                    <Badge variant="outline">X-SAMPA: w3:d</Badge>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notation Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold">IPA</h4>
                <p className="text-sm text-gray-600">International Phonetic Alphabet - universal standard</p>
              </div>
              <div>
                <h4 className="font-semibold">ARPAbet</h4>
                <p className="text-sm text-gray-600">ASCII-based phonetic notation for American English</p>
              </div>
              <div>
                <h4 className="font-semibold">X-SAMPA</h4>
                <p className="text-sm text-gray-600">Extended Speech Assessment Methods Phonetic Alphabet</p>
              </div>
              <div>
                <h4 className="font-semibold">DSP (M-W)</h4>
                <p className="text-sm text-gray-600">Merriam-Webster dictionary pronunciation system</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
