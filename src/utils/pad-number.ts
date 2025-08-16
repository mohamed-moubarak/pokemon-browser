const padNumber = (num: number, length: number): string => {
  return num.toString().padStart(length, '0');
};

export default padNumber;
