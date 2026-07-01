import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TheoreticalFoundations from "./components/TheoreticalFoundations";
import LessonPlanner from "./components/LessonPlanner";
import ScenarioSimulator from "./components/ScenarioSimulator";
import TeacherQuiz from "./components/TeacherQuiz";
import StudentSelfAssessment from "./components/StudentSelfAssessment";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");

  const handleStartAction = (tabId: string) => {
    setActiveTab(tabId);
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "home":
        return <Hero onStartAction={handleStartAction} />;
      case "theory":
        return <TheoreticalFoundations />;
      case "planner":
        return <LessonPlanner />;
      case "simulator":
        return <ScenarioSimulator />;
      case "quiz":
        return <TeacherQuiz />;
      case "student":
        return <StudentSelfAssessment />;
      default:
        return <Hero onStartAction={handleStartAction} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans">
      {/* Navigation Bar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-grow">
        {renderActiveComponent()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="space-y-1">
            <span className="font-bold text-gray-900 text-sm">
              Milliy & Global Tarbiya Metodologiyasi
            </span>
            <p className="text-xs text-gray-400">
              O'quvchilarda milliy odob-axloq va XXI asr ko'nikmalarini rivojlantirish platformasi © {new Date().getFullYear()}
            </p>
          </div>
          <div className="flex gap-4 text-xs text-gray-400 font-semibold font-mono">
            <span>Interaktiv o'qitish</span>
            <span>•</span>
            <span>Gemini AI integratsiyasi</span>
            <span>•</span>
            <span>Metodik yordam</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
