import React, { useEffect, useState } from "react";
import '../../Asset/scss/TransactionLayout.scss'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import TransactionService from "../../Services/transaction.service";
import moment from "moment";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

const TransactionListView = () => {
    let history = useHistory()
    const dispatch = useDispatch()
    const [transactionList, setTransactionList] = useState([])
    const [apiData, setAPIData] = useState([])
    const [searchValue, setSearchValue] = useState("");
    const [selectValue, setSelectValue] = useState(0);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [showFilter, setShowFilter] = useState(false);
    const options = [
        { value: 0, label: 'All' },
        { value: 1, label: 'Latest Date' },
        { value: 2, label: 'Oldest Date' }
    ]
    const [page, setPage] = useState(1);
    const size = 10;

    window.onscroll = () => {
        if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) <= 250) {
            handleDataPaging();
        }
    }

    useEffect(() => {
        var today = new Date();
        var convertDate = moment(new Date(today)).format("yyyy-MM-DD");
        setStartDate(convertDate);
        setEndDate(convertDate);
        var pageNum = 1;
        var sizeNum = 10;

        TransactionService.getTransactionList()
        .then((res) => {

            let data = res.data;
            let startIndex = pageNum * sizeNum - sizeNum;
            let endIndex = startIndex + sizeNum;
            let dataPaging = data.slice(startIndex, endIndex);

            setTransactionList(dataPaging);
            setAPIData(data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    const handleDataPaging = () => {
        let data = apiData;
        let pageNum = page + 1;
        let startIndex = pageNum * size - size;
        let endIndex = startIndex + size;
        let dataPaging = data.slice(startIndex, endIndex);
        let newList = transactionList.concat(dataPaging);

        setTransactionList(newList);
        setPage(pageNum);
    }

    const handleSave = (data) => {
        dispatch({ type: 'TXNDETAIL', payload: data });
        history.push('./detail');
    }

    const onChangeRadioSort = (ind) => {
        setSelectValue(ind);
        if(ind === 1) {
            setTransactionList(transactionList.sort((a,b) => a.transactionDate === b.transactionDate ? 0 : b.transactionDate < a.transactionDate ? -1 : 1));
        } else if(ind === 2) {
            setTransactionList(transactionList.sort((a,b) => a.transactionDate === b.transactionDate ? 0 : a.transactionDate < b.transactionDate ? -1 : 1));
        } else {
            let startIndex = 1 * size - size;
            let endIndex = startIndex + size;
            setTransactionList(apiData.slice(startIndex, endIndex));
            setPage(1);
        }
    }

    const onChangeRadioFilter = (e) => {
        setShowFilter(e.target.checked);
        if(!e.target.checked) {
            let startIndex = 1 * size - size;
            let endIndex = startIndex + size;
            setTransactionList(apiData.slice(startIndex, endIndex));
            setPage(1);
        }
    }

    const handleStartDate = (e) => {
        setStartDate(e);
    }

    const handleEndDate = (e) => {
        setEndDate(e);
    }

    const searchTransaction = (e) => {
        setSearchValue(e.target.value);
        if(searchValue !== "") {
            const filteredData = apiData.filter((row) => {
                return row.description.toLowerCase().includes(searchValue.toLowerCase());
            })
            setTransactionList(filteredData);
        } else {
            setTransactionList(apiData);
        }
    }

    const filterByDate = () => {
        const filteredData = apiData.filter((value) => {
            return new Date(value.transactionDate) >= new Date(startDate) && new Date(value.transactionDate) <= new Date(endDate)
        })
        setTransactionList(filteredData);
    }

    const transactionDetailList = () => {
        return transactionList.map((value, ind) => {
            return (
                <div key={ind} className="txnList-Content" onClick={() => handleSave(value)}>
                    <div className="txnList-transaction-content">
                        <div className="txnList-paymentservice">
                            <h3 className="txnList-paymentservice-words">{value.category}</h3>
                        </div>

                        <div className="txnList-transaction-topSide">
                            <h3 className="txnList-content-description">{value.description}</h3>
                        </div>

                        <div className="txnList-transaction-topSide">
                            <h3 className="txnList-content-paymentstatus">{moment(value.transactionDate).format("DD MMMM YYYY")}</h3>
                            {
                                value.debit ?
                                <h3 className="txnList-content-paymentinfo" style={{ color: "#198754" }}>-{value.debit}</h3>
                                :
                                <h3 className="txnList-content-paymentinfo" style={{ color: "#4056C6" }}>+{value.credit}</h3>
                            }
                            
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <>
            <div className="txnList-Layout">

                <div className="modal-txnList">
                
                    <div className="modal-content-txnList">
                        <div className="txnList-header">
                            <div className="txnList-titletext">History</div>
                        </div>
                        <div className="txnList-inputarea">
                            <input className="txnList-textbox" placeholder="Search by Description" 
                            onChange={e => searchTransaction(e)} 
                            value={searchValue} />
                        </div>
                        <div className="txnList-status-filter">
                                <div className="txnList-filter">
                                    <input type="checkbox" name="filterCheckbox" checked={showFilter} id='filter' 
                                    onChange={(e) => onChangeRadioFilter(e)}
                                    />
                                    <div className="txnList-filter-content">
                                        <div className="txnList-filterName">Filter</div>
                                    </div>
                                </div>

                                {
                                    options.map((value, ind) => {
                                        return (
                                            <div key={ind} className="txnList-sort-content">
                                                <input type='radio' id={value.label} 
                                                onChange={() => onChangeRadioSort(ind)}
                                                name={'SORTDATE'} 
                                                defaultChecked={selectValue === value.value ? true : false}
                                                />
                                                <label htmlFor={value.label}>
                                                    <div className="txnList-sortName">{value.label}</div>
                                                </label>
                                            </div>
                                        )
                                    })
                                }
                        </div>
                        { 
                        showFilter ?
                        <div>
                        <div className="txnList-dateselection-layout">
                            <div className="txnList-dateselection-start">   
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        autoOk
                                        id="startDate"
                                        onChange={handleStartDate}
                                        inputVariant="outlined" 
                                        className={"txnList-datepicker-start"}
                                        format={"d MMMM yyyy"}
                                        value={startDate}
                                        ampm={false}
                                    />
                                </MuiPickersUtilsProvider>
                            </div>
                            <div className="txnList-dateselection-start">   
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        autoOk
                                        id="endDate"
                                        onChange={handleEndDate}
                                        inputVariant="outlined" 
                                        className={"txnList-datepicker"}
                                        format={"d MMMM yyyy"}
                                        value={endDate}
                                        ampm={false}
                                    />
                                </MuiPickersUtilsProvider>
                            </div>
                        </div>

                        <div className="txnList-inputarea">
                            <div className="txnList-checkbutton" onClick={filterByDate}>Show Transaction</div>
                        </div>
                        </div>
                        :
                        <></>
                        }

                        <div className="txnList-Wrapper">
                            {transactionDetailList()}
                        </div>
                    </div>
                
                </div>
            </div>
        </>
    )
}

export default TransactionListView