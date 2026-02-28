/**
 * RUBIMED PSE — Hardcoded Chavita & Emvita Descriptions
 * Source: "Practitioner's Guide — Psychosomatic Energetics" by Dr. Reimar Banis
 * © Rubimed USA Inc. / Privia Naturals LLC
 *
 * These are LOCKED descriptions — the AI must never generate its own.
 */

// ── CHAVITA (Chakra Remedies 1–7) ──────────────────────────────────────────

export const CHAVITA_DESCRIPTIONS = {
  1: {
    chakra: 'Root Chakra',
    theme: 'Grounding, Independence, Basic Trust',
    description: 'The first energy center in the lower pelvis connects a person to the ground through the legs, just as it stands emotionally for grounding and independence. A disturbed first Chakra is associated with insufficient grounding, disrupted self-confidence, identity problems and a lack of basic trust.',
    conflicts: [1, 2, 3, 4],
  },
  2: {
    chakra: 'Sacral Chakra',
    theme: 'Self-Realization, Fight or Flight, Energy Investment',
    description: 'The second Chakra has to do with the realization of one\'s own interests in a social context. Should one fight or flee, invest more or less energy to attain one\'s goals? Whoever does not know this becomes restless and disoriented, fights things out convulsively or compensates weakness with a show of strength.',
    conflicts: [5, 6, 7],
  },
  3: {
    chakra: 'Solar Plexus Chakra',
    theme: 'Satiation, Satisfaction, Willpower',
    description: 'The third Chakra has to do with becoming sated and satisfied by absorbing the outside world; one is nourished materially and emotionally from outside and thereby satisfied. One takes what one needs, asserting one\'s will and getting one\'s way. When the third Chakra is disturbed, it leads to aggression inhibition and frustration. One withdraws from the outside world and constantly wants more than one gets.',
    conflicts: [8, 9, 10, 11],
  },
  4: {
    chakra: 'Heart Chakra',
    theme: 'Loving Trust, Self-Realization, Mental Power',
    description: 'The heart represents the energetic center of the "Self", an emotional core of individual perception and personal development, having to do with loving trust, mental power and playful-spontaneous self-realization. When the heart center is disturbed, it leads to a feeling of total retreat, of being captive, and of crippling and (over the longer term) strenuous lack of orientation, behind which are concealed great fears of being hurt or completely destroyed.',
    conflicts: [12, 13, 14, 15, 16],
  },
  5: {
    chakra: 'Throat Chakra',
    theme: 'Reason vs. Emotion, Communication, Expression',
    description: 'The neck, as control center in the confrontation between reason and emotion, rational and irrational, duty and desire, has, as an energy center, two conflicts which are, from a content standpoint, quite contrary. If the confrontation tends toward the rational pole, then a conflict forms with an overexcited hyperactivity; if it tends toward the emotional pole, it gives rise to a conflict with a great inner emptiness and rigidity.',
    conflicts: [17, 18],
  },
  6: {
    chakra: 'Third Eye Chakra',
    theme: 'Perception, Coordination, Inner-Outer Balance',
    description: 'In the sixth energy Center, a person\'s individual needs are coordinated with the outside world. As in the second Chakra, this involves a complex regulatory system and, ultimately, the "fight or flight" decision. When this harmonious equilibrium breaks down, it gives rise to the typical conflicts of the sixth Chakra: restlessness, tension, discomfort, timidity, egotism or, as compensation, subservience.',
    conflicts: [19, 20, 21, 22, 23, 24],
  },
  7: {
    chakra: 'Crown Chakra',
    theme: 'Realistic Perception, Meaning, Spiritual Integration',
    description: 'The seventh Chakra presents a very accurate portrayal of the world, depicting one\'s own place in the world sensibly and true to scale. Via this energy center, the content of attitudes and feelings are properly balanced out, so that everything is realistically represented. Disturbances of the seventh Chakra lead to misperceptions of reality in the form of imaginary and unreal idealizations, and unacknowledged pain that the world is much worse than one had thought. Acquisitiveness and mistrust are typical emotions of the seventh Chakra: one prioritizes the facade of possessions above reality and basically thinks the worst of everyone.',
    conflicts: [25, 26, 27, 28],
  },
};

// ── EMVITA (Emotional Remedies 1–28) ────────────────────────────────────────

export const EMVITA_DESCRIPTIONS = {
  1: {
    name: 'Independence',
    chakra: 1,
    subtitle: 'A feeling of "not being good enough", feelings of inferiority, disrupted basic trust, often puberty conflicts.',
    description: 'One feels not good enough, has identity problems. Primary emotional orientation, in the sense of sufficient self-confidence is lacking. Basic trust has been lost or was never there. A frequent tendency to melancholy. The world is experienced as threatening and unreliable.',
  },
  2: {
    name: 'Lack of Concentration',
    chakra: 1,
    subtitle: 'Easily distracted, unable to concentrate, unfocused, daydreaming.',
    description: 'One has difficulty staying focused and centered. The mind wanders easily and one is constantly distracted. There is a lack of grounding that makes sustained mental effort difficult. One tends to daydream and lose track of what one is doing.',
  },
  3: {
    name: 'At the Mercy of, Helpless',
    chakra: 1,
    subtitle: 'Weak-willed, helpless as a child, bedwetting, encopresis, incontinence.',
    description: 'One feels helpless and in every way paralyzed. The stronger the demands, the more unable one feels to arrive at any kind of solution. Life is experienced as a never-ending struggle. In the past, especially during childhood, one was seldom allowed to be oneself and always felt completely dependent upon others. One has never been seen as what one truly is. In a social environment, one only feels accepted when living up to role expectations. One tends to live as a puppet and a willing tool for others. One has learned from experience that exercising one\'s talents, strengths and needs will be punished; therefore, one underrates oneself totally. One tends to lethargy and immobility, has the tendency to dither, be undecided, play for time, leave things up in the air, postpone everything to the last minute or, in the extreme case, give up altogether.',
  },
  4: {
    name: 'Extremely Self-Controlled',
    chakra: 1,
    subtitle: 'Numbness, suppression of joie de vivre, exaggerated sense of duty and responsibility. In the extreme, destructive aggressiveness, perversions, psychopathic.',
    description: 'One does not allow oneself to grow and live one\'s own life. One was held back from the normal childhood joy of expansion and was possibly too rigidly disciplined. There are often problems with sexual identity. One would like to salvage a destroyed family environment by being well-behaved. One is governed by discipline which was applied too early and too much, and even as a child one acts like an adult. One tends to suppress feelings and impulses. One blocks one\'s emotions or those of others. Only compulsion, rationality and good behavior have top priority. One expects one\'s own strict view of life from others as well. One is afraid of yielding to spontaneity, freedom and joy in life, because this is associated with great danger to oneself and others.',
  },
  5: {
    name: 'Hectic, Nervous',
    chakra: 2,
    subtitle: 'Hectic, hyperkinetic symptoms, upset, nervous, driven and restless.',
    description: 'Nervousness and drivenness, upset and restless. High physical tension with a tendency to react with physical symptoms (somatization) to inner stress. One engages in hypernormal activity, is ambitious and often hyperactive. Tendency to obsessive perfection. One has the depressing impression of never properly coping and hardly ever being able to finish anything properly. One courts the approval of others, because one sets one\'s internal bar too high. One feels responsible for the lives of others. One believes in only having a right to live by pushing oneself to peak performance. If one doesn\'t stay in harness and alert, one fears losing control. Incapable of rest and relaxation. One wants to be everywhere at once so as not to miss anything and in order to extract the most out of life.',
  },
  6: {
    name: 'Perseverance',
    chakra: 2,
    subtitle: 'Wanting to be self-controlled and show no weakness despite a feeling of helplessness; tendency to express anxiety through physical symptoms.',
    description: 'Tendency to clothe anxiety in physical symptoms. One tries to maintain control and show no weakness despite deep helplessness. The perseverance pattern masks underlying fear and vulnerability with stoic endurance.',
  },
  7: {
    name: 'Show of Strength, Stubborn',
    chakra: 2,
    subtitle: 'Goes beyond one\'s limits; always showing strength despite secretly feeling inferior; obstinate, arrogant, cocky.',
    description: 'One\'s actual existence does not match up with one\'s self-image. Secretly, one feels uncertain and inferior, but conceals it behind a facade of strong self-confidence. One does not let the outside world see what it\'s like inside. The actual symptoms and problems remain in the dark, as one confuses and deceives others. One gets oneself tangled up in contradictions. There is a constant alternation between feelings of strength and weakness, thereby seeming erratic and obscure to others. A possible variation of this behavior consists in cutting others down to size in order to magnify oneself. The large external stresses and actual inner strength contrast sharply.',
  },
  8: {
    name: 'Isolated',
    chakra: 3,
    subtitle: 'Joyless, feeling abandoned, unhappy, self-pitying.',
    description: 'Emotionally, one lives on an island, as it were, surrounded by strangers. One would like to make contact but cannot get close to the others. One feels isolated, like an outcast, although there are many people all around. One lacks the capability to communicate with others in a satisfactory manner. The resulting feeling of isolation leads to inner paralysis and lethargy. Therefore, one does not even begin to rebel against the intolerable state of affairs. One becomes emotionally very quiet and lifeless.',
  },
  9: {
    name: 'Pent-up Emotions',
    chakra: 3,
    subtitle: 'Extremely pent-up destructive rage, all too ready to conform and sacrifice, in the extreme sudden outbursts of rage, going berserk.',
    description: 'One tries to win the sympathy and affection of others with an especially pleasant and obliging personality. One constantly adapts oneself to the needs of others and tries to satisfy their desires. In the process, one denies one\'s own goals, which leads to subliminal resentment and, in time, to a mountain of unfulfilled desires. What others think of one is extremely important. One\'s victim role irresistibly attracts victimizers. One unwittingly manages to get others to behave egotistically towards counterparts. One tends to exceed one\'s limits and overtax oneself. One dreams about being richly rewarded for this sometime in the future, but this never happens in reality and simply provokes more disappointment. One suffers from a nagging feeling of dissatisfaction and great rage. One is quick to get annoyed and angry, one\'s frustration limit is quite low. Thus, one often remains stuck in anger instead of daring to try a new approach.',
  },
  10: {
    name: 'Wanting More',
    chakra: 3,
    subtitle: 'Insatiable due to a nagging feeling of dissatisfaction and greed, constantly dissatisfied, co-opting, extremely obsessed with power, dictatorial, ruthless, driven, overly aggressive.',
    description: 'Due to a nagging feeling of dissatisfaction and a lack of happy feelings, one constantly wants more out of life. At bottom, one feels desperately poor and needy. In one\'s experience, everything in life has to be worked hard for; if one has something and wants to become something in life, then nothing comes free. What one has or has achieved, however, is never enough.',
  },
  11: {
    name: 'Craving Good Feelings',
    chakra: 3,
    subtitle: 'Deeply dissatisfied, frustrated, profoundly unhappy, in the extreme addiction, anorexia, bulimia.',
    description: 'One is deeply dissatisfied and empty. The unhappiness of frustration easily gives rise to a counterreaction which consists of refusing to notice one\'s frustration and to act carefree and lighthearted. The feeling of constant emotional hunger develops into unreal fantasies and a nagging feeling of drivenness. Without being aware of it, one tends to bring about situations which repeat frustrating experiences and, for instance, lead to rejection. Many lapse into a subservient role so as to experience satisfaction indirectly via the satisfaction of others, but that\'s not truly fulfilling, so that one becomes even more unhappy. Sometimes tendency to addiction and dependencies of various kinds.',
  },
  12: {
    name: 'Mental Overexertion',
    chakra: 4,
    subtitle: 'Because trust is disrupted, constant thoughts of problems and failure; difficulty gathering one\'s thoughts.',
    description: 'One thinks that an effort of will can bring all moods and emotions under control. The need for control is a higher priority than the spontaneous expression of emotions. However, due to the fact that over 80% of human communication is nonverbal \u2014 i.e. takes place subconsciously \u2014 one overburdens oneself constantly and cannot maintain control over the multitude of one\'s own impulses. One tires easily and has the feeling that one is no longer able to concentrate at all. One suspects that one has taken on what is "actually an impossible task" and tends to flee inward. This tendency has a paralyzing effect and leads to the inability to keep the mind fully focused on a subject. Thoughts of problems or failure predominate, and there is a lack of trust in oneself and others.',
  },
  13: {
    name: 'Withdrawn, Deeply Injured',
    chakra: 4,
    subtitle: 'Gutshot, deeply injured and withdrawn, uninterested, self-involved, in the extreme autistically egocentric, bad regression.',
    description: 'One feels deeply offended and believes that one can never again get over a severe injury and offense. Rejection by another person, who does not reciprocate these feelings, has been a severe blow. One not only feels injured but also humiliated and ridiculed. One withdraws anxiously from other people because one expects nothing good to come of it. One begins to put up walls around one\'s tender soul, and pulls in like a snail into its shell.',
  },
  14: {
    name: 'Introverted, Compulsive',
    chakra: 4,
    subtitle: 'Cramped and tense; fear of going crazy; difficulty breathing, inability to take a deep breath; wounded and withdrawn, feeling of isolation behind walls of hopelessness.',
    description: 'One has isolated oneself from the outside world and feels trapped behind walls, hopeless. One\'s thoughts go around in circles and one feels more and more miserable. The isolation from others does not feel protective; instead one feels under overwhelming compulsion and permanent pressure. One\'s mental freedom of motion is extremely restricted, such that one feels suspicious and fearful. The suffocating feeling can be felt physically, emotionally or mentally. Often, the cause of the emotional withdrawal is a huge emotional shock which, at the time, feels insurmountable and too frightening. One then walls oneself into an emotional fortress \u2014 which, however, over the longer term is not experienced as protection but rather as compulsion.',
  },
  15: {
    name: 'Apprehensive',
    chakra: 4,
    subtitle: 'Eerie-frightful, abandoned, extremely anxious, phobias, woebegone and full of sorrow.',
    description: 'One feels abandoned and extremely anxious. The world feels eerie and frightful. Phobias and deep sorrow dominate the emotional landscape. One is full of apprehension about the future and feels woebegone, as if left alone to face overwhelming threats.',
  },
  16: {
    name: 'Panic',
    chakra: 4,
    subtitle: 'My heart is breaking, as if overrun by a dreadful huge wave, panic attacks, fear of death.',
    description: 'One feels overwhelmed by an overpowering fear of death like a gigantic tidal wave. One cannot put up any resistance whatsoever to this powerful fear, but rather feels totally paralyzed. It feels like the final hour has come and everything is conclusively over, so that one can no longer gather any clear thoughts. One seems incapable of escaping the inevitable catastrophe. In one\'s imagination, the fear takes on monstrous dimensions.',
  },
  17: {
    name: 'Emotional Emptiness',
    chakra: 5,
    subtitle: 'Empty of thoughts and feelings, no initiative, indifferent, emotional emptiness, uncaring, emotions feel frozen.',
    description: 'The neck, the "gateway to feelings", can choke off rising emotions in such a manner as to bring about a condition of complete emotional rigidity. One is then completely dominated and guided by the head, as if nothing really affected one anymore \u2014 almost like a robot. However, the reality is that the suppressed feelings have simply been deep-frozen and have not really gone away. Often the rising feelings are bound up with emotional shocks and strong inner terror, so that the emotional play-dead reflex instinctively guarantees survival. With this kind of emotional block, one has very limited access to one\'s feelings, while rationality seems to continue working undisturbed. Many patients with this conflict feel a great inner emptiness that can have a very depressive feeling-tone and last for a very long time.',
  },
  18: {
    name: 'Rushed',
    chakra: 5,
    subtitle: 'Impulsive, overexcited, stuttering; the feeling of living a life that is false at its core; thoughts outrunning actions, thereby causing misunderstandings on the communications level.',
    description: 'In the neck region (gateway to emotions) strong impulses and drives can build up like a torrent, so that a frightened feeling rises up and one feels literally overrun. Since too many intense impulses and contradictory desires are all active at the same time, one comes across to others as hasty, overexcited and ill-organized. Many compensate their inner anxieties with exertion, perfectionism and control in the form of compulsions. Those affected suffer from not being able to make themselves clearly understood. They keep trying to make others finally grasp what it\'s actually all about, talking ever faster. There also often arises an inner restlessness which is not noticed on the outside. People with the theme "Rushed" therefore often seem from the outside to be very cool and collected, because they\'re good at covering up their restlessness.',
  },
  19: {
    name: 'Timid, Faint-hearted',
    chakra: 6,
    subtitle: 'Not wanting to see things clearly, diplomatic, undecided, poor decision-making ability; fear of making a mistake, unwilling to see things clearly.',
    description: 'The actual underlying causes of indecisiveness are, one, the fear of making mistakes and, two, the hope that there might be a better option. Maneuvering and indecision dominate. One avoids clear positions and commitments out of fear that any decision could be wrong.',
  },
  20: {
    name: 'Self-sufficient',
    chakra: 6,
    subtitle: 'Narcissistic, self-absorbed, egotistical, mood swings.',
    description: 'One views the outside world exclusively as an extension of oneself and therefore above all revolves around one\'s own issues and desires. One believes that one can do everything by oneself best of all. One\'s self-satisfaction can degenerate into narcissism, yet also be concealed by a display of modesty. Deep inside, one is unsure of oneself and feels unloved, which one tries to compensate with exaggerated self-love. Some people with this conflict suffer from severe mood swings and are irritable because of the resulting intense emotional tension.',
  },
  21: {
    name: 'Physical Overexertion',
    chakra: 6,
    subtitle: 'Restlessly tense; chewing fingernails; sympathicotonically overdriven, irritable; unable to relax; physically restless, constantly overburdened.',
    description: 'One feels rushed and exhausted because one is overstressed. One constantly exceeds one\'s limits to a harmful degree. One has the feeling of always having to be on one\'s toes and of not daring to grant oneself very much rest and relaxation. One suppresses one\'s own needs and goes to great lengths to be the best. Way down deep, one feels unloved and worthless, so that one has to make an effort to be of service to others. One has a tendency to be too driven and tense, which in the extreme case can lead to auto-aggressive displacement activity. Sometimes there are long-lasting pain states and other alarm signals in the form of somatization or behavioral disorders which point to permanent emotional overstress.',
  },
  22: {
    name: 'Restless, Mentally Hyperactive',
    chakra: 6,
    subtitle: 'Constant worry without letup, mental nervousness, restlessness due to constant drivenness and a torrent of thoughts, worries and uncertainty make it hard to breathe.',
    description: 'Inside, it\'s like being in a heavy current, whereby one\'s thoughts flow constantly and uncontrollably. Thoughts whirl nonstop through one\'s head, leading to a condition of inner unrest and drivenness, because one has too many worries and apprehensions. One would really like to deal with everything at once. One worries about missing something crucial. One has a constant feeling of uncertainty and great worrying, is irritable and feels driven.',
  },
  23: {
    name: 'Tense',
    chakra: 6,
    subtitle: 'Completely tensed up, helpless, impulsive, thoughts race ahead of actions, tics, inner tension due to high demands on oneself, subconscious fear of failure.',
    description: 'One feels constantly tensed up and incapable of relaxing. This can manifest itself in the form of involuntary tics, writer\'s cramp or muscle tension (e.g. of the cervical vertebrae) but also in a cramped speaking style, gnashing one\'s teeth and intestinal cramps. Sometimes, the tension manifests itself as overdone discipline and diligence. From the outside, such people often seem especially friendly and well-adjusted. The emotional background of the tension is due to an overly strict Superego. In many cases, an age-inappropriate degree of correctness and self-discipline was expected of one as a child. As with the other similar conflicts of the Brow Chakra, the tension is actually based on a fear of making mistakes. Basically, one is too unforgiving and strict with oneself even before any errors have been committed.',
  },
  24: {
    name: 'Uneasiness, Discomfort',
    chakra: 6,
    subtitle: 'Disturbing malaise on the somatic level, hopelessness, depressive tendency.',
    description: 'One feels unwell in one\'s own body, as if having to wear the wrong clothing, uncomfortable and annoying, which pinches and presses everywhere. The body is felt to be the source of indisposition, and in the extreme case, even of pain and suffering. There can be all manner of possible disruptive discomforts, such as feeling that the head or hands are too large, the neck muscles way too heavy, or the spinal column deformed. The prevailing mood varies from hopelessness all the way to distinct depression. One feels unbalanced, since everything is unpleasant and most of the body hurts. Due to the predominant somatic symptoms, the underlying depressive basic mood is often overlooked.',
  },
  25: {
    name: 'Mistrust',
    chakra: 7,
    subtitle: 'Withdrawn, grim, unwilling to give, lack of basic trust, obstinate, questioning everything, sometimes being too guileless and trusting.',
    description: 'Because of disappointing experiences, one believes that other people basically have it in for one. One imagines oneself surrounded by a hostile environment whose only goal is to inflict harm. In this process, one overlooks one\'s own part, projecting everything negative outward. People with this conflict sometimes put on an act of conspicuous innocence and are not careful enough, which makes it easier for them to be disappointed by others, which then simply reinforces the mistrust. If one is too mistrustful, then one is, deep in one\'s heart, truly hopeless and disappointed. One can often observe, in people with deep-seated mistrust, a fundamental lack of basic trust \u2014 everything is called into question; everything is analyzed with a critical eye and dissected into its component parts. Inside, one refuses to open oneself up emotionally, as if this would then put one at the complete mercy of someone or something.',
  },
  26: {
    name: 'Materialistic',
    chakra: 7,
    subtitle: 'Wanting everything for oneself, hard-nosed assertiveness, acquisitiveness, miserliness, hypochondria, poverty obsession, thinking about possessions, egotism; sees life as a permanent struggle for survival.',
    description: 'People with this conflict often have a great fear of change. They find it very difficult to let go of things and modes of behavior, or to give anything away. This possessiveness can also apply to "having" certain convictions, such as living in the belief that they are among the few who really "know what\'s what." One can amass knowledge or spiritual values or good deeds as possessions, but deep inside a nagging sense of frustration persists. One is constantly seeking and, way down deep, not really satisfied. There is often an extreme tendency to prioritize external relationships and the maintenance of a facade over inner values. In the worst case, it can even lead to an obsession with poverty as well as to acquisitiveness, miserliness and hard-nosed assertiveness.',
  },
  27: {
    name: 'Unwilling to Face Reality',
    chakra: 7,
    subtitle: 'Imagining things (visual, acoustic, olfactory); incapable of clear sensory perception; drugs, hallucinations, flight into dream worlds because reality is felt to be intolerable.',
    description: 'One cannot tolerate reality and therefore removes it from perception. One behaves like a good actor, seducing the audience into a strange, marvelously beautiful world, helping them to forget their own unhappiness \u2014 except that here audience and actor are one and the same. This is imagination running wild. Editing out reality can encompass some aspects of the real world, for example when one over- or underestimates the importance of another person. But one can also consider one\'s entire reality, including its negative aspects, to be so unpleasant that one flees into a dream world. Many people edit out parts of their inner or outer reality and flee into ersatz dream worlds. Underlying this are emotional misery and intolerable frustration which generate a gloomy and joyless fundamental feeling-tone in the overall emotional situation, from which one tries to escape for reasons of sheer survival.',
  },
  28: {
    name: 'Wrong Thinking',
    chakra: 7,
    subtitle: 'Obsessive, exaggerated mental fantasies, psychoses, false dogmas and overly rigid beliefs, deep-seated self-esteem problems.',
    description: 'Correct thinking leads to a consciousness in harmony both with outer and inner reality. On the other hand, if one cultivates erroneous thoughts which are condemned by the inner voice (the conscience of the true self), then one inevitably betrays oneself. The same thing happens when external reality is denied. The basic problem of wrong thinking is based on the refusal to acknowledge reality as such, in order to derive from it truthful and sensible laws of consciousness. One tends to think dogmatically and is preoccupied with particular convictions. One is not prepared to deviate from one\'s own opinion, even if that means having to put up with limitations and disadvantages.',
  },
};

/**
 * Get the full Chavita description for a given chakra number (1–7)
 */
export function getChavitaText(num) {
  const c = CHAVITA_DESCRIPTIONS[num];
  if (!c) return null;
  return `Chavita ${num} — ${c.chakra}: ${c.description}`;
}

/**
 * Get the full Emvita description for a given conflict number (1–28)
 */
export function getEmvitaText(num) {
  const e = EMVITA_DESCRIPTIONS[num];
  if (!e) return null;
  return `Emvita ${num} — ${e.name}: ${e.subtitle} ${e.description}`;
}

/**
 * Get both Chavita and Emvita text for a patient
 * @param {number} chavita - Chavita number (1–7)
 * @param {number} emvita  - Emvita number (1–28)
 * @returns {{ chavitaText, emvitaText, chavitaData, emvitaData }}
 */
export function getRubimedTexts(chavita, emvita) {
  return {
    chavitaText: getChavitaText(chavita),
    emvitaText:  getEmvitaText(emvita),
    chavitaData: CHAVITA_DESCRIPTIONS[chavita] || null,
    emvitaData:  EMVITA_DESCRIPTIONS[emvita]   || null,
  };
}
