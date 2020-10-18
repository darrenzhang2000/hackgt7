import { Button } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import "./onboarding2.css"

function onboarding2 (props) {


    return (
        <div className="root">
            <h1>Which account?</h1>
            {/* {
                bankAccounts.map(acc => <p>
                    {acc.type.value}
                </p>)
            } */}

            <Button className="button" variant="contained" color="primary">Checking</Button>
            <div className="space"></div>
            <Button className="button" variant="contained" color="primary">Savings</Button>
            <div className="space"></div>
            <Button className="button" variant="contained" color="default">Back</Button>
        </div>
    )
}

export default onboarding2