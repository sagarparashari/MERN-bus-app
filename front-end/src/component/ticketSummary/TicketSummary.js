import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import jwt_decode from 'jwt-decode';
import './TicketSummary.css';
const TicketSummary = ({ history }) => {
    const [ticketDetails, setTicketDetails] = useState({})
    const [user, setUser] = useState({})
    const [busDetails, setBusDetails] = useState({})
    useEffect(() => {
        const token = sessionStorage.getItem("token")
        const decoded = jwt_decode(token)
        setUser(decoded)
        async function fetchData() {
            try {
                let bookedResponse = await api.post('/api/getBookedUser', {
                    userId: decoded._id,
                    busId: sessionStorage.getItem("bus-id"),
                })
                let busDetails = await api.post('/api/getBusById', {
                    busId: sessionStorage.getItem("bus-id"),
                })
                setTicketDetails(bookedResponse.data.users)
                setBusDetails(busDetails.data.bus)
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])
    const renderSeats = (ticketDetails) => {
        if (ticketDetails.selectedSeats)
            return (ticketDetails.selectedSeats.length)
    }
    const handleTrip = (e) => {
        sessionStorage.removeItem("token")
        history.push("/landing")
    }

    return (
        <div className="tic-summary">
            <div className="summary-top">
                <p><b>Dear {user.name},</b></p>
                <p>Your ticket has been successfully booked and sent to {user.email} and {user.phNumber}</p>
            </div>
            <div className="summary-content">

                <div className="row">
                    <div className="col-4"><h5>From:</h5> {busDetails.from}</div>
                    <div className="col-4"><h5>To:</h5> {busDetails.to}</div>
                    <div className="col-4"><h5>BusType:</h5> {busDetails.busType}</div>
                </div>
                <div className="row">
                    <div className="col-4"><h5>Travel Date:</h5> {busDetails.travelDate}</div>
                    <div className="col-4"><h5>Departure:</h5> {busDetails.departure}</div>
                    <div className="col-4"><h5>Arrival:</h5> {busDetails.arrival}</div>
                </div>
                {/* <div className="row">
                    <div className="col-4"><h5>Passenger Name: {ticketDetails.name}</h5></div>
                    <div className="col-4"><h5>Gender: {ticketDetails.gender}</h5></div>
                    <div className="col-4"><h5>Email: {user.email}</h5></div>
                </div>
                <div className="row">
                    <div className="col-4"><h5>Total Seats: {renderSeats(ticketDetails)}</h5></div>
                    <div className="col-4"><h5>Seats No: {ticketDetails.selectedSeats}</h5></div>
                    <div className="col-4"><h5>Total Fare: {ticketDetails.amountPaid}</h5></div>
                </div> */}
            </div>
            <div className="message">Hope you have a pleasant trip. Happy Travelling!</div><br />
            <button className="btn btn-success" onClick={e => handleTrip(e)}>Book another trip</button>
        </div>
    );
};

export default TicketSummary;