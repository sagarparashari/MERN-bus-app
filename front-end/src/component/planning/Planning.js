import React, { useState } from 'react';
import './planning.css';
import getBus from '../../api/api';
import BusTable from '../table/Table'
const Planning = (props) => {
    const [plan, setPlan] = useState('')
    const [busData, setBusData] = useState({})
    const handleFrom = (e, field) => {
        e.preventDefault()
        let value = e.target.value
        setPlan({ ...plan, [field]: value.toLowerCase() })
        console.log(plan.date)
    }
    const handlePlan = async (e) => {
        e.preventDefault()
        try {
            let response = await getBus.post('/api/busDetails', {
                from: plan.from, to: plan.to, travelDate: plan.date,

            })
            if (response.data.status === true) {
                // console.log(response.data.bus)
                return (setBusData(response.data))

            }
        }
        catch (err) { console.log(err) }
    }
    const renderBus = (busData) => {
        if (Object.keys(busData).length > 0)
            return (<BusTable value={busData} onChild2={e1 => handleSeat(e1)} />)
    }
    const handleSeat = (e) => {
        let { onChild1 } = props
        // return(e.target.value=2)
        if (onChild1) {
            let e = { busData, n: 2 }
            onChild1(e)
        }
    }
    const clearFunc = () => {
        return (setPlan(''))
    }
    const editFunc = () => {
        return (setPlan(''))
    }

    return (
        <div>
            <div className="planning">
                <div className="row">
                    <div className='col-sm-3'>
                        <label htmlFor="exampleFormControlSelect1"><b>From</b></label>
                        <select className="form-control" id="exampleFormControlSelect1" onClick={e => handleFrom(e, "from")}>
                            <option value="" disabled selected hidden>Select a city</option>
                            <option>Chennai</option>
                            <option>Bangalore</option>
                            <option>Hyderabad</option>
                            <option>Pune</option>
                            <option>Mumbai</option>
                        </select>
                    </div>&nbsp;&nbsp;&nbsp;
                    <div className='col-sm-3'>
                        <label htmlFor="exampleFormControlSelect1"><b>To</b></label>
                        <select className="form-control" id="exampleFormControlSelect1" onClick={e => handleFrom(e, "to")}>
                            <option value="" disabled selected hidden>Select a city</option>
                            <option>Chennai</option>
                            <option>Bangalore</option>
                            <option>Hyderabad</option>
                            <option>Pune</option>
                            <option>Mumbai</option>
                        </select>
                    </div>&nbsp;&nbsp;&nbsp;
                    <div className='col-sm-3'>
                        <label htmlFor="doj"><b>Travel Date</b></label>
                        <div><input type="date" id="doj" name="doj" onChange={e => handleFrom(e, "date")} /></div>
                    </div>
                    <div className='col-2'>
                        <button className="btn btn-success" onClick={e => handlePlan(e)}>Plan Trip</button>
                    </div>
                </div>
            </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="/landing" className="clear" onClick={editFunc}>Edit</a>&nbsp;
            <span className="strike">|</span>&nbsp;
            <a href="/landing" className="clear" onClick={clearFunc}>Clear</a>
            {renderBus(busData)}
        </div>
    );
};

export default Planning;