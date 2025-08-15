export const padNumber = (num: number, length: number): string => {
  return num.toString().padStart(length, '0');
};
