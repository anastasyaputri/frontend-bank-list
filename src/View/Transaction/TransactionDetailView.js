import React from "react";
import '../../Asset/scss/TransactionLayout.scss';
import { useSelector } from 'react-redux';
import ArrowBack from "../../Asset/Icon/arrow-left.png";
import moment from "moment";

const TransactionDetailView = () => {
    const AllRedu = useSelector(state => state.AllRedu)

    return (
        <>
            <div className='txnDetailLayout'>

                <div className="txnDetail-header">
                    <span className="txnDetail-back" onClick={() => window.history.back()}>
                        <img className="txnDetail-backicon" src={ArrowBack} alt='' />
                    </span>
                    <div className="txnDetail-titletext">Transaction</div>
                </div>

                <div className='txnDetail-txnstatus-layout'>
                    
                    <div className="txnDetail-txnstatus-Number">
                        {
                            AllRedu.txnDetail.debit ?
                            <span style={{ color: "#198754" }}>Success</span>
                            :
                            <span style={{ color: "#4056C6" }}>Success</span>
                        }
                        
                    </div>
                </div>

                {
                        <div className='txnDetailContent'>
                            <div className='txnDetail-LeftSide'>
                                <div className='txnDetail-transaction-detail'>

                                    <div className='txnDetail-transaction-content'>
                                        <div className='txnDetail-transaction-descArea'>
                                            Category
                                        </div>
                                        <div className='txnDetail-transaction-descArea-content'>
                                            {AllRedu.txnDetail.category}
                                        </div>

                                        <div className='txnDetail-transaction-descArea'>
                                            Transaction ID
                                        </div>
                                        <div className='txnDetail-transaction-descArea-content'>
                                            {AllRedu.txnDetail.id}
                                        </div>

                                        <div className='txnDetail-transaction-descArea'>
                                            Transaction Date
                                        </div>
                                        <div className='txnDetail-transaction-descArea-content'>
                                            {moment(AllRedu.txnDetail.transactionDate).format("DD MMMM YYYY")}
                                        </div>

                                        <div className='txnDetail-transaction-descArea'>
                                            Total Payment
                                        </div>
                                        <div className='txnDetail-transaction-descArea-content'>
                                            {
                                                AllRedu.txnDetail.debit ?
                                                <span style={{ color: "#198754" }}>-{AllRedu.txnDetail.debit}</span>
                                                :
                                                <span style={{ color: "#4056C6" }}>+{AllRedu.txnDetail.credit}</span>
                                            }
                                        </div>

                                        <div className='txnDetail-transaction-descArea'>
                                            Description
                                        </div>
                                        <div className='txnDetail-transaction-descArea-content'>
                                            {AllRedu.txnDetail.description}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                }
            </div>
        </>
    )
}

export default TransactionDetailView