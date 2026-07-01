export interface LessonStage {
  bosqichNomi: string;
  vaqt: string;
  oqtuvchiFaoliyati: string;
  oquvchiFaoliyati: string;
  shakllanadiganKonikma: string;
}

export interface InteractiveExercise {
  nomi: string;
  tavsifi: string;
  milliyIntegratsiya: string;
  xalqaroKonikma: string;
}

export interface LessonPlan {
  mavzu: string;
  maqsadlar: string[];
  metodlar: string[];
  jihozlar: string[];
  bosqichlar: LessonStage[];
  interaktivMashq: InteractiveExercise;
  baholashMezonlari: string[];
}

export interface CaseStudy {
  title: string;
  description: string;
  milliyMuammo: string;
  globalKonikmaMuammo: string;
  questions: string[];
}

export interface CaseFeedback {
  score: number;
  strengths: string;
  weaknesses: string;
  nationalPerspective: string;
  globalPerspective: string;
  recommendedAction: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  category: "National" | "Global" | "Pedagogy";
}

export interface SkillsScore {
  name: string; // Skill name
  score: number; // 0-100 score
  fullMark: number;
  description: string;
}
