import React, { useEffect } from 'react'
import Cookies from "universal-cookie";
import { useSelector, useDispatch } from "react-redux";
import { ProductTable } from "../../components"
import "./Myorders.css"
import { getallOrders } from "../../actions/orderActions"
import { RingLoader } from "../../components/MyUtils/Loaders";

const Myorders = () => {
    const dispatch = useDispatch();
    const userOrders = useSelector((state) => state.userOrders);
    const cookies = new Cookies();
    let tkn = cookies.get("tkn");
    useEffect(() => {
        if (tkn !== undefined) {
            dispatch(getallOrders());
        }
    }, []); // eslint-disable-line

    useEffect(() => {
        window.scrollTo(0, 0)
      }) // eslint-disable-line
      
    return (
        <>
            {userOrders.loading === true ?
                <RingLoader />
                :
                <div className='Myorderspage'>
                    <h1>My Orders</h1>
                    <div>
                        {userOrders.orders.length > 0 ?
                            userOrders.orders.map((item, key) => {
                                return <ProductTable key={key} data={item} index={key + 1} />
                            })
                            :
                            <p
                                style={{
                                    textAlign: "center",
                                    fontWeight: "600"
                                }}
                            >You don't have any order.
                            </p>
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default Myorders