import Color from 'color';

export const darkenColor = colorCode => {
  const white = new Color('white');
  let color = new Color(colorCode);
  while (color.contrast(white) < 6) {
    color = color.darken(0.1);
  }
  return color;
};
