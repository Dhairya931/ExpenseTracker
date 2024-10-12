import React, { useEffect, useState } from 'react';
import Header from '../../Header';
import Cards from '../../Cards';
import { Modal } from 'antd';
import AddIncomeModal from '../../Modals/AddIncome';
import AddExpenseModal from '../../Modals/AddExpense';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../../firebase';
import { toast } from 'react-toastify';
import TransactionTable from '../../Table/Table';
import Chart from '../../Charts';
import NoTransactions from '../../NoTransactions';

function Dashboard() {
  const [user] = useAuthState(auth);
  const [transactions, setTransactions] = useState([]);
  const [expenseModel, setExpenseModel] = useState(false);
  const [incomeModel, setIncomeeModel] = useState(false);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  // Debugging - Check if user is defined
  console.log('Current User:', user);

  const showexpenseModel = () => {
    setExpenseModel(true);
  };

  const showincomeModel = () => {
    setIncomeeModel(true);
  };

  const hideexpenseModel = () => {
    setExpenseModel(false);
  };

  const hideincomeModel = () => {
    setIncomeeModel(false);
  };

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };
    addTransaction(newTransaction);
  };

  async function addTransaction(transaction, many) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID: ", docRef.id);
      if (!many) {
        toast.success("Transaction Added!");
        let newArr = transactions;
        newArr.push(transaction);
        setTransactions(newArr);
        calculateBalance();
      }
    } catch (e) {
      console.error("Error adding document: ", e);
      if (!many) {
        toast.error("Couldn't add transaction");
      }
    }
  }

  async function fetchTransactions() {
    if (user) {
      console.log('Fetching transactions for user:', user.uid);
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionArray = [];
      querySnapshot.forEach((doc) => {
        transactionArray.push(doc.data());
      });
      setTransactions(transactionArray);
      console.log(transactionArray);
      toast.success("Transactions Fetched!!");
    }
  }

  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user]);

  useEffect(() => {
    if (transactions.length > 0) {
      calculateBalance();
    }
  }, [transactions]);

  function calculateBalance() {
    let incomeTotal = 0;
    let expenseTotal = 0;
    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else if (transaction.type === "expense") {
        expenseTotal += transaction.amount;
      }
    });
    setBalance(incomeTotal - expenseTotal);
    setIncome(incomeTotal);
    setExpense(expenseTotal);
  }

  let sortedTransactions = transactions.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  return (
    <div>
      <Header />
  
      <Cards
        user={user}
        income={income}
        expense={expense}
        balance={balance}
        showexpenseModel={showexpenseModel}
        showincomeModel={showincomeModel}
        setBalance={setBalance}
        setIncome={setIncome}
        setExpense={setExpense}
        setTransactions={setTransactions}
      />
      {transactions.length !== 0 ? (
        <Chart sortedTransactions={sortedTransactions} />
      ) : (
        <NoTransactions />
      )}
      <AddExpenseModal
        expenseModel={expenseModel}
        hideexpenseModel={hideexpenseModel}
        onFinish={onFinish}
      />
      <AddIncomeModal
        incomeModel={incomeModel}
        hideincomeModel={hideincomeModel}
        onFinish={onFinish}
      />
      <TransactionTable
        transactions={transactions}
        addTransaction={addTransaction}
        fetchTransactions={fetchTransactions}
      />
    </div>
  );
}

export default Dashboard;
