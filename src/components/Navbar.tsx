import { Award, BookOpen, Brain, Compass, HelpCircle, FileText } from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const navItems = [
    { id: "home", label: "Asosiy", icon: Compass },
    { id: "theory", label: "Nazariy Asoslar", icon: BookOpen },
    { id: "planner", label: "Dars Konstruktori", icon: FileText },
    { id: "simulator", label: "Pedagogik Keyslar", icon: Brain },
    { id: "quiz", label: "Metodik Testlar", icon: HelpCircle },
    { id: "student", label: "O'quvchi Baholash", icon: Award },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-xs backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-emerald-500 text-white shadow-md">
              <span className="font-bold text-lg">XXI</span>
            </div>
            <div>
              <span className="font-bold text-gray-900 tracking-tight text-base sm:text-lg block">
                Milliy & Global Tarbiya
              </span>
              <span className="text-[10px] text-gray-500 -mt-1 block font-mono">
                XXI Asr Metodologiyasi
              </span>
            </div>
          </div>
          
          <div className="hidden lg:flex space-x-1 items-center">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-amber-500/10 text-amber-800 shadow-xs border border-amber-500/20"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-amber-600" : "text-gray-400"}`} />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Mobile indicator / Quick selector */}
          <div className="flex lg:hidden items-center">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-amber-500 focus:border-amber-500 block p-2 px-3 font-medium outline-hidden"
            >
              {navItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
}
