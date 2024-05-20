import moment from 'moment';
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { collection } from 'firebase/firestore';
import { db } from '../firebase';
import { FaCheck, FaX } from "react-icons/fa6";

export default function PropertyCard({ listing, id, onDelete, onEdit, Approved, notApproved }) {
    const result = moment(listing.timestamp?.toDate()).fromNow();

        return (
        <li className='relative bg-[#ffd7b1] flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md'>
            <Link className='contents' to={`/property/${id}`}>
                <img src={listing.imgUrls[0]} 
                alt=""
                className="h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in rounded-t-md "
                loading="lazy"
                />
                
                <p className="absolute top-2 left-2 bg-[#d36f12] text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg">{result}</p>
                <div className='w-full p-[10px]'>
                    <div className='flex items-center space-x-1'>
                        <MdLocationOn className='h-4 w-4 text-[#b35c15]' />
                        <p className='font-semibold text-lg mb=[2px] text-[#b35c15] truncate'>{listing.address}</p>
                    </div>
                    <div className="flex items-center space-x-1 text-[#b35c15]">
                            <p className='font-semibold text-xs'>
                                {listing.city}
                            </p>
                        </div>
                    <div className=" flex items-center mt-2 space-x-1">
                        <div className="flex items-center space-x-1 text-[#b35c15]">
                            <p className='font-semibold text-xs'>
                                {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
                            </p>
                        </div>
                        <p className='text-sm text-[#b35c15]'>|</p>
                        <div className="flex items-center space-x-1">
                        <p className='font-semibold text-xs text-[#b35c15]'>
                            {listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "1 Bath"}
                        </p>
                        </div>
                    </div>
                    
                    <p className='text-[#d8681d] mt-2 font-semibold'>₱{listing.Price
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") 
                    }  / month
                    </p>

                    
                </div>

            </Link>
            {
                onDelete && (
                    <FaTrash 
                    className='absolute bottom-2 right-2 h-[14px] cursor-pointer text-red-500'
                    onClick={()=> onDelete(listing.id)}
                    />
                )
            }
            {
                onEdit && (
                    <MdEdit 
                    className='absolute bottom-2 right-7 h-[14px] cursor-pointer text-green-500'
                    onClick={()=> onEdit(listing.id)}
                    />
                )
            }
            {
                notApproved && (
                    <FaX 
                    className='absolute bottom-2 right-2 h-[14px] cursor-pointer text-red-500'
                    onClick={()=> notApproved(listing.id)}
                    />
                )
            }
            {
                Approved && (
                    <FaCheck 
                    className='absolute bottom-2 right-7 h-[14px] cursor-pointer text-green-500'
                    onClick={()=> Approved(listing.id)}
                    />
                )
            }
        </li>
    )
}
