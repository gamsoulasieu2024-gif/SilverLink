export interface SeedUser {
  id: string;
  name: string;
  age: number;
  location: string;
  avatar: string;
  bio: string;
  joined: string;
  answers_given: number;
  verified_helper: boolean;
}

export interface ThreadAnswer {
  id: string;
  answered_by: string;
  verified_helper: boolean;
  date: string;
  helpful_count: number;
  text: string;
}

export interface Thread {
  id: string;
  category: string;
  question: string;
  asked_by: string;
  date: string;
  helpful_count: number;
  answers: ThreadAnswer[];
}

export type ScamCheckResult = "likely_scam" | "suspicious" | "looks_safe";
