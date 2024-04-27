import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from "@heroicons/react/20/solid"
import { useMutation } from "react-query";
import { axiosClient } from '../axiosConfig';

function AddScreen() {
    const [sku, setSku] = useState();
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [productType, setProductType] = useState();
    const [productValue, setProductValue] = useState();
    const [formData, setFormData] = useState();

    const navigate = useNavigate();

    const addProduct = useMutation(
        "add product",
        async () => {
            const response = await axiosClient.post("/add",
                {
                    sku,
                    name,
                    price,
                    productType,
                    productValue
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            )
            return response.data;
        },
        {
            onSuccess: () => {
                console.log("yay");
                navigate("/")
            }
        }
    )

    function handleSubmit(e) {
        e.preventDefault();
        const formData1 = new FormData(e.target);
        setFormData(formData1);
        addProduct.mutate()

    }
    useEffect(() => {
    }, [sku])

    return (
        <div className='mt-3'>
            <Link to={"/"}><ArrowLeftIcon width={20} />Back</Link>
            <main className='d-flex flex-column gap-3 pt-3' style={{ width: "90vw" }}>
                {/* TODO: add back arrow */}
                <form onSubmit={handleSubmit}>
                    <label className='form-label'>Enter sku</label>
                    <input
                        type="text"
                        className='form-control w-25'
                        placeholder="SKU"
                        value={sku ? sku : ""}
                        onChange={(e) => setSku(e.target.value)}
                    />
                    <label className='form-label'>Name of the Product</label>
                    <input
                        type="text"
                        className='form-control w-25'
                        placeholder="Name"
                        value={name ? name : ""}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label className='form-label'>Enter Price</label>
                    <input
                        type="text"
                        className='form-control w-25'
                        placeholder="Price"
                        value={price ? price : ""}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <label className='form-label'>Product type</label>
                    <input
                        type="text"
                        className='form-control w-25'
                        placeholder="product type"
                        value={productType ? productType : ""}
                        onChange={(e) => setProductType(e.target.value)}
                    />
                    <label className='form-label'>Product Value</label>
                    <input
                        type="text"
                        className='form-control w-25'
                        placeholder="product value"
                        value={productValue ? productValue : ""}
                        onChange={(e) => setProductValue(e.target.value)}
                    />
                    <button className='mt-3 h-100 w-25 rounded-2 bg-success text-white fs-5'>Add product</button>
                </form>
            </main>
        </div>
    )
}

export default AddScreen