import moment from 'moment';
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

export default function PropertyCard({ listing, id, onDelete, onEdit }) {
    
    const result = moment(listing.timestamp?.toDate()).fromNow();
    
    return (
        <li className='relative bg-[#ffd7b1] flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden'>
            <Link className='contents' to={`/category/${listing.type}/${id}`}>
                <img src={listing.imgUrls[0]} 
                alt=""
                className="h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in"
                loading="lazy"
                />
                
                <p className="absolute top-2 left-2 bg-[#ce6c10] text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg">{result}</p>
                <div className='w-full p-[10px]'>
                    <div className='flex items-center space-x-1'>
                        <MdLocationOn className='h-4 w-4 text-green-600' />
                        <p className='font-semibold text-sm mb=[2px] text-gray-600 truncate'>{listing.address}</p>
                    </div>
                    <div className=" flex items-center mt-[8px] space-x-1">
                        <div className="flex items-center space-x-1 text-[#5679eb]">
                            <p className='font-semibold text-xs'>
                                {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
                            </p>
                        </div>
                        <p className='text-sm'>|</p>
                        <div className="flex items-center space-x-1">
                        <p className='font-semibold text-xs text-[#5679eb]'>
                            {listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "1 Bath"}
                        </p>
                        </div>
                    </div>
                    <p className='font-semibold m-0 text-xl text-[#457b9d] truncate'>{listing.name}</p>
                    <p className='text-[#457b9d] mt-2 font-semibold'>${listing.offer 
                    ? listing.discountedPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    : listing.regularPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        
                    {listing.type === "rent" && " / month"}
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
