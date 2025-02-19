import "./ExpenseItem.css";

function ExpenseItem() {

  


  return (
    <div className="expense-item">
      <div>March 28th 2024</div>
      <div className="expense-item_description">
        <h2>Car Insurence</h2>
        <div className="expense-item_price">$245.22</div>
      </div>
    </div>
  );
}

export default ExpenseItem;
