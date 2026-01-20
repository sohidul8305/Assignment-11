import React, { useState, useEffect } from 'react';
import { 
  FaCalculator, 
  FaMoneyBillWave, 
  FaPercent, 
  FaCalendarAlt,
  FaChartLine,
  FaDownload,
  FaRedo,
  FaInfoCircle,
  FaDollarSign,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Loancalculator = () => {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTerm, setLoanTerm] = useState(60); // months
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [paymentSchedule, setPaymentSchedule] = useState([]);
  const [loanType, setLoanType] = useState('personal');
  const [downPayment, setDownPayment] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Loan type presets
  const loanTypes = {
    personal: { name: 'Personal Loan', maxAmount: 5000000, minRate: 7.5, maxRate: 15 },
    home: { name: 'Home Loan', maxAmount: 10000000, minRate: 6.5, maxRate: 9.5 },
    business: { name: 'Business Loan', maxAmount: 20000000, minRate: 8, maxRate: 12 },
    education: { name: 'Education Loan', maxAmount: 3000000, minRate: 6, maxRate: 10 },
    car: { name: 'Car Loan', maxAmount: 4000000, minRate: 7, maxRate: 11 }
  };

  // Calculate EMI
  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, loanTerm, downPayment]);

  const calculateEMI = () => {
    const principal = loanAmount - downPayment;
    const monthlyRate = interestRate / 12 / 100;
    const termMonths = loanTerm;
    
    // EMI formula
    const emiValue = principal * monthlyRate * 
      Math.pow(1 + monthlyRate, termMonths) / 
      (Math.pow(1 + monthlyRate, termMonths) - 1);
    
    const totalPaymentValue = emiValue * termMonths;
    const totalInterestValue = totalPaymentValue - principal;
    
    setEmi(emiValue);
    setTotalInterest(totalInterestValue);
    setTotalPayment(totalPaymentValue);
    
    // Generate payment schedule
    generatePaymentSchedule(principal, monthlyRate, termMonths, emiValue);
  };

  const generatePaymentSchedule = (principal, monthlyRate, termMonths, emi) => {
    let balance = principal;
    const schedule = [];
    
    for (let month = 1; month <= termMonths; month++) {
      const interest = balance * monthlyRate;
      const principalPaid = emi - interest;
      balance -= principalPaid;
      
      schedule.push({
        month,
        principal: principalPaid,
        interest,
        balance: Math.max(balance, 0),
        total: emi
      });
    }
    
    setPaymentSchedule(schedule);
  };

  const handleLoanTypeChange = (type) => {
    setLoanType(type);
    const preset = loanTypes[type];
    setLoanAmount(Math.min(loanAmount, preset.maxAmount));
    setInterestRate(preset.minRate + (preset.maxRate - preset.minRate) / 2);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleReset = () => {
    setLoanAmount(500000);
    setInterestRate(8.5);
    setLoanTerm(60);
    setDownPayment(0);
  };

  const handleQuickSelect = (amount) => {
    setLoanAmount(amount);
  };

  const quickAmounts = [100000, 500000, 1000000, 5000000, 10000000];

  // Chart data for visualization
  const chartData = paymentSchedule.slice(0, 12).map(payment => ({
    month: `Month ${payment.month}`,
    principal: payment.principal,
    interest: payment.interest,
    balance: payment.balance
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 py-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <FaCalculator className="text-3xl text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Loan <span className="text-primary">Calculator</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Calculate your monthly EMI, total interest, and payment schedule for different loan types
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Panel */}
          <div className="lg:col-span-2">
            <div className="card bg-white shadow-xl">
              <div className="card-body">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <FaCalculator /> Loan Calculator
                  </h2>
                  <div className="flex gap-2 mt-2 md:mt-0">
                    <button 
                      onClick={() => setShowAdvanced(!showAdvanced)}
                      className="btn btn-outline btn-sm"
                    >
                      {showAdvanced ? 'Simple Mode' : 'Advanced Mode'}
                    </button>
                    <button 
                      onClick={handleReset}
                      className="btn btn-outline btn-sm gap-2"
                    >
                      <FaRedo /> Reset
                    </button>
                  </div>
                </div>

                {/* Loan Type Selection */}
                <div className="mb-8">
                  <label className="label">
                    <span className="label-text font-semibold">Loan Type</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(loanTypes).map(([key, value]) => (
                      <button
                        key={key}
                        onClick={() => handleLoanTypeChange(key)}
                        className={`btn btn-sm ${loanType === key ? 'btn-primary' : 'btn-outline'}`}
                      >
                        {value.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Amount Selection */}
                <div className="mb-6">
                  <label className="label">
                    <span className="label-text font-semibold">Quick Amount Select</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {quickAmounts.map(amount => (
                      <button
                        key={amount}
                        onClick={() => handleQuickSelect(amount)}
                        className={`btn btn-xs ${loanAmount === amount ? 'btn-primary' : 'btn-outline'}`}
                      >
                        {formatCurrency(amount)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Sliders */}
                <div className="space-y-6">
                  {/* Loan Amount */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="label-text font-semibold flex items-center gap-2">
                        <FaMoneyBillWave /> Loan Amount
                      </label>
                      <span className="text-xl font-bold text-primary">
                        {formatCurrency(loanAmount)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10000"
                      max={loanTypes[loanType].maxAmount}
                      step="10000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="range range-primary"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>৳10,000</span>
                      <span>{formatCurrency(loanTypes[loanType].maxAmount)}</span>
                    </div>
                  </div>

                  {/* Interest Rate */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="label-text font-semibold flex items-center gap-2">
                        <FaPercent /> Interest Rate (% per annum)
                      </label>
                      <span className="text-xl font-bold text-primary">
                        {interestRate.toFixed(2)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={loanTypes[loanType].minRate}
                      max={loanTypes[loanType].maxRate}
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="range range-secondary"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>{loanTypes[loanType].minRate}%</span>
                      <span>{loanTypes[loanType].maxRate}%</span>
                    </div>
                  </div>

                  {/* Loan Term */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="label-text font-semibold flex items-center gap-2">
                        <FaCalendarAlt /> Loan Term
                      </label>
                      <span className="text-xl font-bold text-primary">
                        {loanTerm} months ({Math.floor(loanTerm/12)} years {loanTerm%12} months)
                      </span>
                    </div>
                    <input
                      type="range"
                      min="6"
                      max="360"
                      step="6"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      className="range range-accent"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>6 months</span>
                      <span>30 years</span>
                    </div>
                  </div>

                  {/* Advanced Options */}
                  {showAdvanced && (
                    <div className="mt-6 p-4 bg-base-100 rounded-lg">
                      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <FaInfoCircle /> Advanced Options
                      </h3>
                      
                      {/* Down Payment */}
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <label className="label-text font-semibold">
                            Down Payment
                          </label>
                          <span className="text-lg font-bold text-primary">
                            {formatCurrency(downPayment)}
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max={loanAmount}
                          step="10000"
                          value={downPayment}
                          onChange={(e) => setDownPayment(Number(e.target.value))}
                          className="range range-info"
                        />
                        <div className="flex justify-between text-sm text-gray-500 mt-1">
                          <span>৳0</span>
                          <span>{formatCurrency(loanAmount)}</span>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                          Down payment percentage: {((downPayment / loanAmount) * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Chart Section */}
            <div className="card bg-white shadow-xl mt-8">
              <div className="card-body">
                <h3 className="card-title mb-4 flex items-center gap-2">
                  <FaChartLine /> Payment Breakdown (First 12 Months)
                </h3>
                <div className="h-64 md:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [formatCurrency(value), 'Amount']} />
                      <Legend />
                      <Line type="monotone" dataKey="principal" stroke="#8884d8" strokeWidth={2} />
                      <Line type="monotone" dataKey="interest" stroke="#82ca9d" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="space-y-8">
            {/* Summary Card */}
            <div className="card bg-white shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-6 text-center">Loan Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-primary/5 rounded-lg">
                    <div>
                      <div className="text-sm text-gray-500">Monthly EMI</div>
                      <div className="text-2xl font-bold text-primary">{formatCurrency(emi)}</div>
                    </div>
                    <FaMoneyBillWave className="text-3xl text-primary/50" />
                  </div>

                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <div>
                      <div className="text-sm text-gray-500">Principal Amount</div>
                      <div className="text-xl font-bold text-green-600">{formatCurrency(loanAmount - downPayment)}</div>
                    </div>
                    <FaDollarSign className="text-3xl text-green-500/50" />
                  </div>

                  <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
                    <div>
                      <div className="text-sm text-gray-500">Total Interest</div>
                      <div className="text-xl font-bold text-yellow-600">{formatCurrency(totalInterest)}</div>
                    </div>
                    <FaPercent className="text-3xl text-yellow-500/50" />
                  </div>

                  <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                    <div>
                      <div className="text-sm text-gray-500">Total Payment</div>
                      <div className="text-xl font-bold text-purple-600">{formatCurrency(totalPayment)}</div>
                    </div>
                    <FaChartLine className="text-3xl text-purple-500/50" />
                  </div>
                </div>

                <div className="divider"></div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-base-100 rounded-lg">
                    <div className="text-sm text-gray-500">Interest % of Total</div>
                    <div className="text-lg font-bold">
                      {((totalInterest / totalPayment) * 100).toFixed(1)}%
                    </div>
                  </div>
                  <div className="text-center p-3 bg-base-100 rounded-lg">
                    <div className="text-sm text-gray-500">Monthly Interest</div>
                    <div className="text-lg font-bold">
                      {formatCurrency(totalInterest / loanTerm)}
                    </div>
                  </div>
                </div>

                <button className="btn btn-primary w-full mt-6 gap-2">
                  <FaDownload /> Download Report
                </button>
              </div>
            </div>

            {/* Comparison Card */}
            <div className="card bg-white shadow-xl">
              <div className="card-body">
                <h3 className="card-title mb-4">Rate Comparison</h3>
                <div className="space-y-3">
                  {[7, 8.5, 10, 12].map(rate => (
                    <div 
                      key={rate}
                      className={`flex justify-between items-center p-3 rounded-lg cursor-pointer transition-all ${
                        interestRate === rate 
                          ? 'bg-primary text-white' 
                          : 'bg-base-100 hover:bg-base-200'
                      }`}
                      onClick={() => setInterestRate(rate)}
                    >
                      <div className="flex items-center gap-2">
                        <FaPercent />
                        <span className="font-medium">{rate}%</span>
                      </div>
                      <div>
                        <span className="text-sm">
                          EMI: {formatCurrency(
                            (loanAmount - downPayment) * (rate/12/100) * 
                            Math.pow(1 + (rate/12/100), loanTerm) / 
                            (Math.pow(1 + (rate/12/100), loanTerm) - 1)
                          )}
                        </span>
                      </div>
                      {interestRate === rate && (
                        <div className="animate-pulse">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tips Card */}
            <div className="card bg-white shadow-xl">
              <div className="card-body">
                <h3 className="card-title mb-4">💡 Tips for Better Rates</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <FaArrowUp className="text-green-500 mt-1" />
                    <span>Higher credit score can reduce interest rates by 1-2%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaArrowDown className="text-blue-500 mt-1" />
                    <span>Shorter loan terms typically have lower interest rates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaInfoCircle className="text-yellow-500 mt-1" />
                    <span>Compare rates from multiple lenders before deciding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaMoneyBillWave className="text-purple-500 mt-1" />
                    <span>Larger down payments can secure better loan terms</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Schedule Table (Responsive) */}
        <div className="card bg-white shadow-xl mt-8">
          <div className="card-body">
            <h3 className="card-title mb-4">Payment Schedule (First Year)</h3>
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Principal</th>
                    <th>Interest</th>
                    <th>Total Payment</th>
                    <th>Remaining Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentSchedule.slice(0, 12).map(payment => (
                    <tr key={payment.month}>
                      <td className="font-medium">Month {payment.month}</td>
                      <td>{formatCurrency(payment.principal)}</td>
                      <td>{formatCurrency(payment.interest)}</td>
                      <td className="font-bold">{formatCurrency(payment.total)}</td>
                      <td>{formatCurrency(payment.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8 text-gray-600">
          <p className="text-sm">
            Note: This calculator provides estimates only. Actual loan terms may vary based on 
            creditworthiness and lender policies.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loancalculator;