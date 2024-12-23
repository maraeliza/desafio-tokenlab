const isValidCNPJ = (cnpj) => {
  // Remove caracteres não numéricos
  cnpj = cnpj.replace(/[^\d]+/g, "");

  // Verifica se possui 14 dígitos e não é uma sequência repetida
  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) {
    return false;
  }

  const calculateDigit = (base) => {
    let weight =
      base.length === 12
        ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
        : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let sum = base
      .split("")
      .reduce((acc, num, idx) => acc + num * weight[idx], 0);
    let remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  // Calcula os dois dígitos verificadores
  const base = cnpj.slice(0, 12);
  const firstDigit = calculateDigit(base);
  const secondDigit = calculateDigit(base + firstDigit);

  // Verifica se os dígitos calculados batem com os do CNPJ
  return cnpj === base + firstDigit + secondDigit;
}


export default isValidCNPJ;
