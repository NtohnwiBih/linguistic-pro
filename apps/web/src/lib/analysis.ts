import type { SkillSlug } from "./skills";

export type Stat = { label: string; value: string };
export type Criterion = { name: string; band: number; note: string };
export type Pattern = { title: string; count: string; detail: string };
export type Step = { title: string; detail: string; minutes: number };
export type Answer = { q: string; yours: string; correct?: string; ref: number; why: string };

export const tone: Record<SkillSlug, { text: string; bg: string; border: string; stroke: string; fill: string }> = {
  reading: { text: "text-skill-reading", bg: "bg-skill-reading/10", border: "border-skill-reading", stroke: "stroke-skill-reading", fill: "bg-skill-reading" },
  listening: { text: "text-skill-listening", bg: "bg-skill-listening/10", border: "border-skill-listening", stroke: "stroke-skill-listening", fill: "bg-skill-listening" },
  writing: { text: "text-skill-writing", bg: "bg-skill-writing/10", border: "border-skill-writing", stroke: "stroke-skill-writing", fill: "bg-skill-writing" },
  speaking: { text: "text-skill-speaking", bg: "bg-skill-speaking/10", border: "border-skill-speaking", stroke: "stroke-skill-speaking", fill: "bg-skill-speaking" },
};

export const headers: Record<SkillSlug, { eyebrow: string; title: string; prompt: string; band: number; stats: Stat[]; submitted: string }> = {
  speaking: { eyebrow: "Speaking · Part 2 · Long turn", title: "Describe a place you visited that left a strong impression", prompt: "You should say: where it was · when you went · what you did there · and explain why it left a strong impression on you.", band: 6.0, submitted: "4 Nov 2026", stats: [{ label: "Recording", value: "1:52" }, { label: "Prep time", value: "1:00" }, { label: "Words", value: "214" }, { label: "Speech rate", value: "118 wpm" }] },
  writing: { eyebrow: "Writing · Academic · Task 2 excerpt", title: "Public transport or more roads?", prompt: "Some people think governments should spend more money on public transport rather than building new roads. To what extent do you agree or disagree?", band: 6.0, submitted: "3 Nov 2026", stats: [{ label: "Task", value: "Opinion essay" }, { label: "Words", value: "268" }, { label: "Focus", value: "Agreement" }, { label: "Criteria", value: "4 assessed" }] },
  reading: { eyebrow: "Reading · Academic · Passage review", title: "Urban trees and cooler cities", prompt: "Sample passage: the cooling benefits of urban trees, the importance of mature canopies and the trade-offs facing city planners.", band: 6.5, submitted: "2 Nov 2026", stats: [{ label: "Full test", value: "27 / 40" }, { label: "Time", value: "58:24" }, { label: "This excerpt", value: "2 / 6 correct" }, { label: "Main focus", value: "Qualifiers" }] },
  listening: { eyebrow: "Listening · Part 1 · Booking conversation", title: "A photography workshop booking", prompt: "A caller books a community-centre workshop. Review the final details, including changes to the day, fee and room.", band: 7.0, submitted: "4 Nov 2026", stats: [{ label: "Full test", value: "30 / 40" }, { label: "Excerpt", value: "1:42" }, { label: "This excerpt", value: "2 / 6 correct" }, { label: "Main focus", value: "Distractors" }] },
};

export type Mark = { t: string; kind?: "pron" | "rep" | "filler" | "pause"; note?: string };
export const speakingTranscript: Mark[] = [
  { t: "Well, I'd like to talk about Lisbon, which I visited last summer with my cousin. " },
  { t: "Erm…", kind: "filler", note: "Filler at the start of a new idea. Try a short silent pause instead, or a phrase like 'What I remember is…'." },
  { t: " It was the first time I travelled outside of Cameroon on my own, so it was " },
  { t: "very, very", kind: "rep", note: "Repeated intensifier. Replace with one stronger adjective: 'truly special' or 'unforgettable'." },
  { t: " special for me. We stayed in a small apartment in Alfama, the old district, and the streets were really narrow and steep. " },
  { t: "[pause 2.1s]", kind: "pause", note: "A 2.1-second pause mid-answer. Long pauses lower Fluency & Coherence; plan your next point while finishing the current one." },
  { t: " What impressed me most was the " },
  { t: "atmosphere", kind: "pron", note: "Stress was placed on the 2nd syllable (at-MOS-phere). Correct stress: AT-mos-phere /ˈæt.mə.sfɪə/." },
  { t: " in the evening, when people sit outside and listen to fado music. The music is quite sad but also beautiful, you know. I " },
  { t: "thought", kind: "pron", note: "/θ/ was pronounced as /t/ ('tought'). Place the tongue between the teeth for /θɔːt/." },
  { t: " that it is a very interesting experience because I never heard this type of music before. Also the food was very good, especially the pastéis de nata, which is a kind of custard tart. " },
  { t: "Erm, I mean…", kind: "filler", note: "Self-correction filler. It's fine occasionally, but three fillers in under two minutes is noticeable." },
  { t: " The thing that made it memorable was that everyone was very friendly, even if I didn't speak Portuguese. I felt comfortable asking directions, and a woman in a café even drew me a map. So yes, I think it left a strong impression on me because it showed me that I can be independent, and I would really, really like to go back one day, maybe to visit Porto as well." },
];

export const pronunciation = [
  { word: "atmosphere", heard: "at-MOS-phere", target: "/ˈæt.mə.sfɪə/", tip: "Stress the first syllable." },
  { word: "thought", heard: "tought", target: "/θɔːt/", tip: "Soft /θ/ — tongue between teeth." },
  { word: "district", heard: "dis-trik", target: "/ˈdɪs.trɪkt/", tip: "Don't drop the final /t/." },
  { word: "comfortable", heard: "com-FOR-ta-ble", target: "/ˈkʌmf.tə.bəl/", tip: "Three syllables, stress on the first." },
];

export const writingSentences = [
  { o: "Public transports is an essential part of modern cities.", r: "Public transport is an essential part of modern cities.", type: "Grammar", note: "'Transport' is uncountable in this context. Use the singular form with 'is'." },
  { o: "I agree that governments should spend more money on buses and trains rather than roads, because it have many advantages.", r: "I agree that governments should prioritise buses and trains over new roads, because this approach has several advantages.", type: "Grammar", note: "Subject–verb agreement: 'it has', not 'it have'. 'Prioritise… over' is also more precise." },
  { o: "Firstly, public transport can reduce the number of cars in the road.", r: "Firstly, public transport can reduce the number of cars on the road.", type: "Vocabulary", note: "Collocation: cars are 'on the road', not 'in the road'." },
  { o: "If more people uses buses, there will be less traffic and the air will be more clean.", r: "If more people used buses, there would be less congestion and the air would be cleaner.", type: "Grammar", note: "'People' is plural ('use'), comparatives of short adjectives use '-er' ('cleaner'), and 'congestion' is a stronger word than 'traffic'." },
  { o: "For example, in my city many people drives to work because the buses are not regular.", r: "In my city, for example, many people drive to work because buses are unreliable.", type: "Grammar", note: "Agreement again: 'people drive'. 'Unreliable' is more natural than 'not regular'." },
  { o: "This shows that better services would encourage them to leave their cars at home.", r: "This shows that better services would encourage them to leave their cars at home.", type: "Strength", note: "Clear link between example and argument — keep this. Good use of the second conditional." },
  { o: "Secondly, building more roads is very expensive and it only solves the problem for a short time.", r: "Secondly, new roads are costly and offer only a short-term solution, as extra capacity soon attracts more drivers.", type: "Coherence", note: "Develop the idea: explain *why* it is short-term. Examiners reward extended, supported points." },
  { o: "However, roads are also important for delivery vehicles and emergency services.", r: "Admittedly, roads remain vital for delivery vehicles and emergency services.", type: "Coherence", note: "Good concession. 'Admittedly' signals it more clearly and fits an opinion essay." },
];

export const readingParas = [
  { id: "A", t: "Urban trees do more than improve the appearance of a street. Their shade reduces the amount of solar energy absorbed by roads and buildings. Trees also release water vapour through their leaves, a process known as transpiration, which cools the surrounding air." },
  { id: "B", t: "A study in three European cities found that streets with mature trees were, on average, two degrees cooler on summer afternoons than nearby streets without trees. The effect varied with canopy cover and local wind conditions; it was not identical at every site." },
  { id: "C", t: "However, planting a sapling does not immediately reproduce the benefits of a mature tree. Young trees provide relatively little shade and need regular watering during their first few summers. Protecting existing trees can therefore be more effective in the short term than planting large numbers of new ones." },
  { id: "D", t: "Planners must also weigh costs. The passage's authors note that maintenance budgets are limited, but they do not compare the overall cost of planting with that of protection." },
  { id: "E", t: "Tree cover is often unevenly distributed. Wealthier neighbourhoods tend to have more canopy, meaning lower-income residents may experience higher temperatures during heatwaves." },
  { id: "F", t: "Experts therefore recommend choosing species according to local soil, rainfall and space, rather than selecting trees simply because they grow quickly." },
];
export const readingAnswers: Answer[] = [
  { q: "Trees cool the air by releasing water vapour.", yours: "TRUE", ref: 0, why: "Paragraph A states transpiration releases water vapour and 'cools the surrounding air'." },
  { q: "The cooling effect was the same at every study site.", yours: "TRUE", correct: "FALSE", ref: 1, why: "The qualifier 'on average' and the line 'it was not identical at every site' contradict the statement. Watch for qualifiers that limit a claim." },
  { q: "Planting new trees costs less than protecting existing trees.", yours: "FALSE", correct: "NOT GIVEN", ref: 3, why: "Paragraph D says the authors 'do not compare' the costs. If the text doesn't state it, the answer is NOT GIVEN — not FALSE." },
  { q: "Young trees need regular ______ in their first summers. (ONE WORD)", yours: "water", correct: "watering", ref: 2, why: "Copy the exact word form from the passage: 'regular watering'. 'Water' changes the grammar." },
  { q: "Which paragraph discusses unequal access to trees?", yours: "E", ref: 4, why: "Paragraph E: 'Tree cover is often unevenly distributed.'" },
  { q: "What should guide species selection? A: Growth alone · B: Local conditions · C: One universal species", yours: "A", correct: "B", ref: 5, why: "Paragraph F rejects choosing trees 'simply because they grow quickly' (a distractor) and recommends local soil, rainfall and space." },
];

export const listeningLines = [
  { time: "0:00", t: "Receptionist: Good morning, Riverside Community Centre. How can I help? Caller: I'd like to book the photography workshop, please." },
  { time: "0:12", t: "Receptionist: Of course. Can I take your surname? Caller: It's Bennett — B-E-N-N-E-T-T. Receptionist: Thank you, Ms Bennett." },
  { time: "0:25", t: "Caller: Is the workshop on Friday? Receptionist: It was originally scheduled for Friday, but we've moved it to Saturday because the tutor is unavailable." },
  { time: "0:40", t: "Receptionist: The session starts at half past nine. Please arrive fifteen minutes early to register." },
  { time: "0:55", t: "Caller: And the fee is thirty pounds? Receptionist: Normally, yes, but as a member you'll pay twenty-five." },
  { time: "1:10", t: "Receptionist: Just bring your own camera — we'll provide tripods." },
  { time: "1:25", t: "Caller: Is it in the main hall? Receptionist: Not this time, it's in the garden room, at the back of the building." },
];
export const listeningAnswers: Answer[] = [
  { q: "Participant's surname (ONE WORD)", yours: "Bennet", correct: "Bennett", ref: 1, why: "The name was spelled letter by letter: double N and double T. Write spelled words down exactly as you hear each letter." },
  { q: "Workshop day (ONE WORD)", yours: "Friday", correct: "Saturday", ref: 2, why: "Classic distractor: Friday is mentioned first, then corrected with 'but we've moved it to Saturday'. Listen past the first answer." },
  { q: "Session start time", yours: "9:30", ref: 3, why: "'Half past nine' = 9:30." },
  { q: "Fee for this participant (£)", yours: "30", correct: "25", ref: 4, why: "'Normally, yes, but as a member…' — the word 'but' signals the real answer: £25." },
  { q: "Equipment to bring (ONE WORD)", yours: "camera", ref: 5, why: "'Bring your own camera.' Tripods are provided, so they're not the answer." },
  { q: "Workshop location (TWO WORDS)", yours: "main hall", correct: "garden room", ref: 6, why: "The caller suggests the main hall; the receptionist corrects it: 'Not this time, it's in the garden room'." },
];

export const criteria: Partial<Record<SkillSlug, Criterion[]>> = {
  speaking: [
    { name: "Fluency & coherence", band: 6.0, note: "Speaks at length, but fillers and one long pause interrupt the flow." },
    { name: "Lexical resource", band: 6.0, note: "Good topic words (district, atmosphere); relies on 'very' instead of precise adjectives." },
    { name: "Grammatical range & accuracy", band: 6.0, note: "Mix of simple and complex sentences; tense slips ('I never heard' → 'I had never heard')." },
    { name: "Pronunciation", band: 6.5, note: "Generally clear; word stress and /θ/ need attention." },
  ],
  writing: [
    { name: "Task response", band: 6.5, note: "Clear position throughout; main ideas need fuller development." },
    { name: "Coherence & cohesion", band: 6.0, note: "Logical order with 'Firstly/Secondly'; linking within paragraphs is mechanical." },
    { name: "Lexical resource", band: 6.0, note: "Adequate range; collocation errors ('in the road')." },
    { name: "Grammatical range & accuracy", band: 5.5, note: "Frequent subject–verb agreement errors lower this score." },
  ],
};

export const patterns: Record<SkillSlug, Pattern[]> = {
  speaking: [
    { title: "Filler words", count: "3 in 1:52", detail: "Mostly at the start of a new idea. Practise opening phrases to bridge thoughts." },
    { title: "Repetition", count: "2 instances", detail: "'very, very' and 'really, really'. Swap for one precise adjective or adverb." },
    { title: "Tense consistency", count: "4 slips", detail: "Switching to present tense when describing a past trip." },
  ],
  writing: [
    { title: "Subject–verb agreement", count: "4 errors", detail: "'people uses', 'it have'. Check every verb against its subject before submitting." },
    { title: "Underdeveloped ideas", count: "2 paragraphs", detail: "Claims are stated but not explained. Add 'because…' or 'this means…'." },
    { title: "Collocations", count: "2 errors", detail: "Learn fixed pairs: 'on the road', 'heavy traffic', 'reduce congestion'." },
  ],
  reading: [
    { title: "Missing qualifiers", count: "Across 3 tests", detail: "Words like 'on average', 'some', 'not always' change the meaning of a claim." },
    { title: "FALSE vs NOT GIVEN", count: "62% accuracy", detail: "You often mark FALSE when the passage simply doesn't say." },
    { title: "Word form in gap-fill", count: "3 errors", detail: "Copy the exact form from the text — 'watering', not 'water'." },
  ],
  listening: [
    { title: "Distractors", count: "3 of 4 errors", detail: "You write the first option heard. Wait for 'but', 'actually', 'not this time'." },
    { title: "Spelling of names", count: "2 errors", detail: "Double letters are often missed when names are spelled out." },
    { title: "Numbers & prices", count: "Strong", detail: "Times and dates are consistently correct — keep it up." },
  ],
};

export const nextSteps: Record<SkillSlug, Step[]> = {
  speaking: [
    { title: "Replace fillers with bridge phrases", detail: "Practise 5 phrases like 'What stood out was…' in three 1-minute answers.", minutes: 10 },
    { title: "Word stress drill", detail: "Record and compare: atmosphere, comfortable, photography, vegetable.", minutes: 8 },
    { title: "Past tense storytelling", detail: "Retell this answer keeping every verb in the past.", minutes: 12 },
  ],
  writing: [
    { title: "Agreement checker routine", detail: "Underline each subject and verb in your last essay and fix mismatches.", minutes: 10 },
    { title: "Develop one idea fully", detail: "Rewrite paragraph 2 using Point → Explain → Example → Link.", minutes: 15 },
    { title: "Collocation set: transport", detail: "Learn 10 collocations and use 5 in a new paragraph.", minutes: 8 },
  ],
  reading: [
    { title: "Qualifier hunt", detail: "Highlight every qualifier in 2 short passages before answering.", minutes: 12 },
    { title: "NOT GIVEN practice set", detail: "15 targeted True/False/Not Given questions with explanations.", minutes: 15 },
    { title: "Exact word form drill", detail: "Sentence completion set focusing on noun vs verb forms.", minutes: 8 },
  ],
  listening: [
    { title: "Distractor training", detail: "6 Part 1 clips where the first answer changes. Wait for the correction.", minutes: 12 },
    { title: "Spelling dictation", detail: "20 names spelled out at natural speed, including double letters.", minutes: 6 },
    { title: "Map & location set", detail: "Practise 'not this time' style corrections in Part 2 maps.", minutes: 10 },
  ],
};
