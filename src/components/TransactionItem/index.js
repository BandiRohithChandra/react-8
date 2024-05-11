// Write your code here
import './index.css'

const TransactionItem = props => {
  const {transactionDetails, handleDeleteTransaction} = props
  const {title, amount, type, id} = transactionDetails

  const deleteTransaction = () => {
    handleDeleteTransaction(id)
  }

  return (
    <li className="transaction-container">
      <p>{title}</p>
      <p>{amount}</p>
      <p>{type}</p>
      <button type="button" data-testid="delete" onClick={deleteTransaction}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem
