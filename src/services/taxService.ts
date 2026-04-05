export const calculateTaxes = (salary: number, jurisdiction: any) => {
  const federalTax = salary * (jurisdiction.federalRate || 0.15);
  const stateTax = salary * (jurisdiction.stateRate || 0.05);
  const localTax = salary * (jurisdiction.localRate || 0.01);
  const totalTax = federalTax + stateTax + localTax;
  
  return {
    federalTax,
    stateTax,
    localTax,
    totalTax,
    netSalary: salary - totalTax
  };
};
