import React from 'react'
import BA from './images/ba.png'
import Citi from './images/citi.png'
import TD from './images/td.png'
import WF from './images/wf.jpeg'
import ICBC from './images/icbc.png'
import SIB from './images/sib.png'
import WHB from './images/whb.png'
import FCB from './images/fcb.png'
import "./onboarding1.css"
import { Button } from "@material-ui/core"

export default function Onboarding1(props) {
    return (
        <div className="banks">
            <h1>Link Bank?</h1>

            <div>
                <img src={BA} />
                <Button fullWidth={true} variant="contained" color="primary" >Bank of America</Button>
            </div>

            <div>
                <img src={WF} />
                <Button fullWidth={true} variant="contained" color="primary">Wells Fargo</Button>
            </div>

            <div>
                <img src={Citi} />
                <Button fullWidth={true} variant="contained" color="primary"> Citibank</Button>
            </div>

            <div>
                <img src={TD} />
                <Button fullWidth={true} variant="contained" color="primary">TD Bank</Button>
            </div>

            <div>
                <img src={ICBC} />
                <Button fullWidth={true} variant="contained" color="primary">ICBC</Button>
            </div>

            <div>
                <img src={FCB} />
                <Button fullWidth={true} variant="contained" color="primary">First Citizen Bank</Button>
            </div>

            <div>
                <img src={WHB} />
                <Button fullWidth={true} variant="contained" color="primary">World Houston Bank</Button>
            </div>

            <div>
                <img src={SIB} />
                <Button fullWidth={true} variant="contained" color="primary">Stanbic ITBC Bank</Button>
            </div>

            <div>
                <Button fullWidth={true} variant="contained" color="primary">Other</Button>
            </div>
        </div>
    )
}
