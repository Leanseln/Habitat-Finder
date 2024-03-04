import moment from 'moment';
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

export default function PropertyCard({ listing, id, onDelete, onEdit }) {
    
    const result = moment(listing.timestamp?.toDate()).fromNow();
    
    return (
        <li className='relative bg-[#ffd7b1] flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md'>
            <Link className='contents' to={`/property/${id}`}>
                <img src={listing.imgUrls[0]} 
                alt=""
                className="h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in"
                loading="lazy"
                />
                
                <p className="absolute top-2 left-2 bg-[#ce6c10] text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg">{result}</p>
                <div className='w-full p-[10px]'>
                    <div className='flex items-center space-x-1'>
                        <MdLocationOn className='h-4 w-4 text-amber-700' />
                        <p className='font-semibold text-sm mb=[2px] text-[#a36533] truncate'>{listing.address}</p>
                    </div>
                    <p className='font-semibold mt-1 text-xl text-amber-700 truncate'>{listing.name}</p>
                    <div className=" flex items-center mt-2 space-x-1">
                        <div className="flex items-center space-x-1 text-amber-700">
                            <p className='font-semibold text-xs'>
                                {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
                            </p>
                        </div>
                        <p className='text-sm text-amber-700'>|</p>
                        <div className="flex items-center space-x-1">
                        <p className='font-semibold text-xs text-amber-700'>
                            {listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "1 Bath"}
                        </p>
                        </div>
                    </div>
                    
                    <p className='text-[#A54A36] mt-2 font-semibold'>₱{listing.Price
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") 
                        }  / month
                    </p>

                    
                </div>

            </Link>
            {
                onDelete && (
                    <FaTrash 
                    className='absolute bottom-2 right-2 h-[14px] cursor-pointer text-red-500'
                    onClick={()=>onDelete(listing.id)}
                    />
                )
            }
            {
                onEdit && (
                    <MdEdit 
                    className='absolute bottom-2 right-7 h-[14px] cursor-pointer text-green-500'
                    onClick={()=>onEdit(listing.id)}
                    />
                )
            }
        </li>
    )
}
