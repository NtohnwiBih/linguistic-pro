import { BookOpen, Headphones, PenLine, Mic } from "lucide-react";

export const skillCards = [
  { slug: "reading", icon: BookOpen, title: "Reading", description: "Find the meaning. Not just the keywords.", detail: "Passages · Answer explanations" },
  { slug: "listening", icon: Headphones, title: "Listening", description: "Catch the details that make a difference.", detail: "Transcripts · Distractor analysis" },
  { slug: "writing", icon: PenLine, title: "Writing", description: "Turn good ideas into stronger answers.", detail: "Sentence feedback · Model revisions" },
  { slug: "speaking", icon: Mic, title: "Speaking", description: "Build a voice that sounds like you.", detail: "Fluency · Pronunciation feedback" },
] as const;

export const process = [
  { number: "01", title: "Start with your answer", text: "A passage, a conversation, an essay or a speaking prompt. Every skill has its own challenges." },
  { number: "02", title: "Look beyond the score", text: "Explore the reasoning behind missed answers, recurring patterns and the strengths worth keeping." },
  { number: "03", title: "Know what comes next", text: "Turn feedback into focused exercises for the areas that need a little more attention." },
];
