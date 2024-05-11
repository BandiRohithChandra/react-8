// Write your code here

import './index.css'

const MoneyDetails = ({transactions}) => {
  let totalIncome = 0
  let totalExpenses = 0

  transactions.forEach(transaction => {
    if (transaction.type === 'INCOME') {
      totalIncome += transaction.amount
    } else if (transaction.type === 'EXPENSES') {
      totalExpenses += transaction.amount
    }
  })

  const totalBalance = totalIncome - totalExpenses
  return (
    <div className="money-container">
      <div className="balance-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
          className="logo-img"
        />
        <p>Your Balance</p>
        <p data-testid="balanceAmount">RS {totalIncome}</p>
      </div>
      <div className="income-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
          className="logo-img"
        />
        <p>Your Income</p>
        <p data-testid="incomeAmount">RS {totalExpenses}</p>
      </div>
      <div className="expenses-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
          className="logo-img"
        />
        <p>Your Expenses</p>
        <p data-testid="expensesAmount">RS {totalBalance}</p>
      </div>
    </div>
  )
}

export default MoneyDetails
