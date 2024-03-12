import React from 'react'
import { useState, useEffect } from 'react';
import Header from '../components/Header'
import { collection, doc, getDocs, orderBy, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { db } from '../firebase';
import PropertyCard from '../components/PropertyCard';
import { getAuth } from 'firebase/auth';
import { useParams } from 'react-router';

const Admin = () => {

    const auth = getAuth();
    const [rentListings, setRentListings] = useState(null);

    const [formData, setFormData] = useState({
        type: 'Approved'
    });

    const {
        type } = formData;

const onSubmit = async () => {

        const formDataCopy = {
            ...formData,
            timestamp: serverTimestamp(),
            userRef: auth.currentUser.uid,
        };

        const docRef = doc(db, "listings", type);

        await updateDoc(docRef, formDataCopy);
        setLoading(false);
        toast.success("Property Updated");
        
    }

    useEffect(() => {
        async function fetchListings() {
        try {
            // get reference
            const listingsRef = collection(db, "listings");
            // create the query
            const q = query(
            listingsRef,
            where("type", "==", "notApproved"),
            orderBy("timestamp", "desc")
            );
            // execute the query
            const querySnap = await getDocs(q);
            const listings = [];
            querySnap.forEach((doc) => {
            return listings.push({
                id: doc.id,
                data: doc.data(),
            });
            });
            setRentListings(listings);
            console.log(listings)
            } catch (error) {
                console.log(error);
            }
        }
        fetchListings();
    }, []);

    const Approved = () => {
        return onSubmit()
        console.log(formData)
    }

    const notApproved = () => {

    }

    return (
        <>
            <div>
            {/* Pending Properties */}
            <section>
                <div className="max-w-6xl mx-auto pt-4 space-y-6 ">
                {rentListings && rentListings.length > 0 && (
                    <div className="m-2 mb-6">
                        <h2 className="px-3 text-2xl mt-6 mb-2 font-semibold">
                        Pending Request
                        </h2>
                        
                        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {rentListings.map((listing) => (
                            <PropertyCard
                            key={listing.id}
                            listing={listing.data}
                            id={listing.id}
                            Approved={() => Approved(listing.id)}
                            notApproved={() => notApproved(listing.id)}
                            />
                        ))}
                        </ul>
                    </div>
                )}
                </div>
            </section>
            </div>
        </>
    )
}

export default Admin