export const lerp = (start: number, end: number, amt: number) => {
  return (1 - amt) * start + amt * end;
};

export const clamp = (num: number, min: number, max: number) => {
  return Math.min(Math.max(num, min), max);
};
