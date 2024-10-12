import React, { useState } from 'react'
import './style.css'
import { Radio, Select, Table } from 'antd'
import { Search } from 'lucide-react';
import { parse, unparse } from 'papaparse';
import { toast } from 'react-toastify';
function TransactionTable({transactions,addTransaction,fetchTransactions}) {
    const [search, setSearch]=useState("");
    const[typeFilter,setTypeFilter]=useState("");
    const[sortKey,setsortKey]=useState("");
    const columns=[
        {
            title:"Name",
            dataIndex:"name",
            key:"name"
        },
        {
            title:"Amount",
            dataIndex:"amount",
            key:"amount"
        },
        {
            title:"Tag",
            dataIndex:"tag",
            key:"tag"
        },
        {
            title:"Type",
            dataIndex:"type",
            key:"type"
        },
        {
            title:"Date",
            dataIndex:"date",
            key: "date"
        }
    ];
    let filteredTransactions=transactions.filter((item)=>{
        const matchesName = item.name.toLowerCase().includes(search.toLowerCase());
        const matchesType =
          typeFilter === "all" || typeFilter === "" || item.type === typeFilter;
        return matchesName && matchesType;
    });

    const sortedTransactions = [...filteredTransactions].sort((a, b) => {
        if (sortKey === "date") {
          return new Date(a.date) - new Date(b.date);
        } else if (sortKey === "amount") {
          return a.amount - b.amount;
        } else {
          return 0;
        }
      });
      function exportCSV(){
        var csv=unparse({
            fields:["name","type","amount","tag","date"],
            data:transactions,
        });
        var data = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
        var csvURL = window.URL.createObjectURL(data);
        const tempLink = document.createElement('a');
        tempLink.href = csvURL;
        tempLink.setAttribute('download', 'transactions.csv');
        tempLink.click();

      }

      function importFromCsv(event) {
        event.preventDefault();
      
        const file = event.target.files[0];
        if (!file) {
          toast.error("Please select a CSV file to import.");
          return;
        }
      
        parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: async function (results) {
            console.log("Parsed Results: ", results.data);  // Log parsed data
            if (results.errors.length) {
              console.log("CSV Parsing Errors: ", results.errors); // Log errors
              toast.error("Error parsing CSV file. Please check the format.");
              return;
            }
      
            const parsedData = results.data;
      
            let successCount = 0;
            let failCount = 0;
      
            try {
              for (const transaction of parsedData) {
                // Add some validation checks
                if (!transaction.name || !transaction.amount || !transaction.date || !transaction.type) {
                  console.log("Invalid transaction: ", transaction);  // Log invalid transactions
                  failCount++;
                  continue;
                }
      
                const newTransaction = {
                  name: transaction.name,
                  type: transaction.type,
                  amount: parseInt(transaction.amount, 10),
                  tag: transaction.tag || "N/A",  // Add default value for missing tags
                  date: new Date(transaction.date).toISOString(),  // Ensure date format
                };
      
                console.log("Adding transaction: ", newTransaction); // Log transaction being added
                await addTransaction(newTransaction, true);
                successCount++;
              }
      
              toast.success(`${successCount} transactions imported successfully!`);
              if (failCount > 0) {
                toast.warn(`${failCount} transactions failed to import.`);
              }
              fetchTransactions();  // Refresh transactions after import
              event.target.value = '';  // Reset file input
      
            } catch (error) {
              console.log("Error while adding transactions: ", error);  // Log any error
              toast.error(`Error adding transactions: ${error.message}`);
            }
          },
        });
      }
      
  return (
    <div
    style={{
      width: "100%",
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
        <Search/>
        <input
          placeholder="Search by Name..."
          onChange={(e) => setSearch(e.target.value)}
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
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginBottom: "1rem",
        }}
      >
        <h1 className='text-xl font-bold mr-5'>My Transactions</h1>

        <Radio.Group
          className="input-radio"
          onChange={(e) => setsortKey(e.target.value)}
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
          <button className="block w-full rounded border border-blue-600 px-4 py-2 text-sm font-medium text-black hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto hover:text-white" onClick={exportCSV}>
            Export to CSV
          </button>
          <label for="file-csv" className="block w-full rounded border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-black focus:outline-none focus:ring active:text-opacity-75 sm:w-auto cursor-pointer">
            Import from CSV
          </label>
          <input
            onChange={importFromCsv}
            id="file-csv"
            type="file"
            accept=".csv"
            required
            style={{ display: "none" }}
          />
        </div>
      </div>

      <Table columns={columns} dataSource={sortedTransactions} />
    </div>
  </div>
  )
}

export default TransactionTable
