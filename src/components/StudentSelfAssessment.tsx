import { useState } from "react";
import { STUDENT_EVALUATION_QUESTIONS, SKILL_METADATA } from "../data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Award, Compass, RefreshCw, CheckCircle, ArrowRight, HelpCircle } from "lucide-react";

export default function StudentSelfAssessment() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedScore, setSelectedScore] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = STUDENT_EVALUATION_QUESTIONS[currentIdx];

  const handleOptionSelect = (score: number) => {
    setSelectedScore(score);
  };

  const handleNext = () => {
    if (selectedScore === null) return;

    // Save answer
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: selectedScore,
    }));

    setSelectedScore(null);

    if (currentIdx + 1 < STUDENT_EVALUATION_QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const calculateResults = () => {
    const categories = ["Tanqidiy fikrlash", "Ijodkorlik", "Hamkorlik", "Muloqot"];
    const results: Record<string, { total: number; count: number }> = {};

    categories.forEach((cat) => {
      results[cat] = { total: 0, count: 0 };
    });

    STUDENT_EVALUATION_QUESTIONS.forEach((q) => {
      const answerScore = answers[q.id] || 0;
      if (results[q.category]) {
        results[q.category].total += answerScore;
        results[q.category].count += 1;
      }
    });

    return categories.map((cat) => {
      const avg = results[cat].count > 0 ? Math.round(results[cat].total / results[cat].count) : 0;
      return {
        name: cat,
        score: avg,
        fullMark: 100,
        description: SKILL_METADATA[cat] || "",
      };
    });
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedScore(null);
    setAnswers({});
    setIsFinished(false);
  };

  const resultsData = isFinished ? calculateResults() : [];

  const getScoreLabel = (score: number) => {
    if (score >= 80) return { label: "YUKSAK", color: "text-emerald-700 bg-emerald-50 border-emerald-100", tip: "Sizda ushbu ko'nikma ajoyib rivojlangan! Milliy qadriyatlar va andisha tamoyillariga to'liq amal qilasiz." };
    if (score >= 50) return { label: "O'RTACHA", color: "text-amber-700 bg-amber-50 border-amber-100", tip: "Yaxshi ko'rsatkich. Ko'nikmani darslarda va hayotda muntazam qo'llab, yanada charxlashingiz mumkin." };
    return { label: "RIVOJLANISHI KERAK", color: "text-rose-700 bg-rose-50 border-rose-100", tip: "Ushbu ko'nikmaga jiddiyroq e'tibor berish lozim. Avloniyning 'Fikr tarbiyasi' yoki 'Odob-axloq' hikmatlarini o'qish foydali." };
  };

  // Recharts colors
  const colors = ["#2563eb", "#d97706", "#10b981", "#8b5cf6"];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">O'quvchilar uchun XXI Asr Ko'nikmalari Testi</h2>
        <p className="text-gray-500 text-sm max-w-xl mx-auto">
          Quyidagi savollarga samimiy javob bering. Test yakunida 4C (Tanqidiy fikrlash, Ijodkorlik, Hamkorlik, Muloqot) ko'nikmalari darajangiz vizual tahlil qilinadi.
        </p>
      </div>

      {!isFinished ? (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs text-gray-400 font-bold font-mono">
              <span>SAVOL {currentIdx + 1} / {STUDENT_EVALUATION_QUESTIONS.length}</span>
              <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md text-[10px]">
                {currentQuestion.category.toUpperCase()}
              </span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / STUDENT_EVALUATION_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question text */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">
              {currentQuestion.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedScore === option.score;
              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(option.score)}
                  className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-medium flex items-center gap-3 transition-all ${
                    isSelected
                      ? "bg-emerald-50/70 border-emerald-400 text-emerald-900 ring-2 ring-emerald-400/10"
                      : "bg-gray-50 border-gray-100 text-gray-700 hover:bg-gray-100 hover:border-gray-200"
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center border text-xs font-semibold ${
                    isSelected ? "bg-emerald-500 text-white border-emerald-500" : "bg-white text-gray-400 border-gray-200"
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{option.text}</span>
                </button>
              );
            })}
          </div>

          {/* Action */}
          <div className="flex justify-end pt-2">
            <button
              onClick={handleNext}
              disabled={selectedScore === null}
              className="flex items-center gap-1.5 px-6 py-3 bg-gray-900 hover:bg-gray-800 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition"
            >
              {currentIdx + 1 === STUDENT_EVALUATION_QUESTIONS.length ? "Natijalarni ko'rish" : "Keyingi savol"} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* Results visual screen */
        <div className="space-y-8">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-md space-y-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-tr from-emerald-500 to-teal-500 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
              <Compass className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-gray-900 text-2xl">Sizning XXI asr ko'nikmalar profilingiz</h3>
              <p className="text-sm text-gray-500 max-w-sm mx-auto">
                Quyidagi grafik sizning 4C ko'nikmalar darajangizni milliy andisha hamda global standartlar uyg'unligida aks ettiradi.
              </p>
            </div>

            {/* Recharts BarChart Visualization */}
            <div className="h-64 sm:h-80 w-full bg-gray-50/50 p-4 rounded-2xl border border-gray-100 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={resultsData}
                  margin={{ top: 20, right: 30, left: -10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="name" tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    cursor={{ fill: "rgba(243, 244, 246, 0.4)" }}
                    contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb", fontSize: "11px", fontWeight: "bold" }}
                  />
                  <Bar dataKey="score" radius={[8, 8, 0, 0]} barSize={40}>
                    {resultsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Explanations and tips for each skill */}
            <div className="text-left space-y-4 max-w-2xl mx-auto border-t border-gray-100 pt-6">
              <h4 className="font-bold text-gray-800 text-sm flex items-center gap-1.5 uppercase tracking-wider">
                <CheckCircle className="w-4 h-4 text-emerald-600" /> Shaxsiy ko'nikmalar tahlili va tavsiyalar:
              </h4>
              
              <div className="space-y-4">
                {resultsData.map((item, index) => {
                  const assessment = getScoreLabel(item.score);
                  return (
                    <div key={index} className="p-5 bg-gray-50 rounded-2xl border border-gray-100/70 space-y-3">
                      <div className="flex flex-wrap justify-between items-center gap-2">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: colors[index % colors.length] }}
                          />
                          <span className="font-bold text-gray-900 text-sm">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-mono font-bold">
                          <span className="text-gray-500">Ball: {item.score}/100</span>
                          <span className={`px-2 py-0.5 rounded-md text-[10px] ${assessment.color}`}>
                            {assessment.label}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-xs text-gray-500 leading-normal">
                        {item.description}
                      </p>

                      <p className="text-xs text-gray-700 leading-relaxed font-medium bg-white p-3 rounded-xl border border-gray-100">
                        <strong>Tavsiya:</strong> {assessment.tip}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-xs font-bold transition mx-auto"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Testni boshidan boshlash
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
