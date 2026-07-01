import { useState } from "react";
import { NATIONAL_CONCEPTS, GLOBAL_CONCEPTS } from "../data";
import { BookOpen, Globe, Compass, GraduationCap } from "lucide-react";

export default function TheoreticalFoundations() {
  const [activeCategory, setActiveCategory] = useState<"national" | "global">("national");
  const [selectedConcept, setSelectedConcept] = useState<string>(
    activeCategory === "national" ? NATIONAL_CONCEPTS[0].id : GLOBAL_CONCEPTS[0].id
  );

  const concepts = activeCategory === "national" ? NATIONAL_CONCEPTS : GLOBAL_CONCEPTS;
  const currentConcept = concepts.find((c) => c.id === selectedConcept) || concepts[0];

  const handleCategoryChange = (cat: "national" | "global") => {
    setActiveCategory(cat);
    const firstId = cat === "national" ? NATIONAL_CONCEPTS[0].id : GLOBAL_CONCEPTS[0].id;
    setSelectedConcept(firstId);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Tab Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Tarbiya va Ta'lim Konsepsiyalari Kutubxonasi</h2>
        <p className="text-gray-500 text-sm max-w-xl mx-auto">
          Milliy merosimiz hamda jahonning eng ilg'or ta'lim prinsiplarini o'rganing va ularning XXI asr darslariga integratsiyasini tushuning.
        </p>

        {/* Category Toggle buttons */}
        <div className="inline-flex p-1 rounded-2xl bg-gray-100 border border-gray-200 mt-4">
          <button
            onClick={() => handleCategoryChange("national")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              activeCategory === "national"
                ? "bg-white text-emerald-800 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <GraduationCap className="w-4 h-4 text-emerald-600" />
            Milliy Tarbiya Konsepsiyalari
          </button>
          <button
            onClick={() => handleCategoryChange("global")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              activeCategory === "global"
                ? "bg-white text-blue-800 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Globe className="w-4 h-4 text-blue-600" />
            Jahon Tarbiya Modellari
          </button>
        </div>
      </div>

      {/* Main Layout: Concept Sidebar + Concept Detail Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block px-1">
            Mavjud konsepsiyalar
          </span>
          {concepts.map((concept) => (
            <button
              key={concept.id}
              onClick={() => setSelectedConcept(concept.id)}
              className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 flex flex-col space-y-2 ${
                selectedConcept === concept.id
                  ? "bg-white border-amber-400 shadow-md ring-2 ring-amber-400/10"
                  : "bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50 shadow-xs"
              }`}
            >
              <div className="flex justify-between items-start">
                <span className="font-bold text-gray-900 text-sm">{concept.title}</span>
              </div>
              <span className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                {concept.subtitle}
              </span>
              {concept.author && (
                <span className="text-[10px] text-amber-800 font-semibold font-mono bg-amber-50 self-start px-2 py-0.5 rounded-md mt-1">
                  {concept.author}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Detail Card */}
        <div className="lg:col-span-8">
          <div className={`bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6 bg-gradient-to-br ${currentConcept.bgGradient}`}>
            <div className="space-y-2">
              <span className="text-xs text-amber-800 font-bold uppercase tracking-widest block font-mono">
                Batafsil tahlil
              </span>
              <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
                {currentConcept.title}
              </h3>
              <p className="text-sm text-gray-500 italic">
                {currentConcept.subtitle} {currentConcept.author ? `— ${currentConcept.author}` : ""}
              </p>
            </div>

            <div className="border-t border-gray-200/40 my-4" />

            <div className="space-y-4">
              <h4 className="font-bold text-gray-900 text-base">Mohiyati va Tarixi</h4>
              <p className="text-sm text-gray-700 leading-relaxed text-justify">
                {currentConcept.description}
              </p>
            </div>

            <div className="space-y-4 bg-white/70 backdrop-blur-xs p-5 rounded-2xl border border-white/50 shadow-xs">
              <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-600" />
                Asosiy Tarbiyaviy Prinsiplari
              </h4>
              <ul className="space-y-3">
                {currentConcept.keyPoints.map((point, index) => {
                  const [title, desc] = point.split(":");
                  return (
                    <li key={index} className="text-xs text-gray-700 flex items-start gap-2">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5" />
                      <div>
                        {desc ? (
                          <>
                            <strong className="text-gray-900 font-semibold">{title}:</strong>
                            <span className="text-gray-600">{desc}</span>
                          </>
                        ) : (
                          <span className="text-gray-700">{point}</span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="space-y-3 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 p-5 rounded-2xl border border-emerald-500/20">
              <h4 className="font-bold text-emerald-900 text-sm flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-700" />
                Darsga Metodik Integratsiya qilish (O'qituvchilar uchun tavsiya)
              </h4>
              <p className="text-xs text-emerald-800 leading-relaxed font-medium">
                {currentConcept.integrationNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
