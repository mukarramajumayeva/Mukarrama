import { useState, useEffect, FormEvent } from "react";
import { CaseStudy, CaseFeedback } from "../types";
import { Brain, Sparkles, Send, RefreshCw, CheckCircle, AlertTriangle, HelpCircle, Award } from "lucide-react";

export default function ScenarioSimulator() {
  const [gradeCategory, setGradeCategory] = useState("O'rta sinflar (5-9 sinf)");
  const [skillFocus, setSkillFocus] = useState("Muloqot va Hamkorlik");
  const [theme, setTheme] = useState("Axloq va o'zaro nizolar");

  const [currentCase, setCurrentCase] = useState<CaseStudy | null>(null);
  const [isLoadingCase, setIsLoadingCase] = useState(false);
  const [caseError, setCaseError] = useState<string | null>(null);

  const [userSolution, setUserSolution] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationError, setEvaluationError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<CaseFeedback | null>(null);

  const gradeCategories = [
    "Boshlang'ich sinflar (1-4 sinf)",
    "O'rta sinflar (5-9 sinf)",
    "Yuqori sinflar (10-11 sinf)",
  ];

  const skillFocuses = [
    "Muloqot va Hamkorlik (4C - Comm & Collab)",
    "Tanqidiy fikrlash va Muammoni hal qilish",
    "Ijodiy yondashuv va Kreativlik",
  ];

  const themes = [
    "Axloq va o'zaro nizolar (Odob, andisha, hurmat)",
    "Kiber-bullying va raqamli madaniyat",
    "Jamoaviy jipslik yetishmasligi va darsdan chetlashish",
    "Ota-onalar bilan hamkorlik muammolari",
  ];

  // Load an initial case on mount
  useEffect(() => {
    generateInitialCase();
  }, []);

  const generateInitialCase = async () => {
    setIsLoadingCase(true);
    setCaseError(null);
    setFeedback(null);
    setUserSolution("");

    try {
      const response = await fetch("/api/generate-case", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          grade: gradeCategory,
          skillFocus,
          theme,
        }),
      });

      if (!response.ok) {
        throw new Error("Ssenariyni yuklashda xatolik yuz berdi.");
      }

      const data = await response.json();
      setCurrentCase(data);
    } catch (err: any) {
      console.error(err);
      // Fallback local mock study if server is temporarily unreachable or offline
      setCurrentCase({
        title: "Darsga qiziqmaslik va jamoada ishlashdan bosh tortish",
        description: "8-sinf o'quvchisi Sanjar darslarda doimo yolg'iz o'tirishni afzal ko'radi. Guruh bo'lib ishlash jarayonida darsga mutlaqo qatnashmaydi, boshqa sinfdoshlarini 'zerikarli' deb hisoblaydi. Ota-onasi esa farzandini juda aqlli va boshqalardan ustun deb hisoblab, o'qituvchining jamoaviy ishlarga jalb qilish haqidagi tavsiyalariga e'tibor bermaydi. Bu vaziyatda Sanjarda hamkorlik ko'nikmasi shakllanmayapti.",
        milliyMuammo: "Ota-onaning oilada andisha va o'zaro hurmatni noto'g'ri shakllantirgani, kibrlilik.",
        globalKonikmaMuammo: "Guruhda hamkorlik (Collaboration) va ijtimoiy-emotsional moslashuv yetishmasligi.",
        questions: [
          "Sanjarni guruhga jalb qilishda sharqona 'ustoz-shogird' yoki oila bilan hamkorlik metodidan qanday foydalanasiz?",
          "OECD mezonlariga ko'ra o'quvchining ichki faolligini (agency) oshirish uchun qanday yondashuv kerak?",
          "Sinf jamoasida kamsitish bo'lmasligi uchun qanday chora ko'rasiz?"
        ]
      });
    } finally {
      setIsLoadingCase(false);
    }
  };

  const handleEvaluate = async (e: FormEvent) => {
    e.preventDefault();
    if (!currentCase || !userSolution.trim()) return;

    if (userSolution.trim().length < 15) {
      setEvaluationError("Iltimos, batafsilroq yechim taklif qiling (kamida 15 ta belgi).");
      return;
    }

    setIsEvaluating(true);
    setEvaluationError(null);
    setFeedback(null);

    try {
      const response = await fetch("/api/case-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          caseTitle: currentCase.title,
          caseDescription: currentCase.description,
          userResponse: userSolution,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Baholashda xatolik yuz berdi.");
      }

      const data = await response.json();
      setFeedback(data);
    } catch (err: any) {
      console.error(err);
      setEvaluationError(err.message || "Tahlil qilish jarayonida xatolik yuz berdi.");
    } finally {
      setIsEvaluating(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600 bg-emerald-50 border-emerald-100";
    if (score >= 60) return "text-amber-600 bg-amber-50 border-amber-100";
    return "text-rose-600 bg-rose-50 border-rose-100";
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Pedagogik Ssenariylar Simulyatori</h2>
        <p className="text-gray-500 text-sm max-w-2xl mx-auto">
          Maktab hayotida yuzaga keladigan muammoli tarbiyaviy vaziyatlarni o'rganing, o'z pedagogik yechimingizni taklif qiling va milliy hamda global ekspert tahlilini qabul qiling.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Scenario Settings Sidebar */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
            <Brain className="w-5 h-5 text-amber-500" /> Keys parametrlarini sozlash
          </h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider">Sinf Toifasi</label>
              <select
                value={gradeCategory}
                onChange={(e) => setGradeCategory(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 text-xs font-semibold focus:ring-amber-500 focus:border-amber-500"
              >
                {gradeCategories.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider">Ko'nikma yo'nalishi</label>
              <select
                value={skillFocus}
                onChange={(e) => setSkillFocus(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 text-xs font-semibold focus:ring-amber-500 focus:border-amber-500"
              >
                {skillFocuses.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider">Muammo Mavzusi</label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 text-xs font-semibold focus:ring-amber-500 focus:border-amber-500"
              >
                {themes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <button
              onClick={generateInitialCase}
              disabled={isLoadingCase}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-xs font-bold shadow-xs transition"
            >
              {isLoadingCase ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Keys yuklanmoqda...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-400" /> Yangi Keys Generatsiya qilish
                </>
              )}
            </button>
          </div>
        </div>

        {/* Case Analysis Screen */}
        <div className="lg:col-span-8 space-y-6">
          {isLoadingCase ? (
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center py-16">
              <RefreshCw className="w-8 h-8 text-amber-500 animate-spin mx-auto mb-4" />
              <h4 className="font-bold text-gray-800">Siz uchun yangi keys yaratilmoqda</h4>
              <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed mt-1">
                Sinf darajasi va tarbiyaviy muammo tahlil qilinib, maxsus keys tahrir qilinmoqda...
              </p>
            </div>
          ) : currentCase ? (
            <div className="space-y-6">
              {/* Case Details */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-5">
                <div className="space-y-2">
                  <span className="text-[10px] text-amber-800 font-bold uppercase tracking-widest bg-amber-50 px-2 py-0.5 rounded-md font-mono self-start">
                    Pedagogik vaziyat
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight leading-tight">
                    {currentCase.title}
                  </h3>
                </div>
                
                <p className="text-sm text-gray-700 leading-relaxed text-justify bg-gray-50/50 p-4 sm:p-5 rounded-2xl border border-gray-100">
                  {currentCase.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3.5 bg-amber-50/40 rounded-xl border border-amber-100/50 text-xs">
                    <span className="font-bold text-amber-900 uppercase tracking-wide block text-[10px]">Milliy tarbiya jihati:</span>
                    <p className="text-gray-600 mt-1 leading-relaxed">{currentCase.milliyMuammo}</p>
                  </div>
                  <div className="p-3.5 bg-emerald-50/40 rounded-xl border border-emerald-100/50 text-xs">
                    <span className="font-bold text-emerald-900 uppercase tracking-wide block text-[10px]">XXI asr ko'nikmasi:</span>
                    <p className="text-gray-600 mt-1 leading-relaxed">{currentCase.globalKonikmaMuammo}</p>
                  </div>
                </div>
              </div>

              {/* Teacher Solution Entry Form */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                <div className="space-y-3">
                  <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2 uppercase tracking-wider">
                    <HelpCircle className="w-4 h-4 text-emerald-600" /> Tahlil uchun savollar va yechim:
                  </h4>
                  <ul className="space-y-2 pl-1">
                    {currentCase.questions.map((q, idx) => (
                      <li key={idx} className="text-xs text-gray-600 flex items-start gap-2 leading-relaxed">
                        <span className="font-bold text-emerald-600">{idx + 1}.</span>
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <form onSubmit={handleEvaluate} className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-700 uppercase">Sizning pedagogik yechimingiz:</label>
                    <textarea
                      value={userSolution}
                      onChange={(e) => setUserSolution(e.target.value)}
                      rows={6}
                      placeholder="Ushbu vaziyatda o'qituvchi sifatida qanday pedagogik usullarni qo'llagan bo'lar edingiz? Milliy odob, andisha va jamoaviy 21-asr ko'nikmalarini qanday muvozanatlashtirasiz? Batafsil yozing..."
                      className="w-full p-4 rounded-2xl border border-gray-200 text-sm focus:ring-emerald-500 focus:border-emerald-500 outline-hidden leading-relaxed"
                    />
                  </div>

                  {evaluationError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2 text-xs">
                      <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                      <span>{evaluationError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isEvaluating || !userSolution.trim()}
                    className="flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-md transition-all self-end"
                  >
                    {isEvaluating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" /> Pedagogik Tahlil qilinmoqda...
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" /> Yechimni Baholashga yuborish
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Display Feedback Response */}
              {feedback && (
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-lg space-y-6">
                  {/* Score block */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl border bg-gray-50/50">
                    <div className="space-y-1 text-center sm:text-left">
                      <h4 className="font-bold text-gray-900 text-base">Ekspert Pedagogik Bahosi</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Taqdim etilgan yechimning milliy andisha va global 4C mezonlariga mosligi
                      </p>
                    </div>
                    <div className={`flex items-center gap-2 px-5 py-3 rounded-2xl border ${getScoreColor(feedback.score)}`}>
                      <Award className="w-6 h-6" />
                      <div className="text-center">
                        <span className="font-mono font-bold text-2xl sm:text-3xl block leading-none">{feedback.score}</span>
                        <span className="text-[9px] uppercase tracking-wider font-semibold block mt-1">Pedagogik ball</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-emerald-50/40 rounded-2xl border border-emerald-100/50 space-y-2">
                      <h5 className="font-bold text-emerald-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4 text-emerald-600" /> Kuchli jihatlari
                      </h5>
                      <p className="text-xs text-emerald-800 leading-relaxed text-justify">{feedback.strengths}</p>
                    </div>
                    <div className="p-4 bg-red-50/30 rounded-2xl border border-red-100/50 space-y-2">
                      <h5 className="font-bold text-red-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-red-500" /> Kamchiliklar / Takomillashtirish joylari
                      </h5>
                      <p className="text-xs text-red-800 leading-relaxed text-justify">{feedback.weaknesses}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-5 bg-gradient-to-r from-amber-50 to-orange-50/30 rounded-2xl border border-amber-200/50 space-y-2">
                      <h5 className="font-bold text-amber-950 text-xs uppercase tracking-wider block">
                        Milliy Tarbiya Nigohidan Tahlil (Avloniy va Navoiy falsafasi):
                      </h5>
                      <p className="text-xs text-amber-800 leading-relaxed text-justify">{feedback.nationalPerspective}</p>
                    </div>

                    <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50/30 rounded-2xl border border-blue-200/50 space-y-2">
                      <h5 className="font-bold text-blue-950 text-xs uppercase tracking-wider block">
                        Ilg'or Jahon Pedagogikasi Nigohidan Tahlil (Student agency & EQ):
                      </h5>
                      <p className="text-xs text-blue-800 leading-relaxed text-justify">{feedback.globalPerspective}</p>
                    </div>
                  </div>

                  <div className="p-5 bg-emerald-950 text-white rounded-2xl space-y-2 shadow-md">
                    <h5 className="font-bold text-amber-400 text-xs uppercase tracking-widest block">
                      Tavsiya etiladigan amaliy qadamlar rejasi:
                    </h5>
                    <p className="text-xs text-emerald-100 leading-relaxed text-justify">{feedback.recommendedAction}</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 text-center bg-gray-50 rounded-2xl border">
              Keys topilmadi. Yangi keys generatsiya qiling.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
