import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from "react-query";
import { axiosClient } from '../axiosConfig';
import {
    Alert,
    Button,
    Form,
} from "react-bootstrap";
import Loader from '../components/Loader';

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
                navigate('/')
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

    function handleCancel() {
        navigate('/')
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
        <>
            <div className='pt-5 d-flex justify-content-between' style={{ height: "15vh" }}>
                <h2 className='align-content-center'>Product Add</h2>
                <div className='w-50 d-flex justify-content-end align-items-center gap-3'>
                    <Button variant='success' size='lg' onClick={handleSubmit}>Save</Button>
                    <Button variant='danger' size='lg' onClick={handleCancel}>Cancel</Button>
                </div>
            </div>
            {addProduct.isLoading && <Loader />}
            {addProduct.isError && <Alert variant='danger'>{addProduct.error}</Alert>}
            <main className='d-flex flex-column gap-3 mt-3 border-top border-2' style={{ width: "90vw" }}>
                <form id='product_form' className='pt-5'>
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
                    <div className='w-25 d-flex gap-3'>
                        <label className='align-content-center'>
                            Product Type:
                        </label>
                        <div>
                            <Form.Select
                                id='productType'
                                className='my-3 w-100'
                                size="md"
                                style={{ width: "10%" }}
                                onChange={(e) => setProductType(e.target.value)}
                            >
                                <option value='DVD'>DVD</option>
                                <option value='Furniture'>Furniture</option>
                                <option value='Book'>Book</option>
                            </Form.Select>
                        </div>
                    </div>
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
                    {/* <button type='submit' className='mt-3 h-100 w-25 rounded-2 bg-success text-white fs-5'>Add product</button> */}
                </form>
            </main>
        </>
    )
}

export default AddScreen