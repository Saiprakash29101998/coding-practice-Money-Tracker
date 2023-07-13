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
class MoneyManager extends Component {
  state = {
    income: 0,
    expenses: 0,
    titleInput: '',
    balanceInput: '',
    type: 'INCOME',
    historyList: [],
  }

  onChangeTitle = e => {
    this.setState({
      titleInput: e.target.value,
    })
  }

  onChangeAmount = e => {
    this.setState({
      balanceInput: e.target.value,
    })
  }

  onChangeType = e => {
    this.setState({
      type: e.target.value,
    })
  }

  onClickAddButton = e => {
    e.preventDefault()
    const {titleInput, balanceInput, type} = this.state

    const newObj = {
      id: uuidv4(),
      title: titleInput,
      amount: parseInt(balanceInput),
      type,
    }
    console.log(type)
    this.setState(prevState => ({
      income:
        type === 'INCOME'
          ? prevState.income + parseInt(prevState.balanceInput)
          : prevState.income,
      expenses:
        type === 'EXPENSES'
          ? prevState.expenses + parseInt(prevState.balanceInput)
          : prevState.expenses,
      historyList: [...prevState.historyList, newObj],
      titleInput: '',
      balanceInput: '',
    }))
  }

  onClickDelete = id => {
    const {historyList} = this.state
    const deletedObjList = historyList.filter(eachItem => eachItem.id === id)
    const deletedObj = deletedObjList[0]
    this.setState(prevState => ({
      income:
        deletedObj.type === 'INCOME'
          ? prevState.income - deletedObj.amount
          : prevState.income,
      expenses:
        deletedObj.type === 'EXPENSES'
          ? prevState.expenses - deletedObj.amount
          : prevState.expenses,
      historyList: prevState.historyList.filter(eachItem => eachItem.id !== id),
    }))
  }

  render() {
    const {income, expenses, titleInput, balanceInput, historyList} = this.state

    const moneyTiles = [
      {
        id: uuidv4(),
        imgUrl:
          'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png',
        type: 'Balance',
        amount: income - expenses,
      },
      {
        id: uuidv4(),
        imgUrl:
          'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png',
        type: 'Income',
        amount: income,
      },
      {
        id: uuidv4(),
        imgUrl:
          'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png',
        type: 'Expenses',
        amount: expenses,
      },
    ]
    return (
      <div className="bg-container">
        <nav className="nav-container">
          <h1 className="nav-heading">Hi, Richard</h1>
          <p className="nav-paragraph">
            Welcome back to your{' '}
            <span className="nav-paragraph-blue">Money Manager</span>
          </p>
        </nav>
        <ul className="money-details-list-container">
          {moneyTiles.map(eachTile => (
            <MoneyDetails tileDetails={eachTile} key={eachTile.id} />
          ))}
        </ul>
        <div className="bottom-container">
          <form onSubmit={this.onClickAddButton} className="form-container">
            <h1 className="form-heading">Add Transaction</h1>
            <label htmlFor="title" className="title">
              TITLE
            </label>
            <input
              id="title"
              placeholder="TITLE"
              onChange={this.onChangeTitle}
              value={titleInput}
              className="title-input"
            />
            <label htmlFor="amount" className="amount">
              AMOUNT
            </label>
            <input
              id="amount"
              placeholder="AMOUNT"
              onChange={this.onChangeAmount}
              value={balanceInput}
              className="amount-input"
            />
            <label htmlFor="type" className="type">
              TYPE
            </label>
            <select
              id="type"
              onChange={this.onChangeType}
              className="type-input"
            >
              {transactionTypeOptions.map(eachItem => (
                <option value={eachItem.optionId} key={eachItem.optionId}>
                  {eachItem.displayText}
                </option>
              ))}
            </select>
            <button type="submit" className="add-button">
              Add
            </button>
          </form>
          <div className="history-container">
            <h1 className="history-heading">History</h1>
            <ul className="history-list">
              <li className="history-title-container">
                <p className="history-title">Title</p>
                <p className="history-amount">Amount</p>
                <p className="history-type">Type</p>
              </li>
              {historyList.map(eachTransaction => (
                <TransactionItem
                  transaction={eachTransaction}
                  key={eachTransaction.id}
                  onClickDelete={this.onClickDelete}
                  transactionTypeOptions={transactionTypeOptions}
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
