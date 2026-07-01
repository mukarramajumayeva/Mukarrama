import { QuizQuestion } from "./types";

export interface ConceptItem {
  id: string;
  title: string;
  subtitle: string;
  author?: string;
  description: string;
  keyPoints: string[];
  integrationNote: string;
  bgGradient: string;
}

export const NATIONAL_CONCEPTS: ConceptItem[] = [
  {
    id: "avloniy",
    title: "Abdulla Avloniy: Fikr va Axloq Tarbiyasi",
    subtitle: "Ma'rifatparvar jadid allomasining daho merosi",
    author: "Abdulla Avloniy (1878-1934)",
    description: "Avloniy daho asari 'Turkiy Guliston yoxud axloq'da tarbiyani inson hayotining eng muhim poydevori deb belgilaydi. Uning: 'Tarbiya biz uchun yo hayot - yo mamot, yo najot - yo halokat, yo saodat - yo falokat masalasidir' degan xitobi bugungi XXI asrda ham o'z ahamiyatini yo'qotgan emas. Avloniy darsda nafaqat bilimlarni berish, balki o'quvchining mustaqil fikrini rivojlantirish (Fikr tarbiyasi) va uni axloqan barkamol qilish (Axloq tarbiyasi) zarurligini ta'kidlagan.",
    keyPoints: [
      "Fikr tarbiyasi: O'quvchini mustaqil fikrlash, mulohaza yuritish va haqiqatni izlashga o'rgatish (zamonaviy Tanqidiy Fikrlash).",
      "Axloq tarbiyasi: Odob, andisha, kattaga hurmat va kichikka izzat kabi milliy qadriyatlarni xulqqa singdirish.",
      "Bada tarbiyasi: Sog'lom turmush tarzi, jismoniy barkamollik va intizom.",
      "O'qituvchining shaxsiy namunasi: Tarbiyadagi eng birinchi va ta'sirchan metod."
    ],
    integrationNote: "Darslarda o'quvchilarga tayyor qoidalarni yodlatish o'rniga, ularni Avloniy kabi 'fikrlashga undaydigan' muammoli savollar va hayotiy vaziyatlar tahliliga tortish zarur.",
    bgGradient: "from-amber-50 to-orange-100/50"
  },
  {
    id: "navoiy",
    title: "Alisher Navoiy va Komil Inson Konsepsiyasi",
    subtitle: "Sharqona gumanizm va yuksak axloq poydevori",
    author: "Alisher Navoiy (1441-1501)",
    description: "Navoiy o'z asarlarida 'Komil inson' g'oyasini ilgari surgan. Komil inson — bu chuqur ilmga ega bo'lgan, ammo ayni paytda yuksak insoniy fazilatlar: saxovat, adolat, kamtarlik, mehnatsevarlik va empatiyani o'zida mujassam etgan shaxs. Navoiy insonni kamsitmaslik, har bir o'quvchining qalbini tushunish va uning individual qobiliyatlarini qadrlash lozimligini uqtiradi.",
    keyPoints: [
      "Ilm va Amaliyot sintezi: O'rganilgan bilim amalda, el-yurt manfaati uchun qo'llanishi kerak.",
      "Empatiya va Mehr-shafqat: O'zgalar dardiga darmon bo'lish yuksak insoniylik belgisidir.",
      "Saxovat va Kamtarlik: O'quvchilarda manmanlikni yo'qotish, jamoaviy hamkorlikka zamin yaratish.",
      "Andisha va Muomala odobi: So'zni o'ylab gapirish, muloqot madaniyatining asosi."
    ],
    integrationNote: "Dars jarayonida jamoaviy ishlarni tashkil etish, o'quvchilarni o'zaro bir-birlariga yordam berish (ustoz-shogird an'anasi) ko'rinishida qo'llash Navoiy falsafasining amaliy namunasidir.",
    bgGradient: "from-emerald-50 to-teal-100/50"
  }
];

export const GLOBAL_CONCEPTS: ConceptItem[] = [
  {
    id: "oecd",
    title: "OECD Learning Compass 2030",
    subtitle: "Kelajak ta'limi bo'yicha global yo'riqnoma",
    author: "OECD (Iqtisodiy hamkorlik va taraqqiyot tashkiloti)",
    description: "OECD Learning Compass 2030 — bu o'quvchilarning kelajakda qanday ko'nikmalarga ega bo'lishi kerakligini belgilovchi xalqaro ramka. Uning markazida 'O'quvchi faolligi' (Student Agency) va o'quvchilarning nafaqat bilim olishi, balki jamiyatga faol ijobiy ta'sir ko'rsata olish qobiliyati (Co-agency) turadi. Compass o'quvchilarni o'zgaruvchan dunyoda mo'ljal olishga o'rgatadi.",
    keyPoints: [
      "O'quvchi Faolligi (Student Agency): O'quvchi o'z ta'lim jarayonining faol ishtirokchisi va tashkilotchisidir.",
      "Transformatsion Ko'nikmalar: Yangi qiymat yaratish (Creativity), ziddiyatlarni hal qilish va mas'uliyatni o'z zimmasiga olish.",
      "Uchlik sikl (A-A-R): Anticipation (Bashorat qilish), Action (Harakat qilish), Reflection (Mulohaza/Refleksiya).",
      "K-S-A-V integratsiyasi: Bilim (Knowledge), Ko'nikma (Skills), Pozitsiya (Attitudes) va Qadriyatlar (Values) birligi."
    ],
    integrationNote: "O'qituvchi darsda ma'ruzachi emas, balki fasilitator bo'lib, o'quvchilarga o'z dars loyihalarini tanlash va ularni mustaqil boshqarish imkonini berishi kerak.",
    bgGradient: "from-blue-50 to-indigo-100/50"
  },
  {
    id: "finnish",
    title: "Finlandiya Fenomenal Ta'lim Tizimi",
    subtitle: "Stressiz va amaliyotga yo'naltirilgan ta'lim",
    author: "Finlandiya Milliy Ta'lim Agentligi",
    description: "Finlandiya ta'lim modeli dunyodagi eng ilg'or tizimlardan biri hisoblanadi. Uning asosiy prinsiplari: 'Kamroq dars - ko'proq o'rganish', tenglik, amaliy hayotiy ko'nikmalarga asoslanganlik va stressiz muhit. Ayniqsa, 'Fenomenal ta'lim' (Phenomenon-based learning) o'quvchilarga fanlarni alohida-alohida emas, balki hayotiy hodisalar (masalan, 'Iqlim o'zgarishi' yoki 'Savdo') doirasida integratsiyalashgan holda o'rganish imkonini beradi.",
    keyPoints: [
      "Integratsiyalashgan ta'lim: Fanlararo aloqalarni mustahkamlovchi hayotiy loyihalar ustida ishlash.",
      "Tenglik va Ishonch: O'quvchilar o'rtasida raqobatni emas, balki hamkorlikni rag'batlantirish.",
      "O'yin orqali o'rganish: Kichik va o'rta yoshdagi bolalarga darslarni interaktiv o'yinlar bilan tushuntirish.",
      "Baholashning rag'batlantiruvchi tabiati: O'quvchini jazolash emas, uning o'sish dinamikasini ko'rsatish."
    ],
    integrationNote: "Darslarni hayotiy loyihalar shaklida o'tish (masalan, matematikani hisob-kitob qilish, tilni esa haqiqiy muloqot vaziyatlarida qo'llash orqali) o'quvchilarda amaliy 21-asr ko'nikmalarini oshiradi.",
    bgGradient: "from-sky-50 to-cyan-100/50"
  }
];

export const METHODOLOGY_QUIZZES: QuizQuestion[] = [
  {
    id: 1,
    question: "Abdulla Avloniyning 'Fikr tarbiyasi' tushunchasi bugungi kunda qaysi XXI asr ko'nikmasiga to'liq mos keladi?",
    options: [
      "Tanqidiy fikrlash (Critical Thinking) va mantiqiy mulohaza yuritish",
      "Raqamli texnologiyalar bilan ishlash (Digital Literacy)",
      "Nutqni tez va qat'iy bayon qilish madaniyati",
      "Xotirani mustahkamlash va ko'p axborotni yodda saqlash"
    ],
    correctAnswerIndex: 0,
    explanation: "Avloniy fikr tarbiyasini 'insonning aqlini charxlovchi, yaxshi bilan yomonni, foydali bilan zararlini ajratuvchi qurol' deb atagan. Bu hozirgi zamonaviy Tanqidiy Fikrlash ramkasiga to'liq mos keladi.",
    category: "National"
  },
  {
    id: 2,
    question: "OECD Learning Compass 2030 konsepsiyasining markaziy poydevori bo'lgan 'Student Agency' (O'quvchi faolligi) milliy metodikamizdagi qaysi g'oya bilan uyg'un?",
    options: [
      "O'quvchini darsda jim o'tirib, faqat muallimni tinglashga odatlantirish",
      "O'quvchining 'mustaqil fikrlashi', tashabbuskorligi va o'z taqdiri uchun mas'uliyatni his qilishi",
      "O'qituvchining darsdagi yagona avtoritar hukmronligi",
      "Darslikdagi qoidalarni tez fursatda yod olib aytib berish qobiliyati"
    ],
    correctAnswerIndex: 1,
    explanation: "O'quvchi faolligi (Student Agency) - bu bolaning mustaqil qaror qabul qila olishi, faolligi va ta'lim jarayonida o'z maqsadlarini belgilay olishidir. Bu milliy pedagogikamizdagi mustaqil va ijodiy fikrlovchi shaxs tarbiyasi g'oyasi bilan mutanosib.",
    category: "Global"
  },
  {
    id: 3,
    question: "Darsda Hamkorlik (Collaboration) ko'nikmasini sharqona qadriyatlar zaminida shakllantirish uchun qaysi metoddan foydalanish eng to'g'ri bo'ladi?",
    options: [
      "O'quvchilar o'rtasida keskin reyting va raqobat tizimini kuchaytirish",
      "Guruhlarda ishlash davomida 'Hashar' va 'O'zaro hamjihatlik' kabi milliy qadriyatlarni qo'llab, jamoaviy mas'uliyatni o'rgatish",
      "Barcha topshiriqlarni faqat uyga individual ish sifatida berish",
      "O'quvchilarga bir-biri bilan maslahatlashishni qat'iyan taqiqlash"
    ],
    correctAnswerIndex: 1,
    explanation: "O'zbek xalqining milliy qadriyati bo'lgan 'Hashar' va hamjihatlik an'anasi darsda jamoaviy loyihalarni bajarish (Collaboration) metodologiyasi uchun eng ajoyib milliy zamin bo'lib xizmat qiladi.",
    category: "Pedagogy"
  },
  {
    id: 4,
    question: "Alisher Navoiyning 'Komil inson' ta'limotida ilgari surilgan 'Empatiya' va 'Yordam' tushunchalari XXI asrda qanday nomlanadi?",
    options: [
      "Raqobatbardoshlik (Competitiveness)",
      "Hissiy intellekt (Emotional Intelligence) va Ijtimoiy mas'uliyat",
      "Raqamli dasturlash ko'nikmalari (Coding)",
      "Tezkor qaror qabul qilish (Agility)"
    ],
    correctAnswerIndex: 1,
    explanation: "Navoiy o'zgalar dardini his qilishni va ularga beminnat yordam berishni komillik darajasi deb bilgan. Bu zamonaviy psixologiya va ta'lim standartlarida Hissiy Intellekt (EQ) hamda ijtimoiy-hissiy ko'nikmalar (Social-emotional skills) deb tushuntiriladi.",
    category: "National"
  },
  {
    id: 5,
    question: "Finlandiya fenomenal ta'lim tizimidagi 'Fenomenal darslar' (Phenomenon-based learning) asosi nimaga qurilgan?",
    options: [
      "Har bir fanni mutlaqo alohida, hech qanday fanlararo bog'liqliksiz o'qitishga",
      "Darslarni faqat kompyuter sinfida olib borishga",
      "Hayotiy hodisalar va muammolarni (masalan, tabiat, bozor yoki madaniyat) turli fanlar kesimida integratsiya qilib o'rganishga",
      "Faqat tabiat bag'rida sayohat darslarini o'tishga"
    ],
    correctAnswerIndex: 2,
    explanation: "Fenomenal ta'lim o'quvchilarga hayotda uchraydigan aniq bir mavzuni yoki hodisani fizika, matematika, tarix, til va boshqa fanlar nuqtai nazaridan birlashtirib o'rganish imkonini beradi. Bu fanlararo integratsiyani ta'minlaydi.",
    category: "Global"
  }
];

export const STUDENT_EVALUATION_QUESTIONS = [
  // Tanqidiy fikrlash
  {
    id: "ct1",
    category: "Tanqidiy fikrlash",
    question: "Internetda biror qiziqarli yoki shubhali ma'lumotni o'qib qolsangiz, nima qilasiz?",
    options: [
      { text: "Uning manbasini, boshqa saytlardagi dalillarini tekshirib ko'raman va so'ngra xulosa qilaman.", score: 100 },
      { text: "Ma'lumotga ishonaman, lekin do'stlarimdan ham bu haqda so'rayman.", score: 60 },
      { text: "Darhol ishonaman va ijtimoiy tarmoqlarda boshqalarga ham ulashaman.", score: 20 }
    ]
  },
  {
    id: "ct2",
    category: "Tanqidiy fikrlash",
    question: "Darsda o'qituvchi yoki do'stingiz siz qo'shilmaydigan fikrni aytsa, qanday yo'l tutasiz?",
    options: [
      { text: "Uning fikrini oxirigacha tinglab, o'z qarashlarimni dalillar va muloyimlik bilan tushuntiraman.", score: 100 },
      { text: "E'tiroz bildirmayman, lekin ichimda o'z fikrimda qolaveraman.", score: 50 },
      { text: "Darhol uning gapini bo'lib, xato qilayotganini aytaman va tortishaman.", score: 20 }
    ]
  },
  {
    id: "ct3",
    category: "Tanqidiy fikrlash",
    question: "Murakkab masalani hal qilishingiz kerak bo'lsa, birinchi qadamingiz qanday bo'ladi?",
    options: [
      { text: "Masalani mayda qismlarga bo'lib, sabab va oqibatlarini tahlil qilaman.", score: 100 },
      { text: "Tezda internetdan yoki kitobdan tayyor yechimni qidiraman.", score: 50 },
      { text: "Masalani yechishdan voz kechaman yoki kimdandir qilib berishini so'rayman.", score: 10 }
    ]
  },
  // Ijodkorlik
  {
    id: "cr1",
    category: "Ijodkorlik",
    question: "Sizga odatiy buyumdan (masalan, plastik idish yoki eski qog'oz) noodatiy narsa yasash topshirilsa, munosabatingiz qanday bo'ladi?",
    options: [
      { text: "Idishdan yangicha foydalanish usullarini (guldon, o'yinchoq yoki filtr) o'ylab topaman va yasayman.", score: 100 },
      { text: "Internetdan tayyor namunalarni ko'rib, ulardan birini nusxalayman.", score: 60 },
      { text: "Bu foydasiz ish deb hisoblayman va uni shunchaki tashlab yuboraman.", score: 15 }
    ]
  },
  {
    id: "cr2",
    category: "Ijodkorlik",
    question: "Yangi dars loyihasi ustida ishlayotganda siz uchun eng muhimi nima?",
    options: [
      { text: "Mutlaqo yangi, boshqalarda uchramaydigan g'oyalarni qo'shish va uni chiroyli taqdim etish.", score: 100 },
      { text: "Loyiha talablarini xatosiz va o'rtacha darajada bajarish.", score: 60 },
      { text: "Loyihani eng kam kuch sarflab, tezroq topshirish.", score: 20 }
    ]
  },
  {
    id: "cr3",
    category: "Ijodkorlik",
    question: "Kutilmagan muammoga duch kelsangiz, unga qanday yondashasiz?",
    options: [
      { text: "Uni yangi imkoniyat deb bilaman va bir nechta noodatiy yechim variantlarini izlayman.", score: 100 },
      { text: "Muammodan xafa bo'laman va har doimgidek standart usul bilan yechishga urinaman.", score: 50 },
      { text: "Tushkunlikka tushib, boshqalar muammoni hal qilib berishini kutaman.", score: 10 }
    ]
  },
  // Hamkorlik
  {
    id: "co1",
    category: "Hamkorlik",
    question: "Guruhda ishlayotganingizda barcha mas'uliyatni qanday taqsimlaysiz?",
    options: [
      { text: "Guruh a'zolarining kuchli tomonlarini hisobga olib, vazifalarni o'zaro teng va kelishgan holda bo'lamiz.", score: 100 },
      { text: "Hamma ishni o'z zimmamga olaman, chunki boshqalarga ishonmayman.", score: 40 },
      { text: "Hech qanday ish qilmaslikka harakat qilaman, guruhdoshlarim o'zlari qilishsin.", score: 10 }
    ]
  },
  {
    id: "co2",
    category: "Hamkorlik",
    question: "Guruhdoshingiz xatoga yo'l qo'ysa, munosabatingiz qanday bo'ladi?",
    options: [
      { text: "Uni kamsitmasdan, xatosini birgalikda to'g'rilashni taklif qilaman va unga dalda bo'laman.", score: 100 },
      { text: "O'qituvchiga uning xatosini aytib, guruhimiz bahosini pasaytirmaslikni so'rayman.", score: 40 },
      { text: "Unga baqirib, guruhdan chiqarib yuborish bilan tahdid qilaman.", score: 10 }
    ]
  },
  {
    id: "co3",
    category: "Hamkorlik",
    question: "Sinflararo hashar yoki maktab obodonlashtirish tadbiri e'lon qilindi. Sizning ishtirokingiz qanday bo'ladi?",
    options: [
      { text: "Jon-dildan qatnashib, do'stlarim bilan quvnoq va ahil jamoa bo'lib ishlayman.", score: 100 },
      { text: "Majburligim uchun qatnashaman, lekin tezroq ketish yo'lini izlayman.", score: 50 },
      { text: "Tadbirdan qochib ketaman yoki kasallik bahona qilib kelmayman.", score: 10 }
    ]
  },
  // Muloqot
  {
    id: "cm1",
    category: "Muloqot",
    question: "O'z fikringizni boshqalarga tushuntirmoqchi bo'lsangiz, qanday so'zlardan foydalanasiz?",
    options: [
      { text: "Eshituvchining yoshiga mos, aniq, muloyim va tushunarli tilda gapiraman.", score: 100 },
      { text: "Faqat o'zimga qulay so'zlar bilan gapiraman, tushunish-tushunmaslik ularning ishi.", score: 50 },
      { text: "Ko'pincha hayajonlanib gapira olmayman yoki qo'pol so'zlar ishlataman.", score: 20 }
    ]
  },
  {
    id: "cm2",
    category: "Muloqot",
    question: "Suhbatdoshingiz sizga gapirayotganda uni qanday tinglaysiz?",
    options: [
      { text: "Ko'zlariga qarab, gapini bo'lmasdan tinglayman, kerak bo'lsa tushunish uchun savollar beraman.", score: 100 },
      { text: "Uni eshitaman, lekin xayolim boshqa joyda bo'ladi yoki telefonga qarab turaman.", score: 50 },
      { text: "Uning gapini tez-tez bo'lib, mavzuni o'zimga buraman.", score: 20 }
    ]
  },
  {
    id: "cm3",
    category: "Muloqot",
    question: "Do'stingiz bilan kelishmovchilik (nizo) yuzaga kelsa, uni qanday hal qilasiz?",
    options: [
      { text: "Tinchlanib, muammoni gaplashib olamiz va ikkalamizga ham ma'qul keladigan murosani (kompromiss) qidiramiz.", score: 100 },
      { text: "U bilan gaplashishni to'xtataman (arazlayman) va o'zidan kechirim so'rashini kutaman.", score: 40 },
      { text: "Darhol janjallashaman, kuch ishlataman yoki haqoratli so'zlar aytaman.", score: 10 }
    ]
  }
];

export const SKILL_METADATA: Record<string, string> = {
  "Tanqidiy fikrlash": "Axborotlarni xolis tahlil qilish, sabab-oqibatlarni ko'rish va to'g'ri qarorlar qabul qilish ko'nikmasi. Avloniyning 'Fikr tarbiyasi'ga bevosita mos keladi.",
  "Ijodkorlik": "Muammolarga yangicha yondashuv, innovatsion g'oyalar yaratish va amaliy ijodkorlik qobiliyati. Kelajakda qiymat yaratish asosi.",
  "Hamkorlik": "Jamoada ahillik, o'zaro ishonch va yordam asosida umumiy maqsadga erishish qobiliyati. O'zbekona 'Hamjihatlik' va 'Hashar' qadriyatiga asoslangan.",
  "Muloqot": "Fikrni aniq va muloyim tushuntirish, empatiya bilan tinglash va muloqot odobiga rioya qilish. Navoiyning andisha va so'z qadri ta'limotiga bog'liq."
};
