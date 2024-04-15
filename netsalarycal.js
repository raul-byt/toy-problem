onst taxRates = [
  { lowerLimit: 0, upperLimit: 24000, rate: 0.10 },
  { lowerLimit: 24001, upperLimit: 32333, rate: 0.25 },
  { lowerLimit: 32334, upperLimit: 500000, rate: 0.30 },
  { lowerLimit: 500001, upperLimit: 800000, rate: 0.325 },
  { lowerLimit: 800001, upperLimit: 9600000, rate: 0.35 },
  { lowerLimit: 9600001, upperLimit: Infinity, rate: 0.35 }, // Assuming no upper limit for highest bracket
];

// Function to calculate PAYE tax based on provided table
function calculatePAYE(basicSalary) {
  // Iterate over tax brackets to find applicable bracket for the given basicSalary
  for (const bracket of taxRates) {
    if (basicSalary <= bracket.upperLimit) {
      // Calculate taxable income within the bracket
      const taxableIncome = Math.max(basicSalary - bracket.lowerLimit, 0);
      return taxableIncome * bracket.rate;
    }
  }

  // Handle unexpected cases (shouldn't reach here with the provided tax rates)
  console.error("Error: PAYE calculation failed for basic salary:", basicSalary);
  return 0; // Placeholder for error handling
}

// Function to calculate NHIF deduction
function calculateNHIFDeduction(basicSalary) {
  const nhifRates = {
    belowKsh5999: 150,
    aboveKsh5999: Math.min(basicSalary, 100000) * 0.0175, // Limited to maximum NHIF contribution
  };

  // Determine NHIF deduction based on basic salary
  return basicSalary < 6000 ? nhifRates.belowKsh5999 : nhifRates.aboveKsh5999;
}

// Function to calculate NSSF deduction
function calculateNSSFDeduction(basicSalary) {
  // NSSF rates (Tier I contribution) based on basic salary
  const nssfRates = {
    employee: Math.min(basicSalary, 7000) * 0.06, // Limited to Tier I contribution limit (as of Feb 2024)
  };

  // Return NSSF deduction
  return nssfRates.employee;
}

// Function to calculate Housing Levy deduction
function calculateHousingLevy(grossSalary) {
  // Housing Levy is a fixed percentage of gross salary
  return grossSalary * 0.015; // 1.5% of gross salary (employer and employee each contribute)
}

// Function to calculate net salary
function calculateNetSalary(basicSalary, benefits) {
  // Calculate gross salary by adding basic salary and benefits
  const grossSalary = basicSalary + benefits;
  // Calculate PAYE tax
  const payee = calculatePAYE(basicSalary);
  // Calculate NHIF deduction
  const nhifDeduction = calculateNHIFDeduction(basicSalary);
  // Calculate NSSF deduction
  const nssfDeduction = calculateNSSFDeduction(basicSalary);
  // Calculate Housing Levy deduction
  const housingLevy = calculateHousingLevy(grossSalary);
  // Calculate net salary
  const netSalary = grossSalary - payee - nhifDeduction - nssfDeduction - housingLevy;

  // Return salary 
  return {
    grossSalary,
    payee,
    nhifDeduction,
    nssfDeduction,
    housingLevy,
    netSalary,
  };
}

// Example usage: Prompt user for basic salary and benefits
const basicSalary = parseFloat(prompt("Enter basic salary: "));
const benefits = parseFloat(prompt("Enter benefits amount: "));

// Calculate and display salary details
const salaryDetails = calculateNetSalary(basicSalary, benefits);
console.log("Salary Details:");
console.log(`  Gross Salary: Ksh ${salaryDetails.grossSalary.toFixed(2)}`);
console.log(`  PAYE: Ksh ${salaryDetails.payee.toFixed(2)}`);
console.log(`  NHIF: Ksh ${salaryDetails.nhifDeduction.toFixed(2)}`);
console.log(`  NSSF: Ksh ${salaryDetails.nssfDeduction.toFixed(2)}`);
console.log(`  Housing Levy: Ksh ${salaryDetails.housingLevy.toFixed(2)}`);
console.log(`  NetSalary:  Ksh ${salaryDetails.netSalary.toFixed(2)}`);
