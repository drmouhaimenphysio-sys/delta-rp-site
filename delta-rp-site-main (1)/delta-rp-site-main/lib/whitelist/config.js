// Edit the server name, intro text and questions here.
//
// type: "text" | "email" | "number" | "textarea" | "radio"
//   text / email / textarea : minLength, maxLength
//   number                  : min, max
//   radio                   : options: ["Yes", "No"]
// short  : shorter label used in the Discord message (optional)
// inline : show side by side in the Discord message (optional)
export const SERVER_NAME = "DELTA RP";
export const PAGE_TITLE = "Whitelist Application";
export const INTRO =
  "Whitelist application for the Delta roleplay Tunisian server. Answer honestly and in detail. Low-effort or “copy/pasted” answers will be rejected.";

// Messages posted in the results channel. The player is mentioned automatically before the text.
export const ACCEPTED_MESSAGE =
  "Congratulations! Your Whitelist application has been accepted ✅ Please head over to the Waiting for Interview voice room 🗣️ to complete the final step, Good luck with your interview 👋";
export const REJECTED_MESSAGE =
  "Thanks for your interest 🤝 your Whitelist application has been rejected ❌\nDon't lose hope-feel free to reapply next time !🍀";

export const QUESTIONS = [
  {
    id: "realName",
    label: "Your Real Name",
    short: "Real name",
    type: "text",
    required: true,
    maxLength: 80,
  },
  {
    id: "realAge",
    label: "Your Real Age",
    short: "Real age",
    type: "number",
    required: true,
    min: 1,
    max: 120,
    inline: true,
  },
  {
    id: "playedBefore",
    label: "Experience: Have you played GTA Roleplay before?",
    short: "Played GTA RP before?",
    type: "radio",
    options: ["Yes", "No"],
    required: true,
    inline: true,
  },
  {
    id: "servers",
    label: "If yes, which servers have you played on?",
    short: "Servers played on",
    type: "text",
    required: false,
    maxLength: 300,
  },
  {
    id: "banned",
    label: "Have you ever been banned from an RP server?",
    short: "Banned from an RP server?",
    type: "radio",
    options: ["Yes", "No"],
    required: true,
    inline: true,
  },
  {
    id: "playStyle",
    label: "You want to Play Legal or Illegal?",
    short: "Legal or Illegal",
    type: "text",
    required: true,
    maxLength: 100,
    inline: true,
  },
  {
    id: "characterName",
    label: "Character Full Name In Game",
    short: "Character name",
    type: "text",
    required: true,
    maxLength: 80,
  },
  {
    id: "characterAge",
    label: "Character Age",
    type: "number",
    required: true,
    min: 1,
    max: 120,
  },
  {
    id: "backstory",
    label: "Character Backstory",
    type: "textarea",
    required: true,
    minLength: 100,
    maxLength: 1000,
    rows: 7,
  },
  {
    id: "goals",
    label: "What are your character's goals in Delta Roleplay?",
    short: "Character goals",
    type: "textarea",
    required: true,
    minLength: 30,
    maxLength: 800,
    rows: 5,
  },
];
