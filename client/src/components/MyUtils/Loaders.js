import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react'
import { Rings, Oval } from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useNavigate } from 'react-router-dom';
import { FiCloudOff } from "react-icons/fi"

export const RingLoader = () => {
    const navigate = useNavigate()
    const myStyles = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        margin: "5rem auto",
        color: "#45bd52",
        width: "100%",
        minHeight: "290px"
    }
    const reloadButton = {
        fontSize: ".7rem",
        padding: "0.4rem 0.6rem",
        margin: "0 3px",
        backgroundColor: "var(--lightGreen2)",
        color: "white"
    }
    const [waitTimeOut, setWaitTimeout] = useState(false)
    useEffect(() => {
        setTimeout(() => setWaitTimeout(true), 10000)
        // setTimeout(() => console.log(0), 10000)
    }, [setWaitTimeout])
    return (
        <div style={myStyles}>
            {waitTimeOut === false ?
                <>
                    <Rings
                        ariaLabel="loading-indicator"
                        height={60}
                        width={60}
                        color="#45bd52"
                    />
                    <h5>loading...</h5>
                </>
                :
                <>
                    <FiCloudOff style={{
                        width: "3%",
                        height: "auto"
                    }} />
                    <h3>Something went wrong !</h3>
                    <Button
                        style={reloadButton}
                        size='small'
                        onClick={() => {
                            navigate('/');
                            window.location.reload();
                        }}>Refresh</Button>
                </>
            }
        </div>
    )
}

export const SpinLoader = () => {
    const myStyles = {
        display: "flex",
        justifyContent: "center",
        alignItem: 'center',
        width: "100%",
        fontSize: '.7rem'
    }
    return (
        <div style={myStyles}>
            <Oval
                ariaLabel="loading-indicator"
                height={20}
                width={20}
                strokeWidth={4}
                color="#45bd52"
                secondaryColor="white"
            />
            <p style={{ margin: 'auto 0 auto 5px' }}>Please wait ...</p>
        </div>
    )
}