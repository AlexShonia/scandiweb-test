import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from "@heroicons/react/20/solid"
import { useMutation } from "react-query";
import { axiosClient } from '../axiosConfig';
import {
    Form,
} from "react-bootstrap";

function AddScreen() {
    const [sku, setSku] = useState();
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [size, setSize] = useState();
    const [height, setHeight] = useState();
    const [width, setWidth] = useState();
    const [length, setLength] = useState();
    const [weight, setWeight] = useState();
    const [productType, setProductType] = useState('DVD');
    const [productValue, setProductValue] = useState();
    const [errorMessages, setErrorMessages] = useState({});

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
                navigate("/")
            },
            onError: (error) => {
                console.log(error);
            }
        },
    )

    function handleSubmit(e) {
        e.preventDefault();

        if (Number.isNaN(Number(price))) {
            setErrorMessages((prev) => { return { ...prev, price: 'Please, provide the data of indicated type' } })
        }

        addProduct.mutate()
    }
    useEffect(() => {
        if (productType === 'DVD') {
            setProductValue(size);
        } else if (productType === 'Furniture') {
            setProductValue(`${height}x${width}x${length}`)
        } else if (productType === 'Book') {
            setProductValue(weight);
        }
    }, [size, height, width, length, weight])

    return (
        <div className='mt-3'>
            <Link to={"/"}><ArrowLeftIcon width={20} />Back</Link>
            <main className='d-flex flex-column gap-3 pt-3' style={{ width: "90vw" }}>
                <form id='product_form' onSubmit={handleSubmit}>
                    <label className='form-label'>Enter SKU</label>
                    <input
                        id='sku'
                        required
                        type="text"
                        className='form-control w-25'
                        placeholder="SKU"
                        value={sku ? sku : ""}
                        onChange={(e) => setSku(e.target.value)}
                    />
                    <label className='form-label'>Name of the Product</label>
                    <input
                        id='name'
                        required
                        type="text"
                        className='form-control w-25'
                        placeholder="Name"
                        value={name ? name : ""}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label className='form-label'>Enter Price</label>
                    <input
                        id='price'
                        required
                        type="text"
                        className='form-control w-25'
                        placeholder="Price"
                        value={price ? price : ""}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    {errorMessages?.price && <div className='alert-danger w-25'>{errorMessages.price}</div>}
                    <Form.Select
                        id='productType'
                        size="sm"
                        style={{ width: "10%" }}
                        onChange={(e) => setProductType(e.target.value)}
                    >
                        <option value='DVD'>DVD</option>
                        <option value='Furniture'>Furniture</option>
                        <option value='Book'>Book</option>
                    </Form.Select>
                    {/* ADD Selected Type to the right */}
                    {productType === 'DVD' ? (
                        <>
                            <label className='form-label'>Size (MB)</label>
                            <input
                                id='size'
                                required
                                type="text"
                                className='form-control w-25'
                                placeholder="size"
                                value={size ? size : ""}
                                onChange={(e) => setSize(e.target.value)}
                            />
                        </>
                    ) : ("")}
                    {productType === 'Furniture' ? (
                        <>
                            <label className='form-label'>Height (CM)</label>
                            <input
                                id='height'
                                required
                                type="text"
                                className='form-control w-25'
                                placeholder="size"
                                value={height ? height : ""}
                                onChange={(e) => setHeight(e.target.value)}
                            />
                            <label className='form-label'>Width (CM)</label>
                            <input
                                id='width'
                                required
                                type="text"
                                className='form-control w-25'
                                placeholder="size"
                                value={width ? width : ""}
                                onChange={(e) => setWidth(e.target.value)}
                            />
                            <label className='form-label'>Length (CM)</label>
                            <input
                                id='length'
                                required
                                type="text"
                                className='form-control w-25'
                                placeholder="size"
                                value={length ? length : ""}
                                onChange={(e) => setLength(e.target.value)}
                            />
                        </>
                    ) : ("")}
                    {productType === 'Book' ? (
                        <>
                            <label className='form-label'>Weight (KG)</label>
                            <input
                                id='weight'
                                required
                                type="text"
                                className='form-control w-25'
                                placeholder="size"
                                value={weight ? weight : ""}
                                onChange={(e) => setWeight(e.target.value)}
                            />
                        </>
                    ) : ("")}
                    <button type='submit' className='mt-3 h-100 w-25 rounded-2 bg-success text-white fs-5'>Add product</button>
                </form>
            </main>
        </div>
    )
}

export default AddScreen