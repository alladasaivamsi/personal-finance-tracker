import { Radio, Select, Table } from "antd";
import React, { useState } from "react";
import "./TransactionsTable.css";
import searchImg from "../../assets/search.svg";
import { parse } from "papaparse";
import { toast } from "react-toastify";
const { Option } = Select;

function TransactionsTable({
  transactions,
  addTransaction,
  fetchTransactions,
  exportToCsv,
}) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");

  function importFromCsv(event) {
    event.preventDefault();
    try {
      parse(event.target.files[0], {
        header: true,
        complete: async function (results) {
          for (const transaction of results.data) {
            console.log("Transactions", transaction);
            const newTransaction = {
              ...transaction,
              amount: parseFloat(transaction.amount),
            };
            await addTransaction(newTransaction, true);
          }

          console.log("results : ", results);
        },
      });
      toast.success("All Transactions Added");
      fetchTransactions();
      event.target.files = null;
    } catch (e) {
      toast.error(e.message);
    }
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
  ];

  const filteredTransactions = transactions.filter((transaction) => {
    const searchMatch = search
      ? transaction.name.toLowerCase().includes(search.toLowerCase())
      : true;
    const typeMatch = typeFilter ? transaction.type === typeFilter : true;

    return searchMatch && typeMatch;
  });

  console.log(filteredTransactions);
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  });

  const dataSource = sortedTransactions.map((transaction, index) => ({
    key: index,
    ...transaction,
  }));

  return (
    <div
      style={{
        width: "96%",
        padding: "0rem 2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <div className="input-flex">
          <img src={searchImg} width="16" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search By Name"
          />
        </div>
        <Select
          className="select-input"
          onChange={(value) => setTypeFilter(value)}
          value={typeFilter}
          placeholder="Filter"
          allowClear
        >
          <Option value="">All</Option>
          <Option value="income">Income</Option>
          <Option value="expense">Expense</Option>
        </Select>
      </div>
      <div className="my-table">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            marginBottom: "1rem",
            gap: "10%",
          }}
        >
          <h2>My Transactions</h2>

          <Radio.Group
            className="input-radio"
            onChange={(e) => setSortKey(e.target.value)}
            value={sortKey}
          >
            <Radio.Button value="">No Sort</Radio.Button>
            <Radio.Button value="date">Sort by Date</Radio.Button>
            <Radio.Button value="amount">Sort by Amount</Radio.Button>
          </Radio.Group>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              width: "400px",
            }}
          >
            <button className="btn" onClick={exportToCsv}>
              Export to CSV
            </button>
            <label for="file-csv" className="btn btn-blue">
              Import from CSV
            </label>
            <input
              onChange={importFromCsv}
              className="fileCSV"
              id="file-csv"
              type="file"
              accept=".csv"
              required
              style={{ display: "none" }}
            />
          </div>
        </div>

        <Table columns={columns} dataSource={dataSource} />
      </div>
    </div>
  );
}
export default TransactionsTable;
