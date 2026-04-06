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
  'Now Just Relax':     { icon: '🛋️', category: 'Calm',       desc: 'Deep relaxation for stress recovery' },
  'Unwind':             { icon: '🌀', category: 'Calm',       desc: 'Releases tension and supports wind-down' },
  'Kick Back':          { icon: '🪑', category: 'Calm',       desc: 'Easy relaxation for recovery support' },
  'Recover from Burnout':{ icon: '🔋', category: 'Calm',       desc: 'Restorative session for exhaustion and burnout' },
  'Gamma Gamma':        { icon: '⚡', category: 'Focus',      desc: 'Supports clearer processing and neural organization' },
  'Crystal Clear':      { icon: '💎', category: 'Focus',      desc: 'Improves clarity, encoding, and sustained attention' },
  'Laser Focus':        { icon: '🎯', category: 'Focus',      desc: 'Increases attentional stability for memory and focus' },
  'Focused Attention':  { icon: '🔬', category: 'Focus',      desc: 'Builds attentional precision and discrimination' },
  'Target Focus':       { icon: '🎯', category: 'Focus',      desc: 'Targeted focus training for performance' },
  'Task Mode':          { icon: '📋', category: 'Focus',      desc: 'Task-oriented focus and productivity support' },
  'Shifting Into Task': { icon: '🔄', category: 'Focus',      desc: 'Brain network transition support for task engagement' },
  'Emotional Flow':     { icon: '🌊', category: 'Focus',      desc: 'Supports emotional processing and flow state' },
  'Centered':           { icon: '⚖️', category: 'Performance', desc: 'Balanced activation for optimized performance' },
  'Gamma Processor':    { icon: '⚙️', category: 'Performance', desc: 'Advanced gamma processing for neural integration' },
  'Pattern Exercise':   { icon: '🧩', category: 'Performance', desc: 'Pattern recognition and neural coordination' },
  'Alpha 10Hz':         { icon: '🔊', category: 'Performance', desc: 'Alpha brainwave entrainment at 10Hz' },
  'Alpha 8-12Hz':       { icon: '🔊', category: 'Performance', desc: 'Alpha range brainwave entrainment' },
  'Beta 12-15Hz':       { icon: '🔊', category: 'Performance', desc: 'Low beta brainwave entrainment' },
  'Beta 15Hz':          { icon: '🔊', category: 'Performance', desc: 'Beta brainwave entrainment at 15Hz' },
  'Gamma 30-40Hz':      { icon: '🔊', category: 'Performance', desc: 'Gamma range brainwave entrainment' },
  'Delta 1-4Hz':        { icon: '🔊', category: 'Performance', desc: 'Delta brainwave entrainment for deep rest' },
  'Theta 4Hz':          { icon: '🔊', category: 'Performance', desc: 'Theta brainwave entrainment for deep relaxation' },
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

// ── Brain Gauge Deficit → Session Mapping (LOCKED) ───
export const BRAIN_GAUGE_SESSION_MAP = {
  speed:     { suggests: 'Slow processing / sluggish network response',   sessions: ['Laser Focus'],          startWith: 'Laser Focus' },
  accuracy:  { suggests: 'Poor discrimination / unstable processing',     sessions: ['Still Point'],           startWith: 'Still Point' },
  toj:       { suggests: 'Temporal processing weakness',                  sessions: ['Coordination 1'],        startWith: 'Coordination 1' },
  fatigue:   { suggests: 'Low cortical stamina',                          sessions: ['Gentle Movers'],         startWith: 'Gentle Movers' },
  plasticity:{ suggests: 'Reduced adaptability',                          sessions: ['Shifting Into Task'],    startWith: 'Shifting Into Task' },
  focus:     { suggests: 'Attentional inconsistency',                     sessions: ['Laser Focus'],           startWith: 'Laser Focus' },
};

// ── CRIS GOLD Quadrant → Session Strategy (LOCKED) ───
// Output rule: MAX 2 Core + 1 Optional + 1 Advanced per patient
// Order: Quadrant → Brain Gauge (if exists) → Condition (only if needed)
export const QUADRANT_SESSION_MAP = {
  Q1: { theme: 'High ELI + low Autonomic Nervous System capacity', priority: 'Calm first, stabilize, then rebuild',
        core: ['Calm Down', 'Peaceful Heart'], optional: ['Now Just Relax'], advanced: ['Alpha 10Hz'],
        flow: ['Calm Down', 'Peaceful Heart', 'Now Just Relax', 'Alpha 10Hz'] },
  Q2: { theme: 'High ELI + high Autonomic Nervous System capacity', priority: 'Discharge overload while preserving capacity',
        core: ['Emotional Flow', 'Shifting Into Task'], optional: ['Calm Down'], advanced: ['Gamma Gamma'],
        flow: ['Emotional Flow', 'Shifting Into Task', 'Calm Down', 'Gamma Gamma'] },
  Q3: { theme: 'Low ELI + low Autonomic Nervous System capacity', priority: 'Build reserve and adaptability',
        core: ['Gentle Movers', 'Alpha 8-12Hz'], optional: ['Beta 12-15Hz'], advanced: ['Focused Attention'],
        flow: ['Gentle Movers', 'Alpha 8-12Hz', 'Beta 12-15Hz', 'Focused Attention'] },
  Q4: { theme: 'Low ELI + high Autonomic Nervous System capacity', priority: 'Optimize performance / resilience',
        core: ['Laser Focus', 'Target Focus'], optional: ['Task Mode'], advanced: ['Gamma 30-40Hz'],
        flow: ['Laser Focus', 'Target Focus', 'Task Mode', 'Gamma 30-40Hz'] },
};

// ── Special Conditions (add to report only if clinically needed) ──
// Do not exceed total session limits: 2 Core + 1 Optional + 1 Advanced
export const CONDITION_SESSION_MAP = {
  'Anxiety / High Stress': { core: ['Calm Down', 'Peaceful Heart'], optional: ['Now Just Relax'], advanced: ['Alpha 10Hz'] },
  'Brain Fog / Cognitive Slowness': { core: ['Crystal Clear', 'Laser Focus'], optional: ['Beta 15Hz'], advanced: ['Focused Attention'] },
  'TBI / Concussion': { core: ['Coordination 1', 'Coordination 2'], optional: ['Pattern Exercise'], advanced: ['Gamma Processor'] },
  'Sleep Issues': { core: ['Now Just Relax', 'Peaceful Heart'], optional: ['Delta 1-4Hz'], advanced: ['Theta 4Hz'] },
  'Burnout / Exhaustion': { core: ['Gentle Movers', 'Unwind'], optional: ['Kick Back'], advanced: ['Recover from Burnout'] },
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
