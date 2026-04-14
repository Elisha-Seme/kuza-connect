import * as Phosphor from '@phosphor-icons/react';
const icons = ['Cursor', 'Mouse', 'MouseLeftClick', 'Pause', 'Palette', 'Moon', 'MoonStars', 'SelectionInverse'];
icons.forEach(icon => {
  console.log(`${icon}:`, !!(Phosphor as any)[icon]);
});
