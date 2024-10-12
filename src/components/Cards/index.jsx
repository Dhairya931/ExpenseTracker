import React from 'react'
import './style.css';
import { Row,Card } from 'antd';
import { db } from '../../firebase';
import { toast } from 'react-toastify';
import { collection, getDocs, writeBatch } from 'firebase/firestore';
function Cards({user,income,expense,balance,showexpenseModel, showincomeModel,setBalance,setExpense,setIncome,setTransactions}) { 

  const resetBalance= async()=>{
    const userconfirm = window.confirm("Are you sure you want to reset all transactions?");
    if(userconfirm){
    try{
      const transactionCollection=collection(db,`users/${user.uid}/transactions`);
      const snapshot= await getDocs(transactionCollection);
      const batch = writeBatch(db);
      snapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      toast.success('All transactions have been deleted!');
      setTransactions([]); 
      setIncome(0);
      setExpense(0);
      setBalance(0);
    } catch (error) {
      console.error('Error deleting transactions:', error);
      toast.error('Failed to reset balance. Please try again.');
    }
    }
  };

  return (
    <div className='p-3 flex justify-between items-center'>
      <Row className='flex flex-wrap gap-[16px] justify-between items-center mx-auto my-8 '>
        <Card className="my-card shadow-xl p-1.5" title="Current Balance" >
        <p className='text-xl'>₹{balance}</p>
        <button className="block rounded-xl border border-blue-600 bg-blue-600 w-full my-2 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600"onClick={resetBalance}>
         Reset Transactions
        </button>
        </Card>
        <Card className="my-card shadow-xl p-1.5" title="Total Income" >
        <p className='text-xl'>₹{income}</p>
        <button className="block rounded-xl border border-blue-600 bg-blue-600 w-full my-2 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600" onClick={showincomeModel}>
         Add Income
        </button>
        </Card>
        <Card className="my-card shadow-xl p-1.5" title="Total Expenses" >
        <p className='text-xl'>₹{expense}</p>
        <button className="block rounded-xl border border-blue-600 bg-blue-600 w-full my-2 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600" onClick={showexpenseModel}>
         Add Expenses
        </button>
        </Card>
      </Row>
    </div>
  )
}

export default Cards;