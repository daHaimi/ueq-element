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

export type UeqConfiguration = {
  [key in UeqEmotionType]: UeqModality[];
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
  [UeqEmotionType.Plus]: []
};

export {
  UeqContents
};
