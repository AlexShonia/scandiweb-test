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
    const [submitted, setSubmitted] = useState(false);

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
        },
    )


    function isEmpty(item, varName) {
        if (!item) {
            setErrorMessages((prev) => { return { ...prev, [varName]: 'Please, submit required data' } })
        }
    }

    function isNumber(item, varName) {
        if (Number.isNaN(Number(item))) {
            setErrorMessages((prev) => { return { ...prev, [varName]: 'Please, provide the data of indicated type' } })
        }
    }


    function handleSubmit(e) {
        e.preventDefault();

        isEmpty(sku, "sku");
        isEmpty(name, "name");
        isNumber(price, "price")
        isEmpty(price, "price");

        if (productType === 'DVD') {
            isNumber(size, "size")
            isEmpty(size, "size");
        }
        if (productType === 'Furniture') {
            isNumber(height, "height")
            isEmpty(height, "height");
            isNumber(width, "width")
            isEmpty(width, "width");
            isNumber(length, "length")
            isEmpty(length, "length");
        }

        if (productType === 'Book') {
            isNumber(weight, "weight")
            isEmpty(weight, "weight");
        }
        setSubmitted(true);
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
        setErrorMessages({});
    }, [sku, name, price, size, height, width, length, weight])

    useEffect(() => {
        if (submitted && errorMessages && Object.keys(errorMessages).length === 0) {
            addProduct.mutate();
        }
        setSubmitted(false);
    }, [submitted])

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
            {addProduct.isError && <Alert variant='danger'>Something Went Wrong</Alert>}
            <main className='d-flex flex-column gap-3 mt-3 border-top border-2' style={{ width: "90vw" }}>
                <Form id='product_form' className='pt-5'>
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
                    {errorMessages?.sku && <Alert variant='danger' size='sm' className='w-50'>{errorMessages.sku}</Alert>}
                    <input
                        id='name'
                        required
                        type="text"
                        className='form-control w-25'
                        placeholder="Name"
                        value={name ? name : ""}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errorMessages?.name && <Alert variant='danger' size='sm' className='w-50'>{errorMessages.name}</Alert>}
                    <label className='form-label'>Enter Price</label>
                    <input
                        id='price'
                        required
                        type="number"
                        step="0.01"
                        className='form-control w-25'
                        placeholder="Price"
                        value={price ? price : ""}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    {errorMessages?.price && <Alert variant='danger' size='sm' className='w-50'>{errorMessages.price}</Alert>}
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
                    {productType === 'DVD' ? (
                        <>
                            <label className='form-label'>Size (MB)</label>
                            <input
                                id='size'
                                required
                                type="number"
                                className='form-control w-25 mb-3'
                                placeholder="size"
                                value={size ? size : ""}
                                onChange={(e) => setSize(e.target.value)}
                            />
                            <strong>Please, provide size in MB</strong>
                            {errorMessages?.size && <Alert variant='danger' size='sm' className='w-50'>{errorMessages.size}</Alert>}
                        </>
                    ) : ("")}
                    {productType === 'Furniture' ? (
                        <>
                            <label className='form-label'>Height (CM)</label>
                            <input
                                id='height'
                                required
                                type="number"
                                className='form-control w-25'
                                placeholder="height"
                                value={height ? height : ""}
                                onChange={(e) => setHeight(e.target.value)}
                            />
                            {errorMessages?.height && <Alert variant='danger' size='sm' className='w-50'>{errorMessages.height}</Alert>}
                            <label className='form-label'>Width (CM)</label>
                            <input
                                id='width'
                                required
                                type="number"
                                className='form-control w-25'
                                placeholder="width"
                                value={width ? width : ""}
                                onChange={(e) => setWidth(e.target.value)}
                            />
                            {errorMessages?.width && <Alert variant='danger' size='sm' className='w-50'>{errorMessages.height}</Alert>}
                            <label className='form-label'>Length (CM)</label>
                            <input
                                id='length'
                                required
                                type="number"
                                className='form-control w-25 mb-3'
                                placeholder="length"
                                value={length ? length : ""}
                                onChange={(e) => setLength(e.target.value)}
                            />
                            <strong>Please, provide dimensions</strong>
                            {errorMessages?.length && <Alert variant='danger' size='sm' className='w-50'>{errorMessages.length}</Alert>}
                        </>
                    ) : ("")}
                    {productType === 'Book' ? (
                        <>
                            <label className='form-label'>Weight (KG)</label>
                            <input
                                id='weight'
                                required
                                type="number"
                                className='form-control w-25 mb-3'
                                placeholder="weight"
                                value={weight ? weight : ""}
                                onChange={(e) => setWeight(e.target.value)}
                            />
                            <strong>Please, provide weight in KG</strong>
                            {errorMessages?.weight && <Alert variant='danger' size='sm' className='w-50'>{errorMessages.weight}</Alert>}
                        </>
                    ) : ("")}
                </Form>
            </main>
        </>
    )
}

export default AddScreen