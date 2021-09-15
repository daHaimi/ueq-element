export enum UeqEmotionType {
  Full = 'Full',
  Short = 'Short',
  Plus = 'Plus'
}

export interface UeqItem {
  name: string;
  low: string;
  high: string;
}

export type UeqConfiguration = {
  [key in UeqEmotionType]: UeqItem[];
};

const UeqContents : UeqConfiguration = {
  [UeqEmotionType.Full]: [],
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
