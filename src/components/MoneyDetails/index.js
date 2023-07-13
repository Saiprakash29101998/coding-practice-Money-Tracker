import './index.css'

const MoneyDetails = props => {
  const {tileDetails} = props

  const {imgUrl, type, amount} = tileDetails
  let bgClass
  let dataTestId
  if (type === 'Income') {
    bgClass = 'bg-blue'
    dataTestId = 'incomeAmount'
  } else if (type === 'Expenses') {
    bgClass = 'bg-violet'
    dataTestId = 'expensesAmount'
  } else {
    bgClass = 'bg-green'
    dataTestId = 'balanceAmount'
  }

  return (
    <li className={`money-details-item ${bgClass}`}>
      <img src={imgUrl} alt={type.toLowerCase()} className="money-icon" />
      <div className="amount-container">
        <p className="type">Your {type}</p>
        <p className="rupees" data-testid={dataTestId}>
          Rs {amount}
        </p>
      </div>
    </li>
  )
}

export default MoneyDetails
