import { useEffect, useState } from "react"
import AccountNav from "../AccountNav"
import axios from "axios";
import PlaceImg from "../PlaceImg";
export default function BookingsPage (){
    debugger;
    const[bookings,setBookings] = useState([]);
    useEffect(()=> {
    axios.get('/bookings').then(response => {
        setBookings(response.data);
    })
    },[])
    return(
        <div>
            <AccountNav />
            <div>
                {bookings?.length > 0 && bookings.map(booking => (
                <div className="flex m-3 bg-gray-200 rounded-2xl overflow-hidden">
                    <div className="w-48">
                      <PlaceImg place={booking.place} />  
                    </div>
                    <div className="ms-2 py-3">
                    <h2 className="text-xl">{booking.place.title}</h2>
                    {booking.checkIn} - {booking.checkOut} <br />
                    Total Price : ${booking.price}
                    </div>  
                </div>
                ))}
            </div>
        </div>
    )
}