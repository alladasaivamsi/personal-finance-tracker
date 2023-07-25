import React from "react";
import "./Card.css";
import { Card, Row } from "antd";

function Cards({
  income,
  expenses,
  totalBalance,
  showExpenseModal,
  showIncomeModal,
}) {
  return (
    <div className="dashboard">
      <Row className="my-row">
        <Card className="my-card" title="Current Balance">
          <p>&#8377; {totalBalance}</p>
          <button className="resetBalanceBtn">Reset Balance</button>
        </Card>
        <Card className="my-card" title="Total Income">
          <p>&#8377; {income}</p>
          <button className="incomeBtn" onClick={showIncomeModal}>
            Add Income
          </button>
        </Card>
        <Card className="my-card" title="Total Expenses">
          <p>&#8377; {expenses}</p>
          <button className="expenseBtn" onClick={showExpenseModal}>
            Add Expense
          </button>
        </Card>
      </Row>
    </div>
  );
}

export default Cards;
