import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini client
let aiInstance: GoogleGenAI | null = null;
function getAI() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY muhit o'zgaruvchisi topilmadi. Iltimos, Secrets panelidan uni sozlang.");
    }
    aiInstance = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

// 1. Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// 2. Generate Lesson Plan using Gemini 3.5 Flash
app.post("/api/lesson-plan", async (req, res) => {
  try {
    const { subject, grade, topic, skills, concepts } = req.body;
    
    if (!subject || !grade || !topic) {
      return res.status(400).json({ error: "Fan, sinf va mavzu kiritilishi shart." });
    }

    const ai = getAI();
    
    const prompt = `Siz o'zbekistonlik tajribali pedagog va metodist olimsiz. Quyidagi ma'lumotlar asosida 45 daqiqalik ochiq dars uchun innovatsion "Dars Ishlanmasi" (Lesson Plan) yarating:
    - Fan: ${subject}
    - Sinf: ${grade}
    - Mavzu: "${topic}"
    - Integratsiya qilinadigan XXI asr ko'nikmalari (4C): ${skills ? skills.join(", ") : "Barchasi"}
    - Asos qilib olinadigan tarbiya konsepsiyalari: ${concepts ? concepts.join(", ") : "Jahon va milliy tarbiya (Abdulla Avloniy, Navoiy, OECD)"}

    Dars ishlanmasi darsning bosqichlarini (kirish, yangi mavzu, amaliy mashq, xulosa va baholash) o'z ichiga olishi kerak. Har bir bosqichda milliy tarbiya (masalan, kattalarga hurmat, hamjihatlik, odob) va jahon standartlari (tanqidiy fikrlash, muammoni hal qilish) sintez qilingan bo'lishi shart.
    Mashqlardan biri interaktiv, guruhlarda ishlashga mo'ljallangan va "Avloniy metodi" yoki sharqona axloqiy hikmatlarni zamonaviy rolli o'yin ko'rinishida qo'llashga qaratilgan bo'lsin.
    
    Javobni quyidagi qat'iy JSON formatida bering. Faqat JSON formatidagi javob qaytsin, hech qanday qo'shimcha matn qo'shmang.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            mavzu: { type: Type.STRING },
            maqsadlar: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Darsning ta'limiy, tarbiyaviy va rivojlantiruvchi maqsadlari."
            },
            metodlar: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Darsda qo'llaniladigan zamonaviy va milliy metodlar."
            },
            jihozlar: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Dars jihozlari va texnik vositalar."
            },
            bosqichlar: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  bosqichNomi: { type: Type.STRING, description: "Bosqich nomi (masalan, Tashkiliy qism, Yangi mavzu bayoni)" },
                  vaqt: { type: Type.STRING, description: "Ajratilgan vaqt (masalan, 5 daqiqa)" },
                  oqtuvchiFaoliyati: { type: Type.STRING, description: "O'qituvchining qiladigan ishlari va milliy-axloqiy yo'naltirishi" },
                  oquvchiFaoliyati: { type: Type.STRING, description: "O'quvchilarning faoliyati, jamoaviy hamkorligi" },
                  shakllanadiganKonikma: { type: Type.STRING, description: "Bu bosqichda rivojlanadigan XXI asr ko'nikmasi (4C)" }
                },
                required: ["bosqichNomi", "vaqt", "oqtuvchiFaoliyati", "oquvchiFaoliyati", "shakllanadiganKonikma"]
              }
            },
            interaktivMashq: {
              type: Type.OBJECT,
              properties: {
                nomi: { type: Type.STRING, description: "Mashqning nomi" },
                tavsifi: { type: Type.STRING, description: "Mashqning batafsil qadam-baqadam yo'riqnomasi" },
                milliyIntegratsiya: { type: Type.STRING, description: "Milliy tarbiya qadriyatlari qanday qo'llangani" },
                xalqaroKonikma: { type: Type.STRING, description: "XXI asr ko'nikmasi qanday shakllantirilgani" }
              },
              required: ["nomi", "tavsifi", "milliyIntegratsiya", "xalqaroKonikma"]
            },
            baholashMezonlari: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "O'quvchilar ko'nikmalarini baholash mezonlari (milliy va zamonaviy ko'rsatkichlar)."
            }
          },
          required: ["mavzu", "maqsadlar", "metodlar", "jihozlar", "bosqichlar", "interaktivMashq", "baholashMezonlari"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("Gemini javob qaytarmadi.");
    }

    res.json(JSON.parse(text.trim()));
  } catch (error: any) {
    console.error("Dars ishlanmasini yaratishda xato:", error);
    res.status(500).json({ error: error.message || "Tizim xatoligi yuz berdi" });
  }
});

// 3. Generate Case Study using Gemini 3.5 Flash
app.post("/api/generate-case", async (req, res) => {
  try {
    const { grade, skillFocus, theme } = req.body;

    const ai = getAI();

    const prompt = `Siz maktab psixologi va xalqaro tarbiya metodisti rolidasiz. 
    O'zbekiston maktablari kontekstida o'quvchilarda yuzaga keladigan real muammoli vaziyat (pedagogik case) yarating.
    - O'quvchilar yoshi/sinf toifasi: ${grade || "O'rta sinflar (5-9 sinf)"}
    - Rivojlantirilishi kerak bo'lgan XXI asr ko'nikmasi: ${skillFocus || "Muloqot (Communication) va Hamkorlik (Collaboration)"}
    - Vaziyat mavzusi: ${theme || "Axloq, odob va jamoada o'zaro nizolar"}

    Ushbu keys o'qituvchini o'ylantiradigan, ham sharqona oilaviy qadriyatlar va milliy odob-axloq normalarini, ham zamonaviy bolalar psixologiyasi va o'quvchiga yo'naltirilgan ta'lim prinsiplarini qo'llashni talab etadigan darajada murakkab bo'lsin.
    
    Javobni quyidagi qat'iy JSON formatida bering. Hech qanday qo'shimcha gap yoki izoh qo'shmang, faqat JSON qaytaring.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Keysning sarlavhasi (qisqa va qiziqarli)" },
            description: { type: Type.STRING, description: "Pedagogik keys / muammoli vaziyatning to'liq va jonli tasviri." },
            milliyMuammo: { type: Type.STRING, description: "Ushbu vaziyatdagi milliy-axloqiy jihat (masalan, andisha, kattaga hurmat, andishasizlik, ota-ona bilan bog'liqlik)." },
            globalKonikmaMuammo: { type: Type.STRING, description: "Vaziyatda qaysi XXI asr ko'nikmasi yetishmayotgani yoki zarurligi." },
            questions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "O'qituvchiga ushbu vaziyatni tahlil qilish uchun beriladigan 3 ta savol."
            }
          },
          required: ["title", "description", "milliyMuammo", "globalKonikmaMuammo", "questions"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("Gemini javob qaytarmadi.");
    }

    res.json(JSON.parse(text.trim()));
  } catch (error: any) {
    console.error("Keys yaratishda xato:", error);
    res.status(500).json({ error: error.message || "Keys yaratib bo'lmadi" });
  }
});

// 4. Evaluate Case Response using Gemini 3.5 Flash
app.post("/api/case-feedback", async (req, res) => {
  try {
    const { caseTitle, caseDescription, userResponse } = req.body;

    if (!userResponse || userResponse.trim().length < 10) {
      return res.status(400).json({ error: "Iltimos, batafsilroq yechim taklif qiling (kamida 10 ta belgi)." });
    }

    const ai = getAI();

    const prompt = `Siz nufuzli pedagogik ekspert va milliy qadriyatlar bo'yicha maslahatchisiz. 
    Quyidagi pedagogik keysga o'qituvchi tomonidan taklif etilgan yechimni tahlil qiling:
    - Keys nomi: "${caseTitle}"
    - Keys tavsifi: "${caseDescription}"
    - O'qituvchining yechimi: "${userResponse}"

    Iltimos, yechimni quyidagi mezonlar bo'yicha baholang va xolis fikr bildiring:
    1. Milliy tarbiya mezonlariga mosligi (kattalarni hurmat qilish, samimiylik, oila bilan hamkorlik, tarbiyaviy yondashuv).
    2. XXI asr ko'nikmalarini (tanqidiy fikrlash, erkinlik, hamkorlik, empatiya) rivojlantirishga mosligi.
    3. Bolalar huquqlari va zamonaviy pedagogik prinsiplarga zid kelmasligi (tazyiq o'tkazmaslik, individual yondashuv).

    Javobni quyidagi qat'iy JSON formatida bering:`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER, description: "Yechimning pedagogik samaradorlik reytingi (0 dan 100 gacha)" },
            strengths: { type: Type.STRING, description: "Yechimning eng kuchli va to'g'ri pedagogik tomonlari" },
            weaknesses: { type: Type.STRING, description: "Yechimda e'tibordan chetda qolgan yoki xato yondashilgan jihatlar" },
            nationalPerspective: { type: Type.STRING, description: "Yechimning milliy tarbiya konsepsiyasiga (masalan, Avloniy merosi, milliy mentalitet, andisha) mosligi tahlili" },
            globalPerspective: { type: Type.STRING, description: "Yechimning XXI asr ko'nikmalari va xalqaro pedagogika prinsiplariga mosligi tahlili" },
            recommendedAction: { type: Type.STRING, description: "O'qituvchi uchun ushbu vaziyatda amalda qo'llash tavsiya etiladigan optimal harakatlar rejasi" }
          },
          required: ["score", "strengths", "weaknesses", "nationalPerspective", "globalPerspective", "recommendedAction"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("Gemini javob qaytarmadi.");
    }

    res.json(JSON.parse(text.trim()));
  } catch (error: any) {
    console.error("Yechimni baholashda xato:", error);
    res.status(500).json({ error: error.message || "Tahlil qilishda xatolik yuz berdi" });
  }
});

// Vite middleware integration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
