import './index.css'

const TransactionItem = props => {
  const {transaction, onClickDelete, transactionTypeOptions} = props
  const {id, title, amount, type} = transaction
  const transactionTypeList = transactionTypeOptions.filter(
    eachItem => eachItem.optionId === type,
  )
  const {displayText} = transactionTypeList[0]
  const onDelete = () => {
    onClickDelete(id)
  }
  return (
    <li className="history-item-container">
      <p className="history-item-title">{title}</p>
      <p className="history-item-amount">Rs {amount}</p>
      <p className="history-item-type">{displayText}</p>
      <button
        type="button"
        onClick={onDelete}
        className="delete-button"
        data-testid="delete"
      >
        <img
          className="delete-icon"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem
