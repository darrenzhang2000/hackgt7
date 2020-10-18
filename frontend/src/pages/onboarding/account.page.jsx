import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Input, Button } from '@material-ui/core'
import {useDispatch} from 'react-redux'
import storeBankAccounts from '../../redux/redux'

const Account = props => {
    const [accountId, setAccountId] = useState("")
    const [accounts, setAccounts] = useState("")
    const dispatch = useDispatch()

    useEffect(() => {

        // const DUMMY_USER = 'HACKATHONUSER001'
        // axios.get(`http://localhost:5000/userid/${DUMMY_USER}`).then(res => {
        //     console.log(res.data)
        //     return res.data
        // })

    }, [])

    const getAccounts = (userId) => {
        axios.get(`http://localhost:5000/userid/${userId}`).then(res => {
            console.log(res.data)
            return res.data
        })
    }

    const handleOnClick = (e) => {
        e.preventDefault()
        console.log('hi')
        const DUMMY_USER = 'HACKATHONUSER001'
        const x = getAccounts(DUMMY_USER)
        setAccounts(x)
    }

    return <div>
        <form onSubmit={() => console.log('hi')}>
            <Input
                fullWidth={true}
                label='Account Id'
                name='accountId'
                required
                autoComplete='account id'
                variant='outlined'
                margin='dense'
                size='medium'
                inputProps={{ style: { color: 'black' } }}
                placeholder="User Name"
                onChange={e => setAccountId(e.target.value)}
            />
            {/* <Button variant="contained" color="primary"> */}
                <button onClick={handleOnClick}>
                    Submit
                </button>
            {/* </Button> */}
            {
                accounts ? accounts.map(acc => acc.type.description) : null
            }

        </form>
    </div>
}

export default Account