/**
 * NeuroVIZR Master Clinical Mapping Data
 * Based on Dr. Kessler's clinical mapping table for HQP / Brain Gauge / CRIS GOLD
 *
 * Clinical use rule: begin with Brain Gym preparation sequence
 * (Coordination 1 → Flexibility 1 → Strength 1 → Endurance 1,
 *  then progress through levels 2 and 3) before heavier sessions.
 */

// ── Session Descriptions ─────────────────────────────
export const NEUROVIZR_SESSIONS = {
  'Peaceful Heart':     { icon: '💚', category: 'Calm',       desc: 'Calms ANS load, reduces tension, improves recovery' },
  'Big Peace':          { icon: '🕊️', category: 'Calm',       desc: 'Deep relaxation and nervous system settling' },
  'Gentle Movers':      { icon: '🌊', category: 'Calm',       desc: 'Gentle activation for pain and inflammation relief' },
  'Calm Down':          { icon: '😌', category: 'Calm',       desc: 'Down-regulates overload and improves reset capacity' },
  'Still Point':        { icon: '🧘', category: 'Calm',       desc: 'Deep stillness for stress recovery and reset' },
  'Heart Space':        { icon: '❤️', category: 'Calm',       desc: 'Settles emotional load that amplifies pain' },
  'Gamma Gamma':        { icon: '⚡', category: 'Focus',      desc: 'Supports clearer processing and neural organization' },
  'Crystal Clear':      { icon: '💎', category: 'Focus',      desc: 'Improves clarity, encoding, and sustained attention' },
  'Laser Focus':        { icon: '🎯', category: 'Focus',      desc: 'Increases attentional stability for memory and focus' },
  'Focused Attention':  { icon: '🔬', category: 'Focus',      desc: 'Builds attentional precision and discrimination' },
  'Centered':           { icon: '⚖️', category: 'Performance', desc: 'Balanced activation for optimized performance' },
  'Coordination 1':     { icon: '🏋️', category: 'Brain Gym',  desc: 'Foundation: neural coordination training Level 1' },
  'Coordination 2':     { icon: '🏋️', category: 'Brain Gym',  desc: 'Foundation: neural coordination training Level 2' },
  'Coordination 3':     { icon: '🏋️', category: 'Brain Gym',  desc: 'Foundation: neural coordination training Level 3' },
  'Flexibility 1':      { icon: '🤸', category: 'Brain Gym',  desc: 'Foundation: neural flexibility training Level 1' },
  'Flexibility 2':      { icon: '🤸', category: 'Brain Gym',  desc: 'Foundation: neural flexibility training Level 2' },
  'Flexibility 3':      { icon: '🤸', category: 'Brain Gym',  desc: 'Foundation: neural flexibility training Level 3' },
  'Strength 1':         { icon: '💪', category: 'Brain Gym',  desc: 'Foundation: neural strength training Level 1' },
  'Strength 2':         { icon: '💪', category: 'Brain Gym',  desc: 'Foundation: neural strength training Level 2' },
  'Strength 3':         { icon: '💪', category: 'Brain Gym',  desc: 'Foundation: neural strength training Level 3' },
  'Endurance 1':        { icon: '🏃', category: 'Brain Gym',  desc: 'Foundation: neural endurance training Level 1' },
  'Endurance 2':        { icon: '🏃', category: 'Brain Gym',  desc: 'Foundation: neural endurance training Level 2' },
  'Endurance 3':        { icon: '🏃', category: 'Brain Gym',  desc: 'Foundation: neural endurance training Level 3' },
};

// ── Symptom/Goal → Session Mapping ───────────────────
export const SYMPTOM_SESSION_MAP = [
  { pattern: 'Pain / inflammation',          start: 'Peaceful Heart',  addon: 'Big Peace',           goal: 'Calm ANS load, reduce tension',       freq: 'Daily or near-daily' },
  { pattern: 'Neuroinflammation / brain fog', start: 'Gamma Gamma',    addon: 'Crystal Clear',       goal: 'Support clearer processing',          freq: '4–6x/week' },
  { pattern: 'Memory / recall',              start: 'Crystal Clear',   addon: 'Laser Focus',         goal: 'Improve clarity and encoding',        freq: 'Daily' },
  { pattern: 'Working memory / concentration',start: 'Laser Focus',    addon: 'Focused Attention',   goal: 'Increase attentional stability',      freq: '4–6x/week' },
  { pattern: 'Stress + cognitive fatigue',   start: 'Calm Down',       addon: 'Still Point',         goal: 'Reduce overload, improve reset',      freq: 'As needed / evening' },
  { pattern: 'TBI / post-concussion',        start: 'Brain Gym sequence', addon: 'Gamma Gamma',      goal: 'Prepare networks, build integration', freq: 'Sequential' },
  { pattern: 'Mood + inflammatory stress',   start: 'Peaceful Heart',  addon: 'Heart Space',         goal: 'Settle emotional load',               freq: '3–5x/week' },
];

// ── HQP Pattern → NeuroVIZR Direction ────────────────
export const HQP_SESSION_MAP = [
  { hqpPattern: 'High VLF%',               priority: 'Emotional / CNS unloading',         sessions: ['Peaceful Heart', 'Big Peace'] },
  { hqpPattern: 'Low Total Power',         priority: 'Rebuild capacity first',             sessions: ['Brain Gym progression'] },
  { hqpPattern: 'Low HF%',                 priority: 'Parasympathetic support',            sessions: ['Peaceful Heart', 'Calm Down', 'Still Point'] },
  { hqpPattern: 'High Stress Index',       priority: 'Down-regulate overload',             sessions: ['Calm Down', 'Big Peace', 'Peaceful Heart'] },
  { hqpPattern: 'Low LF% with low drive',  priority: 'Gentle activation',                  sessions: ['Crystal Clear', 'Centered', 'Brain Gym'] },
  { hqpPattern: 'Cognitive strain',         priority: 'Focus + clarity',                    sessions: ['Crystal Clear', 'Laser Focus', 'Focused Attention'] },
];

// ── Brain Gauge Deficit → Session Mapping ────────────
export const BRAIN_GAUGE_SESSION_MAP = {
  speed:     { suggests: 'Slow processing / sluggish network response',   sessions: ['Crystal Clear', 'Laser Focus'],     startWith: 'Brain Gym → Crystal Clear' },
  accuracy:  { suggests: 'Poor discrimination / unstable processing',     sessions: ['Focused Attention', 'Crystal Clear'], startWith: 'Brain Gym → Focused Attention' },
  toj:       { suggests: 'Temporal processing weakness',                  sessions: ['Coordination series', 'Focused Attention'], startWith: 'Coordination 1–3 first' },
  plasticity:{ suggests: 'Reduced adaptability',                          sessions: ['Brain Gym full sequence', 'Gamma Gamma'], startWith: 'Complete Brain Gym first' },
  fatigue:   { suggests: 'Low cortical stamina',                          sessions: ['Still Point', 'Calm Down', 'Endurance series'], startWith: 'Calm / rebuild before high-demand' },
  focus:     { suggests: 'Attentional inconsistency',                     sessions: ['Laser Focus', 'Focused Attention'],  startWith: 'Crystal Clear → Laser Focus' },
};

// ── CRIS GOLD Quadrant → Session Strategy ────────────
export const QUADRANT_SESSION_MAP = {
  Q1: { theme: 'High ELI + Low ARI',  priority: 'Calm first, stabilize, then rebuild',           flow: ['Peaceful Heart / Big Peace', 'Brain Gym', 'Crystal Clear'] },
  Q2: { theme: 'High ELI + High ARI', priority: 'Discharge overload while preserving capacity',  flow: ['Calm Down / Peaceful Heart', 'Focused Attention or Crystal Clear'] },
  Q3: { theme: 'Low ELI + Low ARI',   priority: 'Build reserve and adaptability',                flow: ['Brain Gym', 'Crystal Clear', 'Endurance series'] },
  Q4: { theme: 'Low ELI + High ARI',  priority: 'Optimize performance / resilience',             flow: ['Centered / Laser Focus', 'Task-oriented focus sessions'] },
};

// ── Mini Protocols ───────────────────────────────────
export const MINI_PROTOCOLS = [
  { name: 'Pain + Memory',              am: 'Crystal Clear or Laser Focus', midday: 'Gamma Gamma',  pm: 'Peaceful Heart' },
  { name: 'Neuroinflammation + Fatigue', am: 'Brain Gym step',              midday: 'Gamma Gamma',  pm: 'Still Point' },
  { name: 'TBI Support',                am: 'Brain Gym progression first',  midday: 'Focused Attention or Gamma Gamma', pm: 'Based on tolerance' },
  { name: 'High Stress / Overload',     am: 'Peaceful Heart',              midday: 'Calm Down / Big Peace', pm: 'Brain Gym or Crystal Clear' },
];

// Category colors for UI
export const NEUROVIZR_CATEGORY_COLORS = {
  'Calm':        { bg: '#ecfdf5', border: '#a7f3d0', text: '#065f46' },
  'Focus':       { bg: '#eff6ff', border: '#bfdbfe', text: '#1e40af' },
  'Performance': { bg: '#fef3c7', border: '#fcd34d', text: '#92400e' },
  'Brain Gym':   { bg: '#f5f3ff', border: '#c4b5fd', text: '#5b21b6' },
};
