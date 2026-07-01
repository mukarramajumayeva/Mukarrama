import { useState } from "react";
import { METHODOLOGY_QUIZZES } from "../data";
import { Check, X, HelpCircle, RefreshCw, Award, BookOpen, AlertCircle } from "lucide-react";

export default function TeacherQuiz() {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [answersHistory, setAnswersHistory] = useState<{ questionId: number; correct: boolean; chosenIdx: number }[]>([]);

  const currentQuestion = METHODOLOGY_QUIZZES[currentQuestionIdx];

  const handleOptionSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOptionIdx(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOptionIdx === null || isAnswered) return;
    
    const isCorrect = selectedOptionIdx === currentQuestion.correctAnswerIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setAnswersHistory((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        correct: isCorrect,
        chosenIdx: selectedOptionIdx,
      },
    ]);
    
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    setSelectedOptionIdx(null);
    setIsAnswered(false);
    if (currentQuestionIdx + 1 < METHODOLOGY_QUIZZES.length) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedOptionIdx(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
    setAnswersHistory([]);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Pedagogik Metodika Testi</h2>
        <p className="text-gray-500 text-sm max-w-xl mx-auto">
          Jahon va milliy tarbiya konsepsiyalari bo'yicha bilimlaringizni sinab ko'ring. Test yakunida har bir savolga tahliliy tushuntirish beriladi.
        </p>
      </div>

      {!quizFinished ? (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs text-gray-400 font-semibold font-mono">
              <span>SAVOL {currentQuestionIdx + 1} / {METHODOLOGY_QUIZZES.length}</span>
              <span>Kategoriya: {currentQuestion.category === "National" ? "Milliy Tarbiya" : currentQuestion.category === "Global" ? "Xalqaro Modellar" : "Pedagogika"}</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-500 h-full transition-all duration-300"
                style={{ width: `${((currentQuestionIdx + 1) / METHODOLOGY_QUIZZES.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">
              {currentQuestion.question}
            </h3>
          </div>

          {/* Options List */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              let btnStyle = "bg-gray-50 border-gray-100 text-gray-700 hover:bg-gray-100 hover:border-gray-200";
              
              if (selectedOptionIdx === idx && !isAnswered) {
                btnStyle = "bg-amber-50 border-amber-300 text-amber-900 ring-2 ring-amber-300/10";
              }

              if (isAnswered) {
                if (idx === currentQuestion.correctAnswerIndex) {
                  btnStyle = "bg-emerald-50 border-emerald-300 text-emerald-900 ring-2 ring-emerald-300/10";
                } else if (selectedOptionIdx === idx) {
                  btnStyle = "bg-rose-50 border-rose-200 text-rose-900";
                } else {
                  btnStyle = "bg-gray-50 border-gray-100 text-gray-400 opacity-60";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-xl border font-medium text-xs sm:text-sm flex items-center justify-between transition-all duration-200 ${btnStyle}`}
                >
                  <span>{option}</span>
                  {isAnswered && idx === currentQuestion.correctAnswerIndex && (
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  )}
                  {isAnswered && selectedOptionIdx === idx && idx !== currentQuestion.correctAnswerIndex && (
                    <X className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner */}
          {isAnswered && (
            <div className="p-5 bg-gradient-to-r from-amber-50 to-orange-50/20 rounded-2xl border border-amber-100 space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-900 text-xs uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-amber-600" />
                Metodik Tushuntirish:
              </div>
              <p className="text-xs text-gray-700 leading-relaxed text-justify">
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex justify-end pt-2">
            {!isAnswered ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOptionIdx === null}
                className="flex items-center gap-1.5 px-6 py-3 bg-gray-950 hover:bg-gray-800 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition"
              >
                Javobni tasdiqlash
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="flex items-center gap-1.5 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition"
              >
                {currentQuestionIdx + 1 === METHODOLOGY_QUIZZES.length ? "Testni yakunlash" : "Keyingi savol"}
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Summary Screen */
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-md space-y-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-tr from-amber-500 to-emerald-500 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-gray-900 text-xl">Test muvaffaqiyatli topshirildi!</h3>
            <p className="text-sm text-gray-500 max-w-sm mx-auto">
              Siz {METHODOLOGY_QUIZZES.length} ta savoldan <strong>{score} tasi</strong>ga to'g'ri javob berdingiz.
            </p>
          </div>

          {/* Score percentage bar */}
          <div className="max-w-md mx-auto p-5 border border-gray-100 rounded-2xl space-y-3 bg-gray-50/50">
            <div className="flex justify-between items-center text-xs text-gray-500 font-bold">
              <span>Sertifikatsiya darajasi:</span>
              <span className="font-mono">{Math.round((score / METHODOLOGY_QUIZZES.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full"
                style={{ width: `${(score / METHODOLOGY_QUIZZES.length) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 italic pt-1 text-center">
              {score === METHODOLOGY_QUIZZES.length
                ? "Ajoyib! Siz jahon va milliy tarbiya metodlarini o'zida to'liq mujassamlashtirgan mukammal ekspertsiz!"
                : score >= 3
                ? "Yaxshi ko'rsatkich. Siz milliy va xalqaro metodikalarni uyg'unlashtirishni juda yaxshi tushunasiz."
                : "Ushbu platforma va dars konstruktori materiallarini o'rganish sizga ko'proq metodik yordam beradi."}
            </p>
          </div>

          {/* answers history review */}
          <div className="text-left space-y-4 max-w-xl mx-auto border-t border-gray-100 pt-6">
            <h4 className="font-bold text-gray-800 text-sm flex items-center gap-1.5 uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-emerald-600" /> Savollar tahlili:
            </h4>
            <div className="space-y-4">
              {METHODOLOGY_QUIZZES.map((q, idx) => {
                const answer = answersHistory.find((a) => a.questionId === q.id);
                const isCorrect = answer?.correct;
                return (
                  <div key={q.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-xs font-bold text-gray-900 leading-relaxed">
                        {idx + 1}. {q.question}
                      </p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isCorrect ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                      }`}>
                        {isCorrect ? "To'g'ri" : "Xato"}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500">
                      <strong>To'g'ri javob:</strong> {q.options[q.correctAnswerIndex]}
                    </p>
                    <p className="text-[11px] text-amber-800 font-medium border-l-2 border-amber-400 pl-2">
                      {q.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleResetQuiz}
            className="flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-xs font-bold transition mx-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Testni qayta topshirish
          </button>
        </div>
      )}
    </div>
  );
}
