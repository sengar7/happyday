export type Memory = {
  title: string;
  description: string;
  moment: string;
};

export const memories: readonly Memory[] = [
  {
    title: "We met",
    description: "A small moment that quietly changed the shape of everything.",
    moment: "Chapter one",
  },
  {
    title: "We talked",
    description: "Hours became easy, and every conversation somehow needed one more message.",
    moment: "Chapter two",
  },
  {
    title: "We laughed",
    description: "The kind of laughter that makes ordinary days feel like little celebrations.",
    moment: "Chapter three",
  },
  {
    title: "We became best friends",
    description: "A safe place in another person—honest, warm, and entirely ours.",
    moment: "Chapter four",
  },
  {
    title: "We fell in love",
    description: "Not all at once, but in a hundred gentle ways that brought us right here.",
    moment: "Chapter five",
  },
] as const;
