import React, { useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'


const Onboarding3 = props => {
    const state = useSelector(state => state.state)
    const bankAccounts = useSelector(state => state.accounts)

    console.log(state)
    console.log(bankAccounts)
    useEffect(() => {
    }, [])

    return <div>
        {
            bankAccounts.map(acc => <p>
                {acc.type.value}
            </p>)
        }
        hi
    </div>
}

export default Onboarding3