import { ArrowRight, Brain, Users, MessageSquare, Lightbulb, GraduationCap } from "lucide-react";

interface HeroProps {
  onStartAction: (tabId: string) => void;
}

export default function Hero({ onStartAction }: HeroProps) {
  const skills = [
    {
      title: "Tanqidiy Fikrlash",
      engTitle: "Critical Thinking",
      icon: Brain,
      color: "bg-blue-50 text-blue-600 border-blue-100",
      description: "Axborotni xolis baholash va sababiy aloqalarni aniqlash. Avloniyning 'Fikr tarbiyasi' bilan bevosita mos keladi.",
      heritage: "Jadidlar mustaqil dars yondashuvi va munozara usullari"
    },
    {
      title: "Ijodkorlik & Kreativlik",
      engTitle: "Creativity",
      icon: Lightbulb,
      color: "bg-amber-50 text-amber-600 border-amber-100",
      description: "Standart bo'lmagan yechimlar va yangi g'oyalar yaratish. Muammoga an'anaviy bo'lmagan innovatsion yondashuv.",
      heritage: "Navoiyning ijodiy kashfiyotlar va yangilik yaratish g'oyasi"
    },
    {
      title: "Hamkorlik & Jamoaviylik",
      engTitle: "Collaboration",
      icon: Users,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
      description: "Jamoada ahil va samarali ishlash, umumiy maqsadlarga birgalikda erishish va jamoaviy mas'uliyatni his qilish.",
      heritage: "O'zbek xalqining qadimiy 'Hashar' va hamjihatlik an'analari"
    },
    {
      title: "Muloqot Madaniyati",
      engTitle: "Communication",
      icon: MessageSquare,
      color: "bg-purple-50 text-purple-600 border-purple-100",
      description: "Fikrni aniq va odob doirasida yetkazish, faol tinglash va muomala odobiga rioya qilish qobiliyati.",
      heritage: "Sharqona andisha va so'z qadri ('Andishali kishi — odobli kishidir')"
    }
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Hero Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 text-left">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
            <GraduationCap className="w-3.5 h-3.5" /> Innovatsion Metodik Platforma
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
            Jahon va Milliy Tarbiya <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-emerald-600">
              Konsepsiyalari Asosida
            </span> <br />
            XXI Asr Ko'nikmalari
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            Ushbu platforma o'quvchilarda tanqidiy fikrlash, ijodkorlik, muloqot va hamkorlik (4C) ko'nikmalarini Abdulla Avloniy, Alisher Navoiy merosi va OECD Learning Compass 2030 xalqaro standartlari uyg'unligida rivojlantirish uchun dars ishlanmalari va pedagogik keyslarni shakllantiruvchi metodik yordamchidir.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => onStartAction("planner")}
              className="flex items-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-medium shadow-md transition-all duration-200"
            >
              AI Dars Konstruktori <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onStartAction("simulator")}
              className="flex items-center gap-2 px-6 py-3.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium shadow-md transition-all duration-200"
            >
              Pedagogik Keyslar <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Hero Illustration Side */}
        <div className="lg:col-span-5 bg-gradient-to-tr from-amber-100/50 to-emerald-100/50 p-8 rounded-3xl border border-gray-100 flex flex-col justify-between h-full space-y-6">
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 text-xl font-sans">Abdulla Avloniy hikmati:</h3>
            <blockquote className="text-gray-700 italic border-l-4 border-amber-500 pl-4 py-1 text-base leading-relaxed">
              &ldquo;Tarbiya biz uchun yo hayot - yo mamot, yo najot - yo halokat, yo saodat - yo falokat masalasidir. Har bir millatning taraqqiysi fikr va axloq tarbiyasiga bog'liqdir.&rdquo;
            </blockquote>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-start space-x-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">✓</span>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">Metodologiya sintezi</h4>
              <p className="text-xs text-gray-500 mt-1 leading-normal">
                Ushbu tizim Sharq pedagogikasini G'arbning pragmatik ko'nikmalar tizimi (4C) bilan bog'lab, o'quvchilarda ham ma'naviy odob, ham xalqaro raqobatbardoshlikni yaratadi.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">O'quvchilarda Rivojlantiriladigan 4C Ko'nikmalari</h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Hozirgi zamon va kelajakda shaxsning muvaffaqiyatini belgilaydigan eng muhim tayanch poydevorlar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-4 flex flex-col justify-between hover:border-amber-300 transition-all duration-200"
              >
                <div className="space-y-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${skill.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">{skill.title}</h3>
                    <span className="text-xs text-gray-400 font-mono block">{skill.engTitle}</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{skill.description}</p>
                </div>
                <div className="border-t border-gray-100 pt-3 mt-3">
                  <span className="text-[10px] text-gray-400 block font-semibold uppercase tracking-wider">Milliy ildizlar:</span>
                  <p className="text-[11px] text-amber-800 font-medium mt-1 leading-snug">{skill.heritage}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info Sections: Global and National Concepts overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50 p-8 rounded-3xl border border-gray-100">
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            Milliy tarbiya konsepsiyasining asosi
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Bizning milliy tarbiya tizimimiz insonning ichki ma'naviyatini shakllantirishga yo'naltirilgan. <strong>Jadidlar maktabi</strong> (Avloniy, Behbudiy, Fitrat) mustaqil va tanqidiy fikrlovchi shaxslarni tayyorlashni oliy maqsad deb bilgan. Sharq falsafasidagi <strong>andisha, odob, o'zaro hamjihatlik (hashar)</strong> va <strong>ustoz-shogird an'analari</strong> XXI asrda hamkorlik va muloqot tizimining eng mustahkam asosi bo'la oladi.
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            Jahon tarbiya konsepsiyalarining asosi
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Xalqaro miqyosda <strong>OECD Learning Compass 2030</strong> kabi tizimlar o'quvchilarda bilimlarni amaliy qo'llay olish ko'nikmalarini (Competencies) oshirishni talab qiladi. <strong>Finlandiya ta'lim tizimi</strong> stressiz o'rganish, hamkorlik va fanlarni hayotiy voqelik bilan bog'lab o'qitish (Phenomenon-based learning) orqali o'quvchida erkin ijodkorlik va tanqidiy tahlilni yuqori darajaga ko'tarishini isbotlagan.
          </p>
        </div>
      </div>
    </div>
  );
}
