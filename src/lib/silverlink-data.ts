import usersData from "@data/users.json";
import threadsData from "@data/threads.json";
import type { SeedUser, Thread } from "@/types/silverlink";

export const seedUsers: SeedUser[] = usersData;
export const seedThreads: Thread[] = threadsData;

const LOCAL_USER: SeedUser = {
  id: "local",
  name: "You",
  age: 0,
  location: "",
  avatar: "/placeholder.svg",
  bio: "",
  joined: "",
  answers_given: 0,
  verified_helper: false,
};

const userById = new Map(seedUsers.map((u) => [u.id, u]));

export function getUserById(id: string): SeedUser {
  if (id === "local") return LOCAL_USER;
  return userById.get(id) ?? LOCAL_USER;
}

export function getFirstName(name: string): string {
  return name.split(/\s+/)[0] ?? name;
}

export const CATEGORY_ORDER = [
  "Scams & Safety",
  "Passwords & Accounts",
  "Video Calls",
  "Apps & Phone Settings",
  "Health & News",
] as const;

export const RECENT_ON_HOME = 5;

export function getRecentThreads(threads: Thread[], count: number = RECENT_ON_HOME): Thread[] {
  return threads.slice(0, count);
}
