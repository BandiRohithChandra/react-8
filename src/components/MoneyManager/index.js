import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    title: '',
    amount: '',
    transactions: [],
    transactionType: transactionTypeOptions[0].optionId,
    totalBalance: 0,
    totalExpenses: 0,
    totalIncome: 0,
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amount: event.target.value})
  }

  onChangeTransaction = event => {
    this.setState({transactionType: event.target.value})
  }

  handleTransaction = event => {
    event.preventDefault()
    const {title, amount, transactionType, transactions} = this.state
    const newTransaction = {
      id: uuidv4(),
      title,
      amount: parseFloat(amount),
      type: transactionType,
    }

    const updatedTransaction = [...transactions, newTransaction]
    const updatedTotalIncome =
      transactionType === 'INCOME'
        ? this.state.totalIncome + parseFloat(amount)
        : this.state.totalIncome
    const updatedTotalExpenses =
      transactionType === 'EXPENSES'
        ? this.state.totalExpenses + parseFloat(amount)
        : this.state.totalExpenses
    const updatedTotalBalance = updatedTotalIncome - updatedTotalExpenses

    this.setState({
      transactions: updatedTransaction,
      title: '',
      amount: '',
      totalIncome: updatedTotalIncome,
      totalBalance: updatedTotalBalance,
      totalExpenses: updatedTotalExpenses,
    })
  }

  handleDeleteTransaction = (id, amount, type) => {
    const updatedTransactions = this.state.transactions.filter(
      transaction => transaction.id !== id,
    )
    const updatedTotalIncome =
      type === 'INCOME'
        ? this.state.totalIncome - amount
        : this.state.totalIncome
    const updatedTotalExpenses =
      type === 'EXPENSES'
        ? this.state.totalExpenses - amount
        : this.state.totalExpenses
    const updatedTotalBalance = updatedTotalIncome - updatedTotalExpenses

    this.setState({
      transactions: updatedTransactions,
      totalIncome: updatedTotalIncome,
      totalExpenses: updatedTotalExpenses,
      totalBalance: updatedTotalBalance,
    })
  }

  render() {
    const {title, amount, transactions, transactionType} = this.state
    return (
      <div>
        <div className="first-container">
          <h1 className="first-heading">Hi, Richard</h1>
          <p className="money-content">
            Welcome back to your <span className="span-el">Money Manager</span>
          </p>
        </div>

        <ul>
          <MoneyDetails transactions={transactions} />
        </ul>
        <div className="main-container">
          <div>
            <form className="form-container" onSubmit={this.handleTransaction}>
              <h1 className="main-heading">Add Transaction</h1>
              <label className="label" htmlFor="Title">
                TITLE
              </label>
              <input
                value={title}
                id="Title"
                onChange={this.onChangeTitle}
                placeholder="TITLE"
                className="inputEl"
              />
              <label htmlFor="Amount" className="label">
                AMOUNT
              </label>
              <input
                value={amount}
                id="Amount"
                onChange={this.onChangeAmount}
                placeholder="AMOUNT"
                className="inputEl"
              />
              <label>TYPE</label>
              <select
                value={transactionType}
                onChange={this.onChangeTransaction}
              >
                {transactionTypeOptions.map(option => (
                  <option key={option.optionId} value={option.optionId}>
                    {option.displayText}
                  </option>
                ))}
              </select>
              <button type="submit" className="button">
                Add
              </button>
            </form>
          </div>
          <div>
            <h1>History</h1>
            <div className="container">
              <p className="details">Title</p>
              <p className="details">Amount</p>
              <p className="details">Type</p>
            </div>
            <ul>
              {transactions.map(transaction => (
                <TransactionItem
                  key={transaction.id}
                  transactionDetails={transaction}
                  handleDeleteTransaction={this.handleDeleteTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
