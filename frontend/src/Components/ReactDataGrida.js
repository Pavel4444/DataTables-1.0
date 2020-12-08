import React, { useContext, useState } from "react";
import ReactDataGrid from 'react-data-grid';
import { Toolbar, Data } from "react-data-grid-addons";
import {initialRowss} from './ApiContext'; 

const defaultColumnProperties = {
  resizable: true,
  filterable: true,
  sortable: true
};

const selectors = Data.Selectors;

const columns=[
  { name: "id", key: "id", sortable:true},
  { name: "MasterAgreementCode", key: "masterAgreementCode", resizable:true, sortable:true, editable:true},
  { name: "asOfDate", key: "asOfDate"},
  { name: "TradingSystem", key: "tradingSystem" },
  { name: "LEVEL3", key: "level3"},
  { name: "LegalEntity", key: "legalEntity"},
  { name: "AmountEUR", key: "amountEUR", type: "numeric" },
  { name: "Book", key: "book" },
  { name: "LEVEL5", key: "level5"},
  { name: "PnLRelevant", key: "pnLRelevant"},
  { name: "CashFlowDate", key: "cashFlowDate"},
  { name: "LEVEL6", key: "level6"},
  { name: "LEVEL2", key: "level2"},
  { name: "Currency", key: "ccy"},
  { name: "Amount", key: "amount", type: "numeric" },
  { name: "LEVEL4", key: "level4"},
  { name: "LEVEL1", key: "level1"},
].map(c => ({ ...c, ...defaultColumnProperties }));

const initialRows =[
  {"id":1,"masterAgreementCode":"2094179-04","asOfDate":"2020-09-27T22:00:00.000+00:00","tradingSystem":"Colline","level3":"Global Liquidity- & Risk Management (BU)",
    "legalEntity":"FFT","amountEUR":-48.45,"book":"83/08","level5":"Non-EUR & Cash Management (PD)","pnLRelevant":"N",
    "cashFlowDate":"2020-09-24T22:00:00.000+00:00","level6":"CCY-Pool TB","level2":"Treasury Core","ccy":"EUR","amount":-48.45,
    "level4":"IRRM & Short Term Funding (PL)","level1":"Treasury"},

  {"id":111,"masterAgreementCode":"2294179-04","asOfDate":"2020-09-27T22:00:00.000+00:00","tradingSystem":"Colline","level3":"Global Liquidity- & Risk Management (BU)",
    "legalEntity":"FFT","amountEUR":-48.45,"book":"83/08","level5":"Non-EUR & Cash Management (PD)","pnLRelevant":"N",
    "cashFlowDate":"2020-09-24T22:00:00.000+00:00","level6":"CCY-Pool TB","level2":"Treasury Core","ccy":"EUR","amount":-48.45,
    "level4":"IRRM & Short Term Funding (PL)","level1":"Treasury"},
  {"id":2,"masterAgreementCode":"2594179-04","asOfDate":"2020-09-27T22:00:00.000+00:00","tradingSystem":"Colline","level3":"Global Liquidity- & Risk Management (BU)",
    "legalEntity":"FFT","amountEUR":-48.45,"book":"83/08","level5":"Non-EUR & Cash Management (PD)","pnLRelevant":"N",
    "cashFlowDate":"2020-09-24T22:00:00.000+00:00","level6":"CCY-Pool TB","level2":"Treasury Core","ccy":"EUR","amount":-48.45,
    "level4":"IRRM & Short Term Funding (PL)","level1":"Treasury"},
  {"id":3,"masterAgreementCode":"2494179-04","asOfDate":"2020-09-27T22:00:00.000+00:00","tradingSystem":"Colline","level3":"Global Liquidity- & Risk Management (BU)",
    "legalEntity":"FFT","amountEUR":-48.45,"book":"83/08","level5":"Non-EUR & Cash Management (PD)","pnLRelevant":"N",
    "cashFlowDate":"2020-09-24T22:00:00.000+00:00","level6":"CCY-Pool TB","level2":"Treasury Core","ccy":"EUR","amount":-48.45,
    "level4":"IRRM & Short Term Funding (PL)","level1":"Treasury"},
  {"id":4,"masterAgreementCode":"1094179-04","asOfDate":"2020-09-27T22:00:00.000+00:00","tradingSystem":"Colline","level3":"Global Liquidity- & Risk Management (BU)",
    "legalEntity":"FFT","amountEUR":-48.45,"book":"83/08","level5":"Non-EUR & Cash Management (PD)","pnLRelevant":"N",
    "cashFlowDate":"2020-09-24T22:00:00.000+00:00","level6":"CCY-Pool TB","level2":"Treasury Core","ccy":"EUR","amount":-48.45,
    "level4":"IRRM & Short Term Funding (PL)","level1":"Treasury"},
  {"id":5,"masterAgreementCode":"2194179-04","asOfDate":"2020-09-27T22:00:00.000+00:00","tradingSystem":"Colline","level3":"Global Liquidity- & Risk Management (BU)",
    "legalEntity":"FFT","amountEUR":-48.45,"book":"83/08","level5":"Non-EUR & Cash Management (PD)","pnLRelevant":"N",
    "cashFlowDate":"2020-09-24T22:00:00.000+00:00","level6":"CCY-Pool TB","level2":"Treasury Core","ccy":"EUR","amount":-48.45,
    "level4":"IRRM & Short Term Funding (PL)","level1":"Treasury"},
  {"id":6,"masterAgreementCode":"9094179-04","asOfDate":"2020-09-27T22:00:00.000+00:00","tradingSystem":"Colline","level3":"Global Liquidity- & Risk Management (BU)",
    "legalEntity":"FFT","amountEUR":-48.45,"book":"83/08","level5":"Non-EUR & Cash Management (PD)","pnLRelevant":"N",
    "cashFlowDate":"2020-09-24T22:00:00.000+00:00","level6":"CCY-Pool TB","level2":"Treasury Core","ccy":"EUR","amount":-48.45,
    "level4":"IRRM & Short Term Funding (PL)","level1":"Treasury"},
  {"id":7,"masterAgreementCode":"2894179-04","asOfDate":"2020-09-27T22:00:00.000+00:00","tradingSystem":"Colline","level3":"Global Liquidity- & Risk Management (BU)",
    "legalEntity":"FFT","amountEUR":-48.45,"book":"83/08","level5":"Non-EUR & Cash Management (PD)","pnLRelevant":"N",
    "cashFlowDate":"2020-09-24T22:00:00.000+00:00","level6":"CCY-Pool TB","level2":"Treasury Core","ccy":"EUR","amount":-48.45,
    "level4":"IRRM & Short Term Funding (PL)","level1":"Treasury"},
  {"id":8,"masterAgreementCode":"8694179-04","asOfDate":"2020-09-27T22:00:00.000+00:00","tradingSystem":"Colline","level3":"Global Liquidity- & Risk Management (BU)",
    "legalEntity":"FFT","amountEUR":-48.45,"book":"83/08","level5":"Non-EUR & Cash Management (PD)","pnLRelevant":"N",
    "cashFlowDate":"2020-09-24T22:00:00.000+00:00","level6":"CCY-Pool TB","level2":"Treasury Core","ccy":"EUR","amount":-48.45,
    "level4":"IRRM & Short Term Funding (PL)","level1":"Treasury"},
  {"id":9,"masterAgreementCode":"4294179-04","asOfDate":"2020-09-27T22:00:00.000+00:00","tradingSystem":"Colline","level3":"Global Liquidity- & Risk Management (BU)",
    "legalEntity":"FFT","amountEUR":-48.45,"book":"83/08","level5":"Non-EUR & Cash Management (PD)","pnLRelevant":"N",
    "cashFlowDate":"2020-09-24T22:00:00.000+00:00","level6":"CCY-Pool TB","level2":"Treasury Core","ccy":"EUR","amount":-48.45,
    "level4":"IRRM & Short Term Funding (PL)","level1":"Treasury"},
  {"id":10,"masterAgreementCode":"5594179-04","asOfDate":"2020-09-27T22:00:00.000+00:00","tradingSystem":"Colline","level3":"Global Liquidity- & Risk Management (BU)",
    "legalEntity":"FFT","amountEUR":-48.45,"book":"83/08","level5":"Non-EUR & Cash Management (PD)","pnLRelevant":"N",
    "cashFlowDate":"2020-09-24T22:00:00.000+00:00","level6":"CCY-Pool TB","level2":"Treasury Core","ccy":"EUR","amount":-48.45,
    "level4":"IRRM & Short Term Funding (PL)","level1":"Treasury"},
  {"id":11,"masterAgreementCode":"7794179-04","asOfDate":"2020-09-27T22:00:00.000+00:00","tradingSystem":"Colline","level3":"Global Liquidity- & Risk Management (BU)",
    "legalEntity":"FFT","amountEUR":-48.45,"book":"83/08","level5":"Non-EUR & Cash Management (PD)","pnLRelevant":"N",
    "cashFlowDate":"2020-09-24T22:00:00.000+00:00","level6":"CCY-Pool TB","level2":"Treasury Core","ccy":"EUR","amount":-48.45,
    "level4":"IRRM & Short Term Funding (PL)","level1":"Treasury"},
  {"id":12,"masterAgreementCode":"2394179-04","asOfDate":"2020-09-27T22:00:00.000+00:00","tradingSystem":"Colline","level3":"Global Liquidity- & Risk Management (BU)",
    "legalEntity":"FFT","amountEUR":-48.45,"book":"83/08","level5":"Non-EUR & Cash Management (PD)","pnLRelevant":"N",
    "cashFlowDate":"2020-09-24T22:00:00.000+00:00","level6":"CCY-Pool TB","level2":"Treasury Core","ccy":"EUR","amount":-48.45,
    "level4":"IRRM & Short Term Funding (PL)","level1":"Treasury"},
  {"id":13,"masterAgreementCode":"2894179-04","asOfDate":"2020-09-27T22:00:00.000+00:00","tradingSystem":"Colline","level3":"Global Liquidity- & Risk Management (BU)",
    "legalEntity":"FFT","amountEUR":-48.45,"book":"83/08","level5":"Non-EUR & Cash Management (PD)","pnLRelevant":"N",
    "cashFlowDate":"2020-09-24T22:00:00.000+00:00","level6":"CCY-Pool TB","level2":"Treasury Core","ccy":"EUR","amount":-48.45,
    "level4":"IRRM & Short Term Funding (PL)","level1":"Treasury"},
  {"id":14,"masterAgreementCode":"2094179-04","asOfDate":"2020-09-27T22:00:00.000+00:00","tradingSystem":"Colline","level3":"Global Liquidity- & Risk Management (BU)",
    "legalEntity":"FFT","amountEUR":-48.45,"book":"83/08","level5":"Non-EUR & Cash Management (PD)","pnLRelevant":"N",
    "cashFlowDate":"2020-09-24T22:00:00.000+00:00","level6":"CCY-Pool TB","level2":"Treasury Core","ccy":"EUR","amount":-48.45,
    "level4":"IRRM & Short Term Funding (PL)","level1":"Treasury"},
  {"id":15,"masterAgreementCode":"2094179-04","asOfDate":"2020-09-27T22:00:00.000+00:00","tradingSystem":"Colline","level3":"Global Liquidity- & Risk Management (BU)",
    "legalEntity":"FFT","amountEUR":-48.45,"book":"83/08","level5":"Non-EUR & Cash Management (PD)","pnLRelevant":"N",
    "cashFlowDate":"2020-09-24T22:00:00.000+00:00","level6":"CCY-Pool TB","level2":"Treasury Core","ccy":"EUR","amount":-48.45,
    "level4":"IRRM & Short Term Funding (PL)","level1":"Treasury"},
  {"id":16,"masterAgreementCode":"2094179-04","asOfDate":"2020-09-27T22:00:00.000+00:00","tradingSystem":"Colline","level3":"Global Liquidity- & Risk Management (BU)",
    "legalEntity":"FFT","amountEUR":-48.45,"book":"83/08","level5":"Non-EUR & Cash Management (PD)","pnLRelevant":"N",
    "cashFlowDate":"2020-09-24T22:00:00.000+00:00","level6":"CCY-Pool TB","level2":"Treasury Core","ccy":"EUR","amount":-48.45,
    "level4":"IRRM & Short Term Funding (PL)","level1":"Treasury"}
];

const count = initialRows.length;

const sortRows = (initialRows, sortColumn, sortDirection) => rows => {
  const comparer = (a, b) => {
    if (sortDirection === "ASC") {
      return a[sortColumn] > b[sortColumn] ? 1 : -1;
    } else if (sortDirection === "DESC") {
      return a[sortColumn] < b[sortColumn] ? 1 : -1;
    }
  };
  return sortDirection === "NONE" ? initialRows : [...rows].sort(comparer);
};

const handleFilterChange = filter => filters => {
  const newFilters = { ...filters };
  if (filter.filterTerm) {
    newFilters[filter.column.key] = filter;
  } else {
    delete newFilters[filter.column.key];
  }
  return newFilters;
};

function getRows() {
  return selectors.getRows({initialRows});
}

const filteredRows = getRows();



export function ReactDataGrida() {

  const rowss = useContext(initialRowss)

  const [rows, setRows] = useState(initialRows);
  const [filters, setFilters] = useState({});

  return (<ReactDataGrid
  columns={columns}
  rowGetter={i => rows[i]}
  rowsCount={rows.length}
  toolbar={<Toolbar enableFilter={true} />}
  onAddFilter={filter => setFilters(handleFilterChange(filter))}
  onClearFilters={() => setFilters({})}
  onGridSort={(sortColumn, sortDirection) =>
    setRows(sortRows(initialRows, sortColumn, sortDirection))
  }
  
  />);
}