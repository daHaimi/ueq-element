export enum UeqEmotionType {
  Full = 'Full',
  Short = 'Short',
  Plus = 'Plus'
}

export interface UeqModality {
  name: string;
  low: string;
  high: string;
}

export interface PlusCategory {
  name: string;
  modalities: UeqModality[];
}

export type UeqConfiguration = {
  [key in UeqEmotionType]: UeqModality[] | PlusCategory[];
};

const UeqContents : UeqConfiguration = {
  [UeqEmotionType.Full]: [
    {
      name: 'enjoyableness',
      low: 'annoying',
      high: 'enjoyable'
    },
    {
      name: 'understandability',
      low: 'not understandable',
      high: 'understandable'
    },
    {
      name: 'creativity',
      low: 'creative',
      high: 'dull'
    },
    {
      name: 'learnability',
      low: 'easy to learn',
      high: 'difficult to learn'
    },
    {
      name: 'value',
      low: 'valuable',
      high: 'inferior'
    },
    {
      name: 'excitement',
      low: 'boring',
      high: 'exciting'
    },
    {
      name: 'interest',
      low: 'not interesting',
      high: 'interesting'
    },
    {
      name: 'predicatbility',
      low: 'unpredictable',
      high: 'predictable'
    },
    {
      name: 'speed',
      low: 'fast',
      high: 'slow'
    },
    {
      name: 'invention',
      low: 'conventional',
      high: 'inventive'
    },
    {
      name: 'support',
      low: 'obstructive',
      high: 'supportive'
    },
    {
      name: 'quality',
      low: 'good',
      high: 'bad'
    },
    {
      name: 'ease',
      low: 'complicated',
      high: 'easy'
    },
    {
      name: 'likability',
      low: 'unlikable',
      high: 'pleasing'
    },
    {
      name: 'novelty',
      low: 'usual',
      high: 'leading edge'
    },
    {
      name: 'pleasure',
      low: 'unpleasant',
      high: 'pleasant'
    },
    {
      name: 'security',
      low: 'secure',
      high: 'not secure'
    },
    {
      name: 'motivation',
      low: 'motivating',
      high: 'demotivating'
    },
    {
      name: 'expectations',
      low: 'meets expectations',
      high: 'does not meet expectations'
    },
    {
      name: 'efficiency',
      low: 'inefficient',
      high: 'efficient'
    },
    {
      name: 'clarity',
      low: 'confusing',
      high: 'clear'
    },
    {
      name: 'practicality',
      low: 'impractical',
      high: 'practical'
    },
    {
      name: 'organization',
      low: 'organized',
      high: 'cluttered'
    },
    {
      name: 'attractiveness',
      low: 'attractive',
      high: 'unattractive'
    },
    {
      name: 'friendliness',
      low: 'friendly',
      high: 'unfriendly'
    },
    {
      name: 'innovation',
      low: 'conservative',
      high: 'innovative'
    }
  ],
  [UeqEmotionType.Short]: [
    {
      name: 'support',
      low: 'obstructive',
      high: 'supportive'
    },
    {
      name: 'ease',
      low: 'complicated',
      high: 'easy'
    },
    {
      name: 'efficiency',
      low: 'inefficient',
      high: 'efficient'
    },
    {
      name: 'clarity',
      low: 'confusing',
      high: 'clear'
    },
    {
      name: 'excitement',
      low: 'boring',
      high: 'exciting'
    },
    {
      name: 'interest',
      low: 'not interesting',
      high: 'interesting'
    },
    {
      name: 'invention',
      low: 'conventional',
      high: 'inventive'
    },
    {
      name: 'novelty',
      low: 'usual',
      high: 'leading edge'
    }
  ],
  [UeqEmotionType.Plus]: [
    {
      name: 'attractiveness',
      modalities: [
        {
          name: 'enjoyableness',
          low: 'annoying',
          high: 'enjoyable'
        },
        {
          name: 'quality',
          low: 'good',
          high: 'bad'
        },
        {
          name: 'pleasure',
          low: 'unpleasant',
          high: 'pleasant'
        },
        {
          name: 'friendliness',
          low: 'friendly',
          high: 'unfriendly'
        },
      ]
    },
    {
      name: 'efficiency',
      modalities: [
        {
          name: 'speed',
          low: 'fast',
          high: 'slow'
        },
        {
          name: 'efficiency',
          low: 'inefficient',
          high: 'efficient'
        },
        {
          name: 'practicality',
          low: 'impractical',
          high: 'practical'
        },
        {
          name: 'organization',
          low: 'organized',
          high: 'cluttered'
        },
      ]
    },
    {
      name: 'perspicuity',
      modalities: [
        {
          name: 'understandability',
          low: 'not understandable',
          high: 'understandable'
        },
        {
          name: 'learnability',
          low: 'easy to learn',
          high: 'difficult to learn'
        },
        {
          name: 'ease',
          low: 'complicated',
          high: 'easy'
        },
        {
          name: 'clarity',
          low: 'confusing',
          high: 'clear'
        },
      ]
    },
    {
      name: 'dependability',
      modalities: [
        {
          name: 'predicatbility',
          low: 'unpredictable',
          high: 'predictable'
        },
        {
          name: 'support',
          low: 'obstructive',
          high: 'supportive'
        },
        {
          name: 'security',
          low: 'secure',
          high: 'not secure'
        },
        {
          name: 'expectations',
          low: 'does not meet expectations',
          high: 'meets expectations'
        },
      ]
    },
    {
      name: 'stimulation',
      modalities: [
        {
          name: 'interest',
          low: 'not interesting',
          high: 'interesting'
        },
        {
          name: 'excitement',
          low: 'boring',
          high: 'exciting'
        },
        {
          name: 'value',
          low: 'inferior',
          high: 'valuable'
        },
        {
          name: 'motivation',
          low: 'demotivating',
          high: 'motivating'
        },
      ]
    },
    {
      name: 'novelty',
      modalities: [
        {
          name: 'creativity',
          low: 'dull',
          high: 'creative'
        },
        {
          name: 'invention',
          low: 'conventional',
          high: 'inventive'
        },
        {
          name: 'novelty',
          low: 'usual',
          high: 'leading edge'
        },
        {
          name: 'innovation',
          low: 'conservative',
          high: 'innovative'
        }
      ]
    },
    {
      name: 'trust',
      modalities: [
        {
          name: 'security',
          low: 'insecure',
          high: 'secure'
        },
        {
          name: 'trustworthiness',
          low: 'untrustworthy',
          high: 'trustworthy'
        },
        {
          name: 'reliability',
          low: 'unreliable',
          high: 'reliable'
        },
        {
          name: 'transparency',
          low: 'non-transparent',
          high: 'transparent'
        }
      ]
    },
    {
      name: 'haptics',
      modalities: [
        {
          name: 'stability',
          low: 'unstable',
          high: 'stable'
        },
        {
          name: 'touch pleasure',
          low: 'unpleasant to the touch',
          high: 'pleasant to the touch'
        },
        {
          name: 'roughness',
          low: 'rough',
          high: 'smooth'
        },
        {
          name: 'friction',
          low: 'slippery',
          high: 'slip-resistant'
        }
      ]
    },
    {
      name: 'acoustics',
      modalities: [
        {
          name: 'volume',
          low: 'loud',
          high: 'quiet'
        },
        {
          name: 'harmony',
          low: 'dissonant',
          high: 'melodic'
        },
        {
          name: 'intensity',
          low: 'booming',
          high: 'dampened'
        },
        {
          name: 'sharpness',
          low: 'piercing',
          high: 'soft'
        }
      ]
    },
    {
      name: 'personalization',
      modalities: [
        {
          name: 'adjustability',
          low: 'not adjustable',
          high: 'adjustable'
        },
        {
          name: 'changeability',
          low: 'not changeable',
          high: 'changeable'
        },
        {
          name: 'flexibility',
          low: 'inflexible',
          high: 'flexible'
        },
        {
          name: 'extendability',
          low: 'not extendable',
          high: 'extendable'
        },
      ]
    },
    {
      name: 'usefulness',
      modalities: [
        {
          name: 'use',
          low: 'useless',
          high: 'useful'
        },
        {
          name: 'help',
          low: 'not helpful',
          high: 'helpful'
        },
        {
          name: 'benefit',
          low: 'not beneficial',
          high: 'beneficial'
        },
        {
          name: 'reward',
          low: 'not rewarding',
          high: 'rewarding'
        },
      ]
    },
    {
      name: 'value',
      modalities: [
        {
          name: 'value',
          low: 'inferior',
          high: 'valuable'
        },
        {
          name: 'presentability',
          low: 'not presentable',
          high: 'presentable'
        },
        {
          name: 'taste',
          low: 'tasteless',
          high: 'tasteful'
        },
        {
          name: 'elegance',
          low: 'not elegant',
          high: 'elegant'
        }
      ]
    },
    {
      name: 'visual aesthetics',
      modalities: [
        {
          name: 'beauty',
          low: 'ugly',
          high: 'beautiful'
        },
        {
          name: 'style',
          low: 'lacking style',
          high: 'stylish'
        },
        {
          name: 'appeal',
          low: 'unappealing',
          high: 'appealing'
        },
        {
          name: 'pleasure',
          low: 'unpleasant',
          high: 'pleasant'
        },
      ]
    },
    {
      name: 'intuitive use',
      modalities: [
        {
          name: 'ease',
          low: 'difficult',
          high: 'easy'
        },
        {
          name: 'logic',
          low: 'illogical',
          high: 'logical'
        },
        {
          name: 'plausibility',
          low: 'not plausible',
          high: 'plausible'
        },
        {
          name: 'conclusion',
          low: 'inconclusive',
          high: 'conclusive'
        },
      ]
    },
    {
      name: 'trustworthiness of content',
      modalities: [
        {
          name: 'use',
          low: 'useless',
          high: 'useful'
        },
        {
          name: 'plausibility',
          low: 'implausible',
          high: 'plausible'
        },
        {
          name: 'trust',
          low: 'untrustworthy',
          high: 'trustworthy'
        },
        {
          name: 'accuracy',
          low: 'inaccurate',
          high: 'accurate'
        },
      ]
    },
    {
      name: 'quality of content',
      modalities: [
        {
          name: 'actuality',
          low: '',
          high: ''
        },
        {
          name: 'interest',
          low: 'not interesting',
          high: 'interesting'
        },
        {
          name: 'preparation',
          low: 'poorly prepared',
          high: 'well prepared'
        },
        {
          name: 'comprehension',
          low: 'incomprehensible',
          high: 'comprehensible'
        }
      ]
    },
    {
      name: 'clarity',
      modalities: [
        {
          name: 'grouping',
          low: 'poorly grouped',
          high: 'well grouped'
        },
        {
          name: 'structure',
          low: 'unstructured',
          high: 'structured'
        },
        {
          name: 'order',
          low: 'disordered',
          high: 'ordered'
        },
        {
          name: 'organization',
          low: 'disorganized',
          high: 'organized'
        },
      ]
    },
    {
      name: 'response behavior',
      modalities: [
        {
          name: 'naturalness',
          low: 'artificial',
          high: 'natural'
        },
        {
          name: 'pleasure',
          low: 'unpleasant',
          high: 'pleasant'
        },
        {
          name: 'likability',
          low: 'unlikable',
          high: 'likable'
        },
        {
          name: 'entertainment',
          low: 'boring',
          high: 'entertaining'
        },
      ]
    },
    {
      name: 'response quality',
      modalities: [
        {
          name: 'suitability',
          low: 'inappropriate',
          high: 'suitable'
        },
        {
          name: 'use',
          low: 'useless',
          high: 'useful'
        },
        {
          name: 'help',
          low: 'not helpful',
          high: 'helpful'
        },
        {
          name: 'intelligence',
          low: 'unintelligent',
          high: 'intelligent'
        },
      ]
    },
    {
      name: 'comprehensibility',
      modalities: [
        {
          name: 'simplicity',
          low: 'complicated',
          high: 'simple'
        },
        {
          name: 'ambiguity',
          low: 'unambiguous',
          high: 'ambiguous'
        },
        {
          name: 'accuracy',
          low: 'inaccurate',
          high: 'accurate'
        },
        {
          name: 'explainability',
          low: 'enigmatic',
          high: 'explainable'
        }
      ]
    }
  ]
};

export {
  UeqContents
};
