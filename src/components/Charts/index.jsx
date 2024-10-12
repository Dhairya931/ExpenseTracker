import { Line, Pie } from '@ant-design/charts';
import React from 'react'
import './style.css'

function Chart({sortedTransactions}) {
    const data=sortedTransactions.map((item)=>{
      return {date:item.date,amount:item.amount};
    });
    const spendingData= sortedTransactions.filter((transaction)=>{
      if(transaction.type=="expense"){
        return{tag:transaction.tag,amount:transaction.amount};
      }
    });

    let newSpending= [{tag:"food",amount:0},{tag:"education",amount:0},{tag:"office",amount:0},{tag:"marketing",amount:0},{tag:"miscellaneous",amount:0}];
  spendingData.forEach((item)=>{
      if(item.tag=="food"){
        newSpending[0].amount+=item.amount;
      }else if(item.tag=="education"){
        newSpending[1].amount+=item.amount;
      }else if(item.tag=="office"){
        newSpending[2].amount+=item.amount;
      }else if(item.tag=="marketing"){
        newSpending[3].amount+=item.amount;
      }else{
        newSpending[4].amount+=item.amount;
      }
    });
    
      const config = {
        data:data,
        width: 800,
        height: 500,
        xField: 'date',
        yField: 'amount',
      };
      const spendingconfig = {
        data :newSpending,
        width: 500,
        angleField:"amount",
        colorField:"tag",
      };

      let chart;
      let pieChart;
  return (
    <div className='chart-wrapper mx-auto  mb-5'>
      <div className='shadow-lg p-4'>
        <h2 className='font-bold text-[50px] mb-5'>Your Analytics</h2>
        <Line {...config} onReady={(chartInstance) => (chart = chartInstance)} />
      </div>
       <div className='pie-chart shadow-lg p-4 '>
        <h2 className='font-bold text-[50px] mb-5 '>Your Spendings</h2>
        {spendingData.length!=0 ? ( <Pie {...spendingconfig} onReady={(chartInstance) => (pieChart = chartInstance)} />):(<p className='text-[15px]'>Seems that you haven't spent anything yet</p>)}
       </div>
    </div>
  )
}

export default Chart
