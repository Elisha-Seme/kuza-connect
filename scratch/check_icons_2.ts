import * as Phosphor from '@phosphor-icons/react';
console.log(Object.keys(Phosphor).filter(k => k.includes('Contrast')).join(', '));
console.log(Object.keys(Phosphor).filter(k => k.includes('CircleHalf')).join(', '));
console.log(Object.keys(Phosphor).filter(k => k.includes('Selection')).join(', '));
console.log('Contrast exists:', !!(Phosphor as any).Contrast);
