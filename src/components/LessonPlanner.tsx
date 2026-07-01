import { useState, FormEvent } from "react";
import { LessonPlan } from "../types";
import { Sparkles, FileText, Printer, Check, Copy, AlertTriangle, RefreshCw } from "lucide-react";

export default function LessonPlanner() {
  const [subject, setSubject] = useState("Tarbiya");
  const [customSubject, setCustomSubject] = useState("");
  const [grade, setGrade] = useState("6-sinf");
  const [topic, setTopic] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    "Tanqidiy fikrlash",
    "Jamoaviy hamkorlik",
    "Muloqot madaniyati",
  ]);
  const [selectedConcepts, setSelectedConcepts] = useState<string[]>([
    "Abdulla Avloniy",
    "Alisher Navoiy",
    "OECD Learning Compass 2030",
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedPlan, setGeneratedPlan] = useState<LessonPlan | null>(null);
  const [copied, setCopied] = useState(false);

  const subjects = [
    "Tarbiya",
    "Ona tili va adabiyot",
    "Tarix",
    "Tabiiy fanlar (Science)",
    "Matematika",
    "Ingliz tili",
    "Boshqa...",
  ];

  const grades = Array.from({ length: 11 }, (_, i) => `${i + 1}-sinf`);

  const presetTopics: Record<string, string[]> = {
    "Tarbiya": [
      "Vatanga muhabbat va sadoqat",
      "Andisha va muomala odobi",
      "Kiber-gigiyena va axborot madaniyati",
      "Kasb-hunar egallashning ahamiyati",
    ],
    "Ona tili va adabiyot": [
      "Alisher Navoiy g'azallari tahlili",
      "Zahiriddin Muhammad Bobur ruboiylari",
      "Nutq madaniyati va so'z qadri",
    ],
    "Tarix": [
      "Amir Temur davlatida madaniyat va odob",
      "Jadidlar harakati va ularning ta'lim islohotlari",
      "Buyuk ipak yo'li va madaniyatlar almashinuvi",
    ],
    "Tabiiy fanlar (Science)": [
      "Ekologiya va tabiatga nisbatan mas'uliyat",
      "Suv resurslaridan tejamkorlik bilan foydalanish",
    ],
    "Matematika": [
      "Oila byudjeti va moliyaviy savodxonlik",
      "Mantiqiy masalalar orqali fikrlashni charxlash",
    ],
  };

  const skillsList = [
    "Tanqidiy fikrlash (Critical Thinking)",
    "Ijodkorlik & Kreativlik (Creativity)",
    "Jamoaviy hamkorlik (Collaboration)",
    "Muloqot madaniyati (Communication)",
  ];

  const conceptsList = [
    "Abdulla Avloniy (Fikr va Axloq)",
    "Alisher Navoiy (Komil inson)",
    "OECD Learning Compass 2030",
    "Finlandiya fenomenal ta'limi",
  ];

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleConceptToggle = (concept: string) => {
    setSelectedConcepts((prev) =>
      prev.includes(concept) ? prev.filter((c) => c !== concept) : [...prev, concept]
    );
  };

  const handlePresetTopicClick = (pTopic: string) => {
    setTopic(pTopic);
  };

  const handleGenerate = async (e: FormEvent) => {
    e.preventDefault();
    
    const finalSubject = subject === "Boshqa..." ? customSubject : subject;
    if (!finalSubject || !topic) {
      setError("Iltimos, dars fani va mavzusini kiriting.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedPlan(null);

    try {
      const response = await fetch("/api/lesson-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: finalSubject,
          grade,
          topic,
          skills: selectedSkills,
          concepts: selectedConcepts,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Dars ishlanmasini yaratishda xato yuz berdi.");
      }

      const data = await response.json();
      setGeneratedPlan(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Ulanish xatosi. Iltimos, server ishlayotganiga ishonch hosil qiling.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedPlan) return;
    
    let text = `DARS ISHLANMASI\n`;
    text += `Fan: ${subject === "Boshqa..." ? customSubject : subject}\n`;
    text += `Sinf: ${grade}\n`;
    text += `Mavzu: ${generatedPlan.mavzu}\n\n`;
    
    text += `Dars Maqsadlari:\n`;
    generatedPlan.maqsadlar.forEach((m, i) => { text += `${i + 1}. ${m}\n`; });
    
    text += `\nMetodlar: ${generatedPlan.metodlar.join(", ")}\n`;
    text += `Jihozlar: ${generatedPlan.jihozlar.join(", ")}\n\n`;
    
    text += `INTERAKTIV MASHQ\n`;
    text += `Nomi: ${generatedPlan.interaktivMashq.nomi}\n`;
    text += `Tavsifi: ${generatedPlan.interaktivMashq.tavsifi}\n`;
    text += `Milliy qadriyatlar integratsiyasi: ${generatedPlan.interaktivMashq.milliyIntegratsiya}\n`;
    text += `Rivojlanadigan XXI asr ko'nikmasi: ${generatedPlan.interaktivMashq.xalqaroKonikma}\n\n`;
    
    text += `DARS BOSQICHLARI (XRONOLOGIYA):\n`;
    generatedPlan.bosqichlar.forEach((b) => {
      text += `\n- ${b.bosqichNomi} (${b.vaqt})\n`;
      text += `  O'qituvchi faoliyati: ${b.oqtuvchiFaoliyati}\n`;
      text += `  O'quvchi faoliyati: ${b.oquvchiFaoliyati}\n`;
      text += `  Shakllanadigan ko'nikma: ${b.shakllanadiganKonikma}\n`;
    });
    
    text += `\nBaholash Mezonlari:\n`;
    generatedPlan.baholashMezonlari.forEach((bm, i) => { text += `${i + 1}. ${bm}\n`; });

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">AI Dars Ishlanmasi Konstruktori</h2>
        <p className="text-gray-500 text-sm max-w-2xl mx-auto">
          Mavzu va yo'nalishlarni tanlang. AI tizimi milliy tarbiyaviy hikmatlar hamda xalqaro 21-asr ko'nikmalariga asoslangan dars ishlanmasini (metod, interaktiv o'yin, xronologiya, baholash mezonlari) tayyorlaydi.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start print:block">
        {/* Input Form Column */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6 print:hidden">
          <form onSubmit={handleGenerate} className="space-y-6">
            {/* Subject Selector */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">Dars Fani</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium focus:ring-amber-500 focus:border-amber-500"
              >
                {subjects.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom Subject Input if other selected */}
            {subject === "Boshqa..." && (
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-600">Fanning nomini yozing</label>
                <input
                  type="text"
                  value={customSubject}
                  onChange={(e) => setCustomSubject(e.target.value)}
                  placeholder="Masalan, Tasviriiy san'at"
                  className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              </div>
            )}

            {/* Grade Selector */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">Sinf (Sinf Toifasi)</label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium focus:ring-amber-500 focus:border-amber-500"
              >
                {grades.map((gr) => (
                  <option key={gr} value={gr}>
                    {gr}
                  </option>
                ))}
              </select>
            </div>

            {/* Topic Input */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">Dars Mavzusi</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Masalan: Milliy qadriyat va uning hayotimizdagi o'rni"
                className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:ring-amber-500 focus:border-amber-500"
                required
              />
            </div>

            {/* Preset Topics Recommendation */}
            {presetTopics[subject] && (
              <div className="space-y-2">
                <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider block">
                  Tavsiya etiladigan namunaviy mavzular:
                </span>
                <div className="flex flex-wrap gap-2">
                  {presetTopics[subject].map((pTopic) => (
                    <button
                      type="button"
                      key={pTopic}
                      onClick={() => handlePresetTopicClick(pTopic)}
                      className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium transition-all ${
                        topic === pTopic
                          ? "bg-amber-500/10 border-amber-400 text-amber-800"
                          : "bg-gray-50 border-gray-100 hover:bg-gray-100 text-gray-600"
                      }`}
                    >
                      {pTopic}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* XXI century skills */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-gray-700">Shakllantiriladigan XXI asr ko'nikmalari</label>
              <div className="space-y-2">
                {skillsList.map((skill) => {
                  const val = skill.split(" (")[0];
                  const isChecked = selectedSkills.includes(val);
                  return (
                    <label key={skill} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleSkillToggle(val)}
                        className="w-4.5 h-4.5 text-amber-500 border-gray-300 rounded-sm focus:ring-amber-500"
                      />
                      <span className="text-xs text-gray-700 font-medium">{skill}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Core Upbringing Concepts */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-gray-700">Integratsiya qilinadigan Konsepsiyalar</label>
              <div className="space-y-2">
                {conceptsList.map((concept) => {
                  const isChecked = selectedConcepts.includes(concept);
                  return (
                    <label key={concept} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleConceptToggle(concept)}
                        className="w-4.5 h-4.5 text-emerald-500 border-gray-300 rounded-sm focus:ring-emerald-500"
                      />
                      <span className="text-xs text-gray-700 font-medium">{concept}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-start gap-2 text-xs">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Generate Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-600 hover:to-emerald-600 text-white rounded-xl font-bold shadow-md transition-all ${
                isLoading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Tayyorlanmoqda (15-20 soniya)...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" /> Dars Ishlanmasini Generatsiya qilish
                </>
              )}
            </button>
          </form>
        </div>

        {/* Output Screen Column */}
        <div className="lg:col-span-7 space-y-6 print:w-full">
          {/* Welcome/Empty State */}
          {!isLoading && !generatedPlan && (
            <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center space-y-4 print:hidden">
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-gray-800 text-lg">Hali dars ishlanmasi yaratilmadi</h3>
              <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
                Chap tarafdagi formadan dars parametrlarni belgilang va "Generatsiya qilish" tugmasini bosing. AI sizga dars rejasini tayyorlab beradi.
              </p>
            </div>
          )}

          {/* Loading state visual indicator with rotating educational quotes */}
          {isLoading && (
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6 text-center py-16 print:hidden">
              <div className="relative w-16 h-16 mx-auto">
                <div className="absolute inset-0 border-4 border-amber-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <div className="space-y-3">
                <h4 className="font-bold text-gray-800">Pedagogik Ekspert yordamchi ishlamoqda</h4>
                <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                  Dars mavzusiga ko'ra sharqona odob-axloq va 4C ko'nikmalarini uyg'unlashtirgan innovatsion metodlar yozilmoqda. Iltimos, kutib turing...
                </p>
              </div>
              <div className="p-4 bg-emerald-50 rounded-2xl max-w-md mx-auto border border-emerald-100">
                <p className="text-xs text-emerald-800 font-medium italic">
                  "Bilim yoshlikda toshga o'yilgan naqsh kabidir, tarbiya esa shu naqshning chiroyi va go'zalligidir."
                </p>
              </div>
            </div>
          )}

          {/* Render Generated Lesson Plan */}
          {generatedPlan && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-md space-y-8 print:border-none print:shadow-none print:p-0">
              {/* Header actions */}
              <div className="flex justify-between items-center pb-4 border-b border-gray-100 print:hidden">
                <span className="text-xs text-emerald-700 font-bold uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-md font-mono">
                  Dars Ishlanmasi Tayyor
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3.5 py-2 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-xs font-semibold transition"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" /> Nusxalandi!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Nusxa olish
                      </>
                    )}
                  </button>
                  <button
                    onClick={handlePrint}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-xs font-semibold transition"
                  >
                    <Printer className="w-3.5 h-3.5" /> Chop etish / PDF
                  </button>
                </div>
              </div>

              {/* Title Block */}
              <div className="space-y-3">
                <span className="text-xs text-amber-800 font-semibold font-mono">
                  {grade} | Fan: {subject === "Boshqa..." ? customSubject : subject}
                </span>
                <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                  Mavzu: {generatedPlan.mavzu}
                </h3>
              </div>

              {/* Goals */}
              <div className="space-y-3">
                <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider border-l-3 border-amber-500 pl-2">
                  Darsning Tarbiyaviy va Metodik Maqsadlari
                </h4>
                <ul className="space-y-2">
                  {generatedPlan.maqsadlar.map((maqsad, idx) => (
                    <li key={idx} className="text-xs text-gray-700 flex items-start gap-2 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                      <span>{maqsad}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Methods and Materials */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <h5 className="font-bold text-gray-800 text-xs uppercase tracking-wider mb-2">Qo'llaniladigan Metodlar</h5>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {generatedPlan.metodlar.join(", ")}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <h5 className="font-bold text-gray-800 text-xs uppercase tracking-wider mb-2">Kerakli Jihozlar</h5>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {generatedPlan.jihozlar.join(", ")}
                  </p>
                </div>
              </div>

              {/* Featured Interactive Exercise */}
              <div className="p-5 bg-gradient-to-tr from-amber-50/70 to-emerald-50/70 rounded-2xl border border-amber-500/10 space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                  <h4 className="font-bold text-gray-900 text-sm">
                    Darsning Asosiy Interaktiv O'yini: {generatedPlan.interaktivMashq.nomi}
                  </h4>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed text-justify">
                  <strong>Mashq tavsifi:</strong> {generatedPlan.interaktivMashq.tavsifi}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="bg-white/80 p-3 rounded-xl border border-amber-500/10">
                    <span className="text-[10px] text-amber-800 font-bold uppercase tracking-wider block">Milliy Qadriyat Integratsiyasi:</span>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{generatedPlan.interaktivMashq.milliyIntegratsiya}</p>
                  </div>
                  <div className="bg-white/80 p-3 rounded-xl border border-emerald-500/10">
                    <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block">Shakllanadigan XXI Asr Ko'nikmasi:</span>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{generatedPlan.interaktivMashq.xalqaroKonikma}</p>
                  </div>
                </div>
              </div>

              {/* Lesson Chronology */}
              <div className="space-y-4">
                <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider border-l-3 border-emerald-500 pl-2">
                  Darsning Bosqichlari va Xronometraji (45 daqiqa)
                </h4>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-xl">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50/50 text-gray-500 text-[10px] uppercase font-bold tracking-wider">
                        <th className="py-3 px-3">Bosqich (Vaqt)</th>
                        <th className="py-3 px-3">O'qituvchi Faoliyati</th>
                        <th className="py-3 px-3">O'quvchi Faoliyati</th>
                        <th className="py-3 px-3">Rivojlanadigan Ko'nikma</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-xs">
                      {generatedPlan.bosqichlar.map((b, idx) => (
                        <tr key={idx} className="hover:bg-gray-50/40">
                          <td className="py-3.5 px-3 font-semibold text-gray-900 align-top whitespace-nowrap">
                            {b.bosqichNomi} <br />
                            <span className="text-[10px] text-amber-800 font-semibold font-mono bg-amber-50 px-1.5 py-0.5 rounded-sm mt-1 inline-block">
                              {b.vaqt}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 text-gray-600 align-top leading-relaxed text-justify max-w-[200px]">
                            {b.oqtuvchiFaoliyati}
                          </td>
                          <td className="py-3.5 px-3 text-gray-600 align-top leading-relaxed text-justify max-w-[200px]">
                            {b.oquvchiFaoliyati}
                          </td>
                          <td className="py-3.5 px-3 text-emerald-800 font-medium align-top max-w-[120px]">
                            <span className="inline-block bg-emerald-50 text-[10px] px-2 py-0.5 rounded-full border border-emerald-100">
                              {b.shakllanadiganKonikma}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Assessment Rubrics */}
              <div className="space-y-3 pt-2">
                <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider border-l-3 border-amber-500 pl-2">
                  Ko'nikmalarni Baholash Mezonlari (Rubrics)
                </h4>
                <ul className="space-y-2">
                  {generatedPlan.baholashMezonlari.map((bm, idx) => (
                    <li key={idx} className="text-xs text-gray-700 flex items-start gap-2 leading-relaxed">
                      <span className="font-bold text-amber-600 min-w-[16px]">{idx + 1}.</span>
                      <span>{bm}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Disclaimer */}
              <div className="text-[10px] text-gray-400 italic text-center pt-4 border-t border-gray-100 print:hidden">
                Ushbu dars rejasi o'zbek metodologiyasi va global pedagogik standartlar uyg'unligida Gemini 3.5 modeli tomonidan tayyorlandi.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
