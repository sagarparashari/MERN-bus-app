import React, { useState, useEffect } from 'react';
import './payment.css';

const Payment = ({ value: totalFare, onChild6 }) => {
    const [details, setDetails] = useState({
        number: '',
        name: '',
        cvv: '',
        month: '',
        year: '',
    })
    const [number, setNumber] = useState('')
    const [name, setName] = useState('')
    const [cvv, setCvv] = useState('')
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const [transId, setTransId] = useState('')
    useEffect(() => {
        function transId() {
            let n = Math.floor(Math.random() * (2000000 - 1000000) + 1000000)
            setTransId(n)
        }
        transId()
    }, [])
    const handleNumber = (e) => {
        e.preventDefault()
        let value = e.target.value
        if (!value) {
            return (setNumber("Card No is required"))
        }
        if (value) {
            let regExp = /^\d{16}$/
            if (!(regExp.test(value))) {
                return (setNumber("Card number should be of 16 digits"))
            }
            else {
                setDetails(prevState => ({
                    ...prevState,
                    number: value
                }))
                return (setNumber(""))

            }
        }
    }
    const handleName = (e) => {
        e.preventDefault()
        let value = e.target.value
        if (!value) {
            return (setName(" Name on card is required"))
        } else {
            setDetails(prevState => ({
                ...prevState,
                name: value
            }))
            return (setName(""))
        }
    }
    const handleCVV = (e) => {
        e.preventDefault()
        let value = e.target.value
        if (!value) {
            return (setCvv("CVV is required"))
        }
        if (value) {
            let regExp = /^([0-9]{3})$/
            if (!(regExp.test(value))) {
                return (setCvv("CVV not valid"))
            }
            else {
                setDetails(prevState => ({
                    ...prevState,
                    cvv: value
                }))
                return (setCvv(""))

            }
        }
    }
    const handleMonth = (e) => {
        e.preventDefault()
        let value = e.target.value
        if (!value) {
            return (setMonth("Please select Month"))
        }
        if (value) {
            let regExp = /^01|02|03|04|05|06|07|08|09|10|11|12$/
            if (!(regExp.test(value))) {
                return (setMonth("Month not valid"))
            }
            else {
                setDetails(prevState => ({
                    ...prevState,
                    month: value
                }))
                return (setMonth(" "))

            }
        }
    }
    const handleYear = (e) => {
        e.preventDefault()
        let value = e.target.value
        if (!value) {
            return (setYear("Please select Year"))
        }
        if (value) {
            let regExp = /^(20[2-9]\d|3000)$/
            if (!regExp.test(value)) {
                return (setYear("Year should be between 2020 - 3000"))
            }
            else {
                setDetails(prevState => ({
                    ...prevState,
                    year: value
                }))
                return (setYear(""))
            }
        }
    }
    const handlePayNow = (e) => {
        e.preventDefault()
        if (onChild6) {
            let e = { n: 4 }
            onChild6(e)
        }
    }
    const handleBack = (e) => {
        e.preventDefault()
        if (onChild6) {
            let e = { n: 1 }
            onChild6(e)
        }
    }

    return (
        <div>
            <div className="payment-top">
                <p>Amount ₹.{totalFare}</p>
                <p>Transaction ID:{transId}</p>
            </div>
            <form onSubmit={e => handlePayNow(e)}>
                <div className="container">
                    <div className="row credit">
                        <div className="col-4">Card Type</div>
                        <div className="col-6">
                            <input type="radio" name="card" value={"visa"} />&nbsp;
                        <label htmlFor="visa">Visa</label>&nbsp;&nbsp;
                        <input type="radio" name="card" value={"masterCard"} />&nbsp;
                        <label htmlFor="masterCard">MasterCard</label>
                        </div>
                    </div>
                    <div className="card-num">
                        <div className="row">
                            <div className="col-4"><label htmlFor="number">Card Number</label></div>
                            <div className="col-6">
                                <input type="number" placeholder="Enter Card No" name="number" onBlur={e => { handleNumber(e) }} />
                                <div style={{ color: "red" }}>{number}</div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4"><label htmlFor="name">Name on Card</label> </div>
                        <div className="col-6" id="cvv">
                            <input type="text" placeholder="Enter Card holder Name" name="name" onBlur={e => { handleName(e) }} />
                            <div style={{ color: "red" }}>{name}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4"><label htmlFor="cvv">CVV</label> </div>
                        <div className="col-6">
                            <input type="number" placeholder="CVV" name="cvv" onBlur={e => { handleCVV(e) }} />
                            <div style={{ color: "red" }}>{cvv}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4"><label htmlFor="date">Expiry Date</label> </div>
                        <div className="col-1">
                            <input type="number" placeholder="Month" name="date" onBlur={e => { handleMonth(e) }} />
                            <div style={{ color: "red" }}>{month}</div>
                        </div>
                        <div className="col-1">
                            <input type="number" placeholder="Year" name="date" onBlur={e => { handleYear(e) }} />
                            <div style={{ color: "red" }}>{year}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4"></div>
                        <div className="col-4">
                            <button className="btn btn-success" type="submit"
                                disabled={!details.number || !details.name || !details.cvv || !details.month || !details.year}>Pay Now</button>
                            <button className="btn btn-danger" onClick={e => handleBack(e)}>Cancel</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Payment;