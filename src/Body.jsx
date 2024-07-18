import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';

export default function Body() {
  const [transactions, setTransactions] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [data, setData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');

  useEffect(() => {
    Promise.all([getCustomers(), getTransactions()])
      .then(([customersData, transactionsData]) => {
        console.log("Fetched customers:", customersData);
        console.log("Fetched transactions:", transactionsData);
        
        setCustomers(customersData);
        setTransactions(transactionsData);
        combineData(customersData, transactionsData);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, []);

  // ---------------------------------------------------APIs-----------------------------------------
  function getCustomers() {
    return fetch('http://localhost:5000/customers')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log("Customers data:", data);
        return data;
      });
  }

  function getTransactions() {
    return fetch('http://localhost:5000/transactions')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log("Transactions data:", data);
        return data;
      });
  }


  function addTransaction(newTransaction){
    const response = fetch('http://localhost:5000/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTransaction),
    });
  }

  
 //--------------------------------------------------------------------------------------------------------------------
  function combineData(customers, transactions) {
    let combinedData = transactions.map(transaction => {
      const customer = customers.find(c => Number(c.id) === Number(transaction.customer_id));
      return {
        ...transaction,
        customer_name: customer ? customer.name : 'Unknown'
      };
    });
    setData(combinedData);
    console.log("Combined Data" , combinedData)

  }

  // -----------------------------------Filters--------------------------------------------------------


  const handleGlobalFilterChange = (e) => {
    const value = e.target.value;
    setGlobalFilter(value);

    const filteredData = transactions.map(transaction => {
      let customer = customers.find(c => Number(c.id) === Number(transaction.customer_id));
      return { ...transaction, customer_name: customer ? customer.name : 'Unknown' };
    }).filter(transaction => {
      return (
        transaction.customer_name.toLowerCase().includes(value.toLowerCase()) ||
        transaction.amount.toString().includes(value)
      );
    });
    setData(filteredData);
  };

 //--------------------------------------------------------------------------------------------------------------------


  const renderHeader = () => {
    return (
      <div className="table-header">
        <span className="p-input-icon-left">
          <InputText type="search" onInput={handleGlobalFilterChange} placeholder="Global Search" />
        </span>

      </div>
    );
  };

  const header = renderHeader();

  return (
    
    <div className="card mx-5 mt-3">
      <DataTable 
        paginator 
        removableSort 
        rows={5} 
        rowsPerPageOptions={[5, 10, 25, 50]} 
        stripedRows 
        value={data} 
        tableStyle={{ minWidth: '50rem' }} 
        header={header}
        globalFilter={globalFilter}
      >
        <Column 
          sortable 
          field="id" 
          header="Transaction ID" 
          style={{ width: '20%' }} 
          filter 
          filterPlaceholder="Search by ID"
          filterField="id"
        />
        <Column 
          sortable 
          field="customer_id" 
          header="Customer ID" 
          style={{ width: '20%' }} 
          filter 
          filterPlaceholder="Search by Customer ID"
          filterField="customer_id"
        />
        <Column 
          sortable 
          field="customer_name" 
          header="Name" 
          style={{ width: '20%' }} 
          filter 
          filterPlaceholder="Search by Name"
          filterField="customer_name"
        />
        <Column 
          sortable 
          field="date" 
          header="Date" 
          style={{ width: '20%' }} 
          filter 
          filterPlaceholder="Search by Date"
          filterField="date"
        />
        <Column 
          sortable 
          field="amount" 
          header="Amount" 
          style={{ width: '20%' }} 
          filter 
          filterPlaceholder="Search by Amount"
          filterField="amount"
        />
      </DataTable>
    </div>
  );
}
