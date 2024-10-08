import React, { useState } from "react";
import { Table } from "../../components/Table";

const products = [
  { Ticker: "SHRIRAMFIN", Date: "2024-09-01", "Full Name": "Shriram Finance", Close: "$2999", "Trend(Simple MA)": "$2980", "Momentum(RSI)": "65", "Volatility(ATR)": "2.5%", "Breadth(OPT1)": "55", "Volume(Vol Accum)": "200K", "Sale(YOY-Growth)": "10%", "Expense(Material Cost)": "$1000", "Operating Profit(OPM%)": "15%", "Tax %": "30%", "Net Profit": "$800", "EPS in Rs": "12.5", CMO_4: "65", CMO_13: "62", CMO_26: "68", CMO_52: "70" },
  { Ticker: "BAJAJFINSV", Date: "2024-09-02", "Full Name": "Bajaj Finserv", Close: "$4050", "Trend(Simple MA)": "$4000", "Momentum(RSI)": "75", "Volatility(ATR)": "-3%", "Breadth(OPT1)": "60", "Volume(Vol Accum)": "150K", "Sale(YOY-Growth)": "8%", "Expense(Material Cost)": "$1500", "Operating Profit(OPM%)": "12%", "Tax %": "28%", "Net Profit": "$900", "EPS in Rs": "14", CMO_4: "75", CMO_13: "73", CMO_26: "72", CMO_52: "80" },
  { Ticker: "HDFCBANK", Date: "2024-09-03", "Full Name": "HDFC Bank", Close: "$1599", "Trend(Simple MA)": "$1580", "Momentum(RSI)": "60", "Volatility(ATR)": "1.8%", "Breadth(OPT1)": "50", "Volume(Vol Accum)": "180K", "Sale(YOY-Growth)": "12%", "Expense(Material Cost)": "$600", "Operating Profit(OPM%)": "14%", "Tax %": "25%", "Net Profit": "$450", "EPS in Rs": "7.5", CMO_4: "60", CMO_13: "58", CMO_26: "61", CMO_52: "64" },
  { Ticker: "ICICIBANK", Date: "2024-09-04", "Full Name": "ICICI Bank", Close: "$870", "Trend(Simple MA)": "$860", "Momentum(RSI)": "55", "Volatility(ATR)": "2%", "Breadth(OPT1)": "52", "Volume(Vol Accum)": "130K", "Sale(YOY-Growth)": "9%", "Expense(Material Cost)": "$300", "Operating Profit(OPM%)": "13%", "Tax %": "27%", "Net Profit": "$320", "EPS in Rs": "6.2", CMO_4: "55", CMO_13: "57", CMO_26: "60", CMO_52: "63" },
  { Ticker: "TCS", Date: "2024-09-05", "Full Name": "Tata Consultancy Services", Close: "$3450", "Trend(Simple MA)": "$3420", "Momentum(RSI)": "85", "Volatility(ATR)": "2.8%", "Breadth(OPT1)": "75", "Volume(Vol Accum)": "250K", "Sale(YOY-Growth)": "15%", "Expense(Material Cost)": "$1100", "Operating Profit(OPM%)": "18%", "Tax %": "32%", "Net Profit": "$950", "EPS in Rs": "18", CMO_4: "85", CMO_13: "83", CMO_26: "80", CMO_52: "78" },
  { Ticker: "INFY", Date: "2024-09-06", "Full Name": "Infosys", Close: "$1490", "Trend(Simple MA)": "$1475", "Momentum(RSI)": "72", "Volatility(ATR)": "2.5%", "Breadth(OPT1)": "65", "Volume(Vol Accum)": "180K", "Sale(YOY-Growth)": "13%", "Expense(Material Cost)": "$700", "Operating Profit(OPM%)": "17%", "Tax %": "29%", "Net Profit": "$420", "EPS in Rs": "8", CMO_4: "72", CMO_13: "70", CMO_26: "75", CMO_52: "77" },
  { Ticker: "RELIANCE", Date: "2024-09-07", "Full Name": "Reliance Industries", Close: "$2345", "Trend(Simple MA)": "$2320", "Momentum(RSI)": "68", "Volatility(ATR)": "2.2%", "Breadth(OPT1)": "60", "Volume(Vol Accum)": "210K", "Sale(YOY-Growth)": "14%", "Expense(Material Cost)": "$1200", "Operating Profit(OPM%)": "16%", "Tax %": "31%", "Net Profit": "$780", "EPS in Rs": "16", CMO_4: "68", CMO_13: "65", CMO_26: "70", CMO_52: "72" },
  { Ticker: "WIPRO", Date: "2024-09-08", "Full Name": "Wipro", Close: "$500", "Trend(Simple MA)": "$490", "Momentum(RSI)": "62", "Volatility(ATR)": "1.5%", "Breadth(OPT1)": "48", "Volume(Vol Accum)": "90K", "Sale(YOY-Growth)": "7%", "Expense(Material Cost)": "$250", "Operating Profit(OPM%)": "10%", "Tax %": "26%", "Net Profit": "$120", "EPS in Rs": "5", CMO_4: "62", CMO_13: "60", CMO_26: "58", CMO_52: "55" },
  { Ticker: "SBIN", Date: "2024-09-09", "Full Name": "State Bank of India", Close: "$525", "Trend(Simple MA)": "$515", "Momentum(RSI)": "67", "Volatility(ATR)": "1.8%", "Breadth(OPT1)": "53", "Volume(Vol Accum)": "100K", "Sale(YOY-Growth)": "9%", "Expense(Material Cost)": "$270", "Operating Profit(OPM%)": "11%", "Tax %": "27%", "Net Profit": "$180", "EPS in Rs": "6", CMO_4: "67", CMO_13: "66", CMO_26: "65", CMO_52: "69" },
  { Ticker: "HINDUNILVR", Date: "2024-09-10", "Full Name": "Hindustan Unilever", Close: "$2500", "Trend(Simple MA)": "$2480", "Momentum(RSI)": "70", "Volatility(ATR)": "2%", "Breadth(OPT1)": "63", "Volume(Vol Accum)": "170K", "Sale(YOY-Growth)": "11%", "Expense(Material Cost)": "$850", "Operating Profit(OPM%)": "14%", "Tax %": "29%", "Net Profit": "$700", "EPS in Rs": "10", CMO_4: "70", CMO_13: "68", CMO_26: "66", CMO_52: "72" },
  { Ticker: "BHARTIARTL", Date: "2024-09-11", "Full Name": "Bharti Airtel", Close: "$695", "Trend(Simple MA)": "$685", "Momentum(RSI)": "69", "Volatility(ATR)": "2.3%", "Breadth(OPT1)": "58", "Volume(Vol Accum)": "110K", "Sale(YOY-Growth)": "12%", "Expense(Material Cost)": "$400", "Operating Profit(OPM%)": "13%", "Tax %": "28%", "Net Profit": "$180", "EPS in Rs": "8", CMO_4: "69", CMO_13: "67", CMO_26: "70", CMO_52: "73" },
  { Ticker: "KOTAKBANK", Date: "2024-09-12", "Full Name": "Kotak Mahindra Bank", Close: "$1900", "Trend(Simple MA)": "$1890", "Momentum(RSI)": "64", "Volatility(ATR)": "2.1%", "Breadth(OPT1)": "52", "Volume(Vol Accum)": "130K", "Sale(YOY-Growth)": "8%", "Expense(Material Cost)": "$450", "Operating Profit(OPM%)": "12%", "Tax %": "26%", "Net Profit": "$350", "EPS in Rs": "7", CMO_4: "64", CMO_13: "61", CMO_26: "63", CMO_52: "66" },
  { Ticker: "TATAMOTORS", Date: "2024-09-13", "Full Name": "Tata Motors", Close: "$640", "Trend(Simple MA)": "$635", "Momentum(RSI)": "63", "Volatility(ATR)": "1.9%", "Breadth(OPT1)": "57", "Volume(Vol Accum)": "80K", "Sale(YOY-Growth)": "10%", "Expense(Material Cost)": "$300", "Operating Profit(OPM%)": "11%", "Tax %": "25%", "Net Profit": "$120", "EPS in Rs": "4", CMO_4: "63", CMO_13: "60", CMO_26: "65", CMO_52: "62" },
  { Ticker: "TECHM", Date: "2024-09-14", "Full Name": "Tech Mahindra", Close: "$1040", "Trend(Simple MA)": "$1030", "Momentum(RSI)": "66", "Volatility(ATR)": "2.4%", "Breadth(OPT1)": "61", "Volume(Vol Accum)": "150K", "Sale(YOY-Growth)": "11%", "Expense(Material Cost)": "$370", "Operating Profit(OPM%)": "13%", "Tax %": "27%", "Net Profit": "$230", "EPS in Rs": "5", CMO_4: "66", CMO_13: "64", CMO_26: "63", CMO_52: "67" },
  { Ticker: "MARUTI", Date: "2024-09-15", "Full Name": "Maruti Suzuki", Close: "$8500", "Trend(Simple MA)": "$8400", "Momentum(RSI)": "71", "Volatility(ATR)": "2.7%", "Breadth(OPT1)": "68", "Volume(Vol Accum)": "90K", "Sale(YOY-Growth)": "14%", "Expense(Material Cost)": "$600", "Operating Profit(OPM%)": "18%", "Tax %": "31%", "Net Profit": "$950", "EPS in Rs": "22", CMO_4: "71", CMO_13: "69", CMO_26: "70", CMO_52: "73" },
  { Ticker: "NTPC", Date: "2024-09-16", "Full Name": "NTPC Limited", Close: "$230", "Trend(Simple MA)": "$228", "Momentum(RSI)": "62", "Volatility(ATR)": "1.6%", "Breadth(OPT1)": "50", "Volume(Vol Accum)": "140K", "Sale(YOY-Growth)": "9%", "Expense(Material Cost)": "$220", "Operating Profit(OPM%)": "11%", "Tax %": "25%", "Net Profit": "$70", "EPS in Rs": "2", CMO_4: "62", CMO_13: "61", CMO_26: "60", CMO_52: "59" },
  { Ticker: "ADANIGREEN", Date: "2024-09-17", "Full Name": "Adani Green Energy", Close: "$980", "Trend(Simple MA)": "$970", "Momentum(RSI)": "75", "Volatility(ATR)": "3%", "Breadth(OPT1)": "66", "Volume(Vol Accum)": "120K", "Sale(YOY-Growth)": "15%", "Expense(Material Cost)": "$400", "Operating Profit(OPM%)": "17%", "Tax %": "28%", "Net Profit": "$350", "EPS in Rs": "8", CMO_4: "75", CMO_13: "74", CMO_26: "73", CMO_52: "76" },
  { Ticker: "ULTRACEMCO", Date: "2024-09-18", "Full Name": "UltraTech Cement", Close: "$6200", "Trend(Simple MA)": "$6180", "Momentum(RSI)": "66", "Volatility(ATR)": "2.4%", "Breadth(OPT1)": "62", "Volume(Vol Accum)": "110K", "Sale(YOY-Growth)": "11%", "Expense(Material Cost)": "$750", "Operating Profit(OPM%)": "16%", "Tax %": "30%", "Net Profit": "$600", "EPS in Rs": "15", CMO_4: "66", CMO_13: "64", CMO_26: "67", CMO_52: "69" },
  { Ticker: "HDFC", Date: "2024-09-19", "Full Name": "HDFC Limited", Close: "$2500", "Trend(Simple MA)": "$2480", "Momentum(RSI)": "68", "Volatility(ATR)": "1.9%", "Breadth(OPT1)": "65", "Volume(Vol Accum)": "90K", "Sale(YOY-Growth)": "12%", "Expense(Material Cost)": "$320", "Operating Profit(OPM%)": "14%", "Tax %": "29%", "Net Profit": "$400", "EPS in Rs": "10", CMO_4: "68", CMO_13: "66", CMO_26: "65", CMO_52: "64" },
  { Ticker: "YESBANK", Date: "2024-09-20", "Full Name": "YES Bank", Close: "$16", "Trend(Simple MA)": "$15.5", "Momentum(RSI)": "60", "Volatility(ATR)": "1.5%", "Breadth(OPT1)": "55", "Volume(Vol Accum)": "45K", "Sale(YOY-Growth)": "5%", "Expense(Material Cost)": "$50", "Operating Profit(OPM%)": "8%", "Tax %": "22%", "Net Profit": "$10", "EPS in Rs": "0.4", CMO_4: "60", CMO_13: "58", CMO_26: "59", CMO_52: "61" },
  { Ticker: "LTI", Date: "2024-09-21", "Full Name": "L&T Infotech", Close: "$4600", "Trend(Simple MA)": "$4580", "Momentum(RSI)": "72", "Volatility(ATR)": "2.2%", "Breadth(OPT1)": "70", "Volume(Vol Accum)": "75K", "Sale(YOY-Growth)": "10%", "Expense(Material Cost)": "$290", "Operating Profit(OPM%)": "13%", "Tax %": "28%", "Net Profit": "$300", "EPS in Rs": "9", CMO_4: "72", CMO_13: "70", CMO_26: "71", CMO_52: "73" },
  { Ticker: "TATAMETALI", Date: "2024-09-22", "Full Name": "Tata Metaliks", Close: "$1240", "Trend(Simple MA)": "$1225", "Momentum(RSI)": "65", "Volatility(ATR)": "1.8%", "Breadth(OPT1)": "62", "Volume(Vol Accum)": "85K", "Sale(YOY-Growth)": "9%", "Expense(Material Cost)": "$110", "Operating Profit(OPM%)": "12%", "Tax %": "27%", "Net Profit": "$80", "EPS in Rs": "4", CMO_4: "65", CMO_13: "63", CMO_26: "66", CMO_52: "64" },
  { Ticker: "LUPIN", Date: "2024-09-23", "Full Name": "Lupin Limited", Close: "$1100", "Trend(Simple MA)": "$1090", "Momentum(RSI)": "74", "Volatility(ATR)": "2.3%", "Breadth(OPT1)": "69", "Volume(Vol Accum)": "70K", "Sale(YOY-Growth)": "12%", "Expense(Material Cost)": "$600", "Operating Profit(OPM%)": "15%", "Tax %": "26%", "Net Profit": "$250", "EPS in Rs": "7", CMO_4: "74", CMO_13: "72", CMO_26: "73", CMO_52: "75" },
  { Ticker: "BHEL", Date: "2024-09-24", "Full Name": "Bharat Heavy Electricals", Close: "$75", "Trend(Simple MA)": "$74", "Momentum(RSI)": "65", "Volatility(ATR)": "2.4%", "Breadth(OPT1)": "54", "Volume(Vol Accum)": "55K", "Sale(YOY-Growth)": "6%", "Expense(Material Cost)": "$25", "Operating Profit(OPM%)": "9%", "Tax %": "22%", "Net Profit": "$12", "EPS in Rs": "0.5", CMO_4: "65", CMO_13: "66", CMO_26: "64", CMO_52: "63" },
];

const convertToCSV = (array) => {
  const headers = Object.keys(array[0]).join(","); // Get headers from the first object
  const rows = array
    .map((obj) => {
      return Object.values(obj).map(value => `"${value}"`).join(","); // Quote values
    })
    .join("\n");

  return `${headers}\n${rows}`; // Combine headers and rows
};

const downloadCSV = () => {
  const csv = convertToCSV(products);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "products.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const ExploreTable = () => {

  const [tableTheme,setTableTheme]=useState("light")


  return (
    <div>
      <div className="w-full flex justify-end px-10 mt-5">
        <div
          className=" cursor-pointer px-6 text-xs font-semibold py-1 active:shadow-none shadow-lg sha bg-gray-300 bg-opacity-5 rounded-lg border-[1px] border-[#41253B]"
          style={{ boxShadow: "inset 0 0 10px 4px rgba(0, 0, 0, 0.3)" }}
          onClick={downloadCSV} // Attach downloadCSV function on click
        >
          Download
        </div>
        
      </div>
      <Table products={products} tableTheme={tableTheme} />
    </div>
  );
};

export default ExploreTable;