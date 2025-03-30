"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shuffle } from "lucide-react"
import { Button } from "@/components/ui/button"

const emojis = [
  // Faces and Emotions
  "😀", "😎", "🤠", "🤓", "😴", "🥳", "🤪", "🧐", "🤯", "🥸", "😇", "🤩", "🥺", "😈", "🤡", "😊", "🥰", "😂", "🤣", "😅",
  
  // Animals
  "🦊", "🐯", "🦁", "🐼", "🐨", "🦘", "🦒", "🦩", "🦄", "🐬", "🦋", "🦜", "🦚", "🦉", "🐸", "🐙", "🦈", "🦭", "🦔", "🦦",
  
  // Food and Drinks
  "🍕", "🌮", "🍦", "🍔", "🥑", "🍜", "🍩", "🧁", "🥤", "🍪", "🍫", "🥨", "🌯", "🥝", "🍓", "🍍", "🥭", "🌶️", "🥐", "🧇",
  
  // Nature and Weather
  "🌈", "⭐", "🌙", "🌺", "🌸", "🍀", "🌵", "🌴", "❄️", "🔥", "🌊", "🌞", "⛈️", "🌿", "🍄", "🌹", "🪷", "🌻", "🍁", "🌳",
  
  // Activities and Sports
  "🎮", "🎨", "🎭", "🎪", "🎯", "🎲", "🎸", "⚽", "🎱", "🏈", "🎾", "🏹", "⛸️", "🎪", "🎭", "🏂", "🏄", "🚴", "🎣", "🎻",
  
  // Travel and Places
  "🚀", "✈️", "🏖️", "🗽", "🎡", "🎢", "🏰", "⛰️", "🌋", "🗺️", "🎪", "🌉", "🏝️", "🚂", "⛴️", "🎪", "🗼", "🏟️", "🎪", "🏔️",
  
  // Fantasy and Magic
  "🧙‍♂️", "🧚‍♀️", "🔮", "⚡", "✨", "🌟", "🦹‍♀️", "🧝‍♀️", "🐲", "🧞‍♂️", "🎭", "🪄", "🧿", "👻", "🎪", "🧜‍♀️", "🧛‍♂️", "🧌", "🧟‍♂️", "🪬",
  
  // Objects and Technology
  "📱", "💻", "🎧", "📸", "⌚", "💡", "🔋", "📦", "🎁", "🎨", "🎪", "🎭", "🎪", "📺", "🕹️", "⌨️", "🖨️", "📻", "🔍", "💾",
  
  // Space and Science
  "🚀", "🛸", "🛰️", "🌍", "🌠", "☄️", "🌌", "🔭", "⚛️", "🧬", "🦠", "🧪", "🧫", "🔬", "📡", "🌡️", "⚗️", "🧮", "🎇", "💫",
  
  // Music and Arts
  "🎼", "🎵", "🎸", "🎺", "🎻", "🥁", "🎹", "🎷", "🎨", "🎭", "🎪", "🎬", "🎤", "🎧", "🪘", "🪗", "🪕", "📯", "🎻", "🎺"
];

export default function EmojiMemoryMatch() {
  const [cards, setCards] = useState([])
  const [flippedIndices, setFlippedIndices] = useState([])
  const [matchedPairs, setMatchedPairs] = useState([])
  const [moves, setMoves] = useState(0)
  const [isWon, setIsWon] = useState(false)

  useEffect(() => {
    shuffleCards()
  }, [])

  useEffect(() => {
    if (matchedPairs.length === 16) { // Changed from emojis.length to 16 (8 pairs)
      setIsWon(true);
    }
  }, [matchedPairs])

  const shuffleCards = () => {
    const selectedEmojis = emojis
      .sort(() => Math.random() - 0.5) // Shuffle all emojis
      .slice(0, 8); // Select first 8 emojis
    const shuffled = [...selectedEmojis, ...selectedEmojis].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedIndices([]);
    setMatchedPairs([]);
    setMoves(0);
    setIsWon(false);
  }

  const handleCardClick = (index) => {
    if (flippedIndices.length === 2 || flippedIndices.includes(index) || matchedPairs.includes(index)) return

    const newFlippedIndices = [...flippedIndices, index]
    setFlippedIndices(newFlippedIndices)

    if (newFlippedIndices.length === 2) {
      setMoves((prev) => prev + 1)
      if (cards[newFlippedIndices[0]] === cards[newFlippedIndices[1]]) {
        setMatchedPairs((prev) => [...prev, ...newFlippedIndices])
        setFlippedIndices([])
      } else {
        setTimeout(() => setFlippedIndices([]), 1000)
      }
    }
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-indigo-800 mb-8">Emoji Memory Match</h1>
      <div
        className="bg-white/30 backdrop-blur-lg rounded-xl p-8 shadow-lg border border-white/20">
        <div className="grid grid-cols-4 gap-4 mb-8">
          {cards.map((emoji, index) => (
            <Card
              key={index}
              emoji={emoji}
              isFlipped={flippedIndices.includes(index) || matchedPairs.includes(index)}
              onClick={() => handleCardClick(index)} />
          ))}
        </div>
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold text-indigo-800">Moves: {moves}</p>
          <Button 
            onClick={shuffleCards} 
            className="flex items-center gap-2 bg-black hover:bg-black/90 text-white shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 rounded-lg px-4 py-2"
          >
            <Shuffle className="w-4 h-4" />
            Shuffle
          </Button>
        </div>
      </div>
      <AnimatePresence>{isWon && <WinningScreen moves={moves} onRestart={shuffleCards} />}</AnimatePresence>
    </div>
  );
}

function Card({
  emoji,
  isFlipped,
  onClick
}) {
  return (
    <motion.div
      className="w-16 h-16 bg-white/60 backdrop-blur-sm rounded-lg shadow-lg cursor-pointer flex items-center justify-center text-3xl hover:bg-white/70 transition-colors"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 0.3 }}>
      <div className="absolute backface-hidden">{isFlipped ? emoji : "?"}</div>
    </motion.div>
  );
}

function WinningScreen({
  moves,
  onRestart
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center">
      <div className="bg-black/90 backdrop-blur-sm rounded-xl p-8 text-center shadow-2xl border border-white/10">
        <h2 className="text-3xl font-bold mb-4 text-white">Congratulations!</h2>
        <p className="text-xl mb-6 text-gray-200">You won in {moves} moves!</p>
        <Button
          onClick={onRestart}
          className="bg-white hover:bg-white/90 text-black shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 rounded-lg px-6 py-3 text-lg font-semibold"
        >
          Play Again
        </Button>
      </div>
    </motion.div>
  );
}

