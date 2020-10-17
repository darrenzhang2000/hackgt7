import { Button } from '@material-ui/core'
import React from 'react'
import "./onboarding2.css"

export default function onboarding2(props) {
    return (
        <div className="root">
            <h1>Which account?</h1>
            <Button className="button" variant="contained" color="primary">Checking</Button>
            <div className="space"></div>
            <Button className="button" variant="contained" color="primary">Savings</Button>
            <div className="space"></div>
            <Button className="button" variant="contained" color="default">Back</Button>
        </div>
    )
}
