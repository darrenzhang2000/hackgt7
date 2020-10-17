import React from 'react'
import BA from './images/ba.png'
import Citi from './images/citi.png'
import TD from './images/td.png'
import WF from './images/wf.jpeg'
import "./onboarding1.css"

export default function Onboarding1(props) {
    return (
        <div>
            <h1>Link Bank?</h1>
            <div className="banks">

                <div>
                    <img src={BA}/>
                    <button>Bank of America</button>
                </div>

                <div>
                    <img src={WF}/>
                    <button>Wells Fargo</button>
                </div>

                <div>
                    <img src={Citi}/>
                    <button>Citibank</button>
                </div>

                <div>
                    <img src={TD}/>
                    <button>TD Bank</button>
                </div>

                <div>
                    <button>Other</button>
                </div>
            </div>
        </div>
    )
}
