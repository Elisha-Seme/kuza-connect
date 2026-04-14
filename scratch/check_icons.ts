import * as Phosphor from '@phosphor-icons/react';
console.log(Object.keys(Phosphor).filter(k => k.startsWith('Text')).join(', '));
console.log('SplitHorizontal:', !!(Phosphor as any).SplitHorizontal);
console.log('FlipHorizontal:', !!(Phosphor as any).FlipHorizontal);
