import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Flashcard from "./Flashcard";
import { useNavigate } from "react-router-dom";

export default function FlashcardDeck({ cards }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();

  const goToNext = () => {
    if (currentIndex < cards.length - 1) {
      setIsFlipped(false);
      setCurrentIndex(currentIndex + 1);
    } else {
      // Navigate to Thank You page
      navigate("/thank-you");
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          className={`p-2 rounded-full ${
            currentIndex === 0
              ? "text-gray-400 cursor-not-allowed"
              : "text-indigo-600 hover:bg-indigo-100"
          }`}
        >
          <ChevronLeft size={24} />
        </button>

        <span className="text-indigo-600 font-medium">
          {currentIndex + 1} / {cards.length}
        </span>

        <button
          onClick={goToNext}
          // disabled={currentIndex === cards.length - 1}
          className={`p-2 rounded-full ${
            currentIndex === cards.length - 1
              ? "text-gray-400"
              : "text-indigo-600 hover:bg-indigo-100"
          }`}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <Flashcard
            card={cards[currentIndex]}
            isFlipped={isFlipped}
            onFlip={() => setIsFlipped(!isFlipped)}
          />
        </motion.div>
      </AnimatePresence>

      <div className="mt-8">
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
