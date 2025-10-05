import { allMinorArcana } from './minorArcana';

export interface TarotCard {
    id: string;
    name: string;
    arcana: 'major' | 'minor';
    suit?: 'wands' | 'cups' | 'swords' | 'pentacles';
    number?: number;
    keywords: string[];
    uprightMeaning: string;
    reversedMeaning: string;
    upright_meaning?: string; // For compatibility
    reversed_meaning?: string; // For compatibility
    description: string;
    element?: string;
    zodiac?: string;
    numerology?: number;
    image?: string;
  }
  
  export const majorArcana: TarotCard[] = [
    {
      id: 'fool',
      name: 'The Fool',
      arcana: 'major',
      numerology: 0,
      keywords: ['beginnings', 'innocence', 'spontaneity', 'free spirit'],
      uprightMeaning: 'New beginnings, having faith in the future, being inexperienced, not knowing what to expect, having beginner\'s luck, improvisation and believing in the universe.',
      reversedMeaning: 'Being taken advantage of, inconsideration, foolishness, lack of commitment, poor judgement and naivety.',
      description: 'The Fool represents new beginnings, having faith in the future, being inexperienced, not knowing what to expect.',
      element: 'Air'
    },
    {
      id: 'magician',
      name: 'The Magician',
      arcana: 'major',
      numerology: 1,
      keywords: ['manifestation', 'resourcefulness', 'power', 'inspired action'],
      uprightMeaning: 'Skill, diplomacy, address, subtlety, self-confidence, will, power, manifestation.',
      reversedMeaning: 'Manipulation, poor planning, untapped talents, illusion, deception.',
      description: 'The Magician is associated with action, self-confidence, individuality, willpower and the ability to manifest desires.',
      element: 'Air',
      zodiac: 'Mercury'
    },
    {
      id: 'high-priestess',
      name: 'The High Priestess',
      arcana: 'major',
      numerology: 2,
      keywords: ['intuition', 'sacred knowledge', 'divine feminine', 'subconscious'],
      uprightMeaning: 'Intuition, higher powers, mystery, subconscious mind, inner voice.',
      reversedMeaning: 'Hidden agendas, disconnected from intuition, withdrawal and silence.',
      description: 'The High Priestess represents wisdom, serenity, knowledge and understanding.',
      element: 'Water',
      zodiac: 'Moon'
    },
    {
      id: 'empress',
      name: 'The Empress',
      arcana: 'major',
      numerology: 3,
      keywords: ['femininity', 'beauty', 'nature', 'nurturing', 'abundance'],
      uprightMeaning: 'Fertility, femininity, beauty, nature, abundance, nurturing.',
      reversedMeaning: 'Creative block, dependence on others, emptiness, nosiness.',
      description: 'The Empress is traditionally associated with maternal influence, fertility and abundance.',
      element: 'Earth',
      zodiac: 'Venus'
    },
    {
      id: 'emperor',
      name: 'The Emperor',
      arcana: 'major',
      numerology: 4,
      keywords: ['authority', 'establishment', 'structure', 'father figure'],
      uprightMeaning: 'Authority, father-figure, structure, solid foundation, protection.',
      reversedMeaning: 'Tyranny, rigidity, coldness, domination, excessive control.',
      description: 'The Emperor represents a powerful leader who demands respect and authority.',
      element: 'Fire',
      zodiac: 'Aries'
    },
    {
      id: 'hierophant',
      name: 'The Hierophant',
      arcana: 'major',
      numerology: 5,
      keywords: ['tradition', 'conformity', 'morality', 'ethics', 'belief systems'],
      uprightMeaning: 'Religion, group identification, conformity, tradition, beliefs.',
      reversedMeaning: 'Restriction, challenging the status quo, non-conformity.',
      description: 'The Hierophant represents traditional values and structured belief systems.',
      element: 'Earth',
      zodiac: 'Taurus'
    },
    {
      id: 'lovers',
      name: 'The Lovers',
      arcana: 'major',
      numerology: 6,
      keywords: ['love', 'harmony', 'relationships', 'values', 'choices'],
      uprightMeaning: 'Love, harmony, relationships, values alignment, choices.',
      reversedMeaning: 'Disharmony, imbalance, misalignment of values, discord.',
      description: 'The Lovers represents relationships and choices, harmony and balance.',
      element: 'Air',
      zodiac: 'Gemini'
    },
    {
      id: 'chariot',
      name: 'The Chariot',
      arcana: 'major',
      numerology: 7,
      keywords: ['control', 'willpower', 'victory', 'determination', 'success'],
      uprightMeaning: 'Control, willpower, victory, assertion, determination.',
      reversedMeaning: 'Lack of control, lack of direction, aggression, obstacles.',
      description: 'The Chariot represents conquest, victory and overcoming opposition through confidence and control.',
      element: 'Water',
      zodiac: 'Cancer'
    },
    {
      id: 'strength',
      name: 'Strength',
      arcana: 'major',
      numerology: 8,
      keywords: ['strength', 'courage', 'patience', 'control', 'compassion'],
      uprightMeaning: 'Inner strength, courage, patience, control, compassion.',
      reversedMeaning: 'Weakness, self-doubt, lack of self-discipline, vulnerability.',
      description: 'Strength represents inner strength, patience, compassion and courage.',
      element: 'Fire',
      zodiac: 'Leo'
    },
    {
      id: 'hermit',
      name: 'The Hermit',
      arcana: 'major',
      numerology: 9,
      keywords: ['soul searching', 'introspection', 'being alone', 'inner guidance'],
      uprightMeaning: 'Soul searching, introspection, being alone, inner guidance.',
      reversedMeaning: 'Isolation, loneliness, withdrawal, anti-social, restrictive.',
      description: 'The Hermit represents soul searching, introspection and inner guidance.',
      element: 'Earth',
      zodiac: 'Virgo'
    },
    {
      id: 'wheel-of-fortune',
      name: 'Wheel of Fortune',
      arcana: 'major',
      numerology: 10,
      keywords: ['good luck', 'karma', 'life cycles', 'destiny', 'turning point'],
      uprightMeaning: 'Good luck, karma, life cycles, destiny, a turning point.',
      reversedMeaning: 'Bad luck, lack of control, clinging to control, unwelcome changes.',
      description: 'The Wheel of Fortune represents luck, karma, life cycles and destiny.',
      element: 'Fire',
      zodiac: 'Jupiter'
    },
    {
      id: 'justice',
      name: 'Justice',
      arcana: 'major',
      numerology: 11,
      keywords: ['justice', 'fairness', 'truth', 'cause and effect', 'law'],
      uprightMeaning: 'Justice, fairness, truth, cause and effect, law.',
      reversedMeaning: 'Unfairness, lack of accountability, dishonesty, legal complications.',
      description: 'Justice represents fairness, truth, cause and effect, and law.',
      element: 'Air',
      zodiac: 'Libra'
    },
    {
      id: 'hanged-man',
      name: 'The Hanged Man',
      arcana: 'major',
      numerology: 12,
      keywords: ['suspension', 'restriction', 'letting go', 'sacrifice', 'new perspective'],
      uprightMeaning: 'Suspension, restriction, letting go, sacrifice, new perspective.',
      reversedMeaning: 'Resistance to change, stalling, needless sacrifice, fear of sacrifice.',
      description: 'The Hanged Man represents suspension, letting go, sacrifice and gaining new perspective.',
      element: 'Water',
      zodiac: 'Neptune'
    },
    {
      id: 'death',
      name: 'Death',
      arcana: 'major',
      numerology: 13,
      keywords: ['endings', 'beginnings', 'change', 'transformation', 'transition'],
      uprightMeaning: 'Endings, beginnings, change, transformation, transition.',
      reversedMeaning: 'Resistance to change, inability to move on, fear of new beginnings.',
      description: 'Death represents endings, transformation and new beginnings.',
      element: 'Water',
      zodiac: 'Scorpio'
    },
    {
      id: 'temperance',
      name: 'Temperance',
      arcana: 'major',
      numerology: 14,
      keywords: ['balance', 'moderation', 'patience', 'purpose', 'meaning'],
      uprightMeaning: 'Balance, moderation, patience, purpose, meaning.',
      reversedMeaning: 'Imbalance, excess, lack of long-term vision, lack of purpose.',
      description: 'Temperance represents balance, moderation, patience and purpose.',
      element: 'Fire',
      zodiac: 'Sagittarius'
    },
    {
      id: 'devil',
      name: 'The Devil',
      arcana: 'major',
      numerology: 15,
      keywords: ['bondage', 'addiction', 'sexuality', 'materialism', 'attachment'],
      uprightMeaning: 'Bondage, addiction, sexuality, materialism, attachment.',
      reversedMeaning: 'Detachment, breaking free, power reclaimed, freedom.',
      description: 'The Devil represents bondage, addiction, materialism and attachment.',
      element: 'Earth',
      zodiac: 'Capricorn'
    },
    {
      id: 'tower',
      name: 'The Tower',
      arcana: 'major',
      numerology: 16,
      keywords: ['disaster', 'upheaval', 'sudden change', 'revelation', 'chaos'],
      uprightMeaning: 'Disaster, upheaval, sudden change, revelation, chaos.',
      reversedMeaning: 'Avoidance of disaster, fear of change, delaying the inevitable.',
      description: 'The Tower represents sudden upheaval, disaster, revelation and chaos.',
      element: 'Fire',
      zodiac: 'Mars'
    },
    {
      id: 'star',
      name: 'The Star',
      arcana: 'major',
      numerology: 17,
      keywords: ['hope', 'faith', 'renewal', 'spirituality', 'healing'],
      uprightMeaning: 'Hope, faith, renewal, spirituality, healing, tranquility.',
      reversedMeaning: 'Lack of faith, despair, discouragement, insecurity.',
      description: 'The Star represents hope, faith, renewal and spiritual guidance.',
      element: 'Air',
      zodiac: 'Aquarius'
    },
    {
      id: 'moon',
      name: 'The Moon',
      arcana: 'major',
      numerology: 18,
      keywords: ['illusion', 'fear', 'anxiety', 'intuition', 'dreams'],
      uprightMeaning: 'Illusion, fear, anxiety, intuition, dreams, subconscious.',
      reversedMeaning: 'Release of fear, repressed emotion, inner confusion.',
      description: 'The Moon represents illusion, fear, anxiety, intuition and the subconscious.',
      element: 'Water',
      zodiac: 'Pisces'
    },
    {
      id: 'sun',
      name: 'The Sun',
      arcana: 'major',
      numerology: 19,
      keywords: ['joy', 'success', 'celebration', 'positivity', 'vitality'],
      uprightMeaning: 'Joy, success, celebration, positivity, fun, warmth, vitality.',
      reversedMeaning: 'Inner child, feeling down, overly optimistic, pessimism.',
      description: 'The Sun represents joy, success, celebration and vitality.',
      element: 'Fire',
      zodiac: 'Sun'
    },
    {
      id: 'judgement',
      name: 'Judgement',
      arcana: 'major',
      numerology: 20,
      keywords: ['reflection', 'reckoning', 'awakening', 'renewal', 'purpose'],
      uprightMeaning: 'Reflection, reckoning, awakening, renewal, purpose, absolution.',
      reversedMeaning: 'Lack of self-awareness, doubt, self-loathing, harsh judgement.',
      description: 'Judgement represents reflection, reckoning, awakening and renewal.',
      element: 'Fire',
      zodiac: 'Pluto'
    },
    {
      id: 'world',
      name: 'The World',
      arcana: 'major',
      numerology: 21,
      keywords: ['completion', 'accomplishment', 'travel', 'fulfillment', 'harmony'],
      uprightMeaning: 'Completion, accomplishment, travel, fulfillment, harmony.',
      reversedMeaning: 'Lack of closure, incomplete goals, stagnation, emptiness.',
      description: 'The World represents completion, accomplishment, fulfillment and harmony.',
      element: 'Earth',
      zodiac: 'Saturn'
    }
  ];
  
  // Helper function to get a random card
  export function getRandomCard(): TarotCard {
    return majorArcana[Math.floor(Math.random() * majorArcana.length)]!;
  }
  
  // Helper function to get card by ID
  export function getCardById(id: string): TarotCard | undefined {
    return majorArcana.find(card => card.id === id);
  }
  
  // Get today's card (consistent for the whole day)
  export function getDailyCard(): TarotCard {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const index = seed % majorArcana.length;
    return majorArcana[index]!;
  }
  
  // Get multiple random cards for a spread
  export function getCardSpread(count: number): TarotCard[] {
    const shuffled = [...majorArcana].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }
  
  // Draw cards for reading with optional reversal
  export function drawCards(count: number = 1): any[] {
    // Combine major and minor arcana
    const fullDeck = [...majorArcana, ...allMinorArcana];
    const deck = [...fullDeck];
    const selected: TarotCard[] = [];
    
    // Fisher-Yates shuffle and select
    for (let i = 0; i < Math.min(count, deck.length); i++) {
      const randomIndex = Math.floor(Math.random() * deck.length);
      selected.push(deck[randomIndex]!);
      deck.splice(randomIndex, 1);
    }
    
    return selected.map(card => {
      const isReversed = Math.random() > 0.7; // 30% chance of reversal
      return {
        ...card,
        // Add ALL necessary properties for compatibility
        upright_meaning: card.uprightMeaning,
        reversed_meaning: card.reversedMeaning,
        reversed: isReversed,
        isReversed: isReversed
      };
    });
  }
  
  export default majorArcana;