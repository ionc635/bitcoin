export const power = (num: number, exponent: number, prime: number) => {
  let n = 1;

  while (exponent) {
    if (exponent % 2 === 1) {
      n = n * num % prime;
    }
    exponent = Math.floor(exponent / 2);
    num = num * num % prime;
  }
  return n;
};

export const isPrime = (n: number) => {
  if (n === 1) {
    return false;
  }

  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
};
