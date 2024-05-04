import { useState } from 'react'
import { useQuery, useMutation } from "react-query";
import { axiosClient } from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Form, Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';

function HomeScreen() {
    const [products, setProducts] = useState([])
    const [checked, setChecked] = useState([])
    const navigate = useNavigate();
    const { isLoading, error, refetch } = useQuery(
        "products",
        async () => {
            const response = await axiosClient.get("/");
            return response.data;
        },
        {
            onSuccess: (data) => {
                setProducts(data);
            }
        }
    )

    const massDelete = useMutation(
        "mass delete",
        async () => {
            const response = await axiosClient.post("/delete",
                {
                    "skuArr": checked
                },
                {
                    headers: {
                        "Content-type": "application/json",
                    },
                }
            );
            return response.data;
        },
        {
            onSuccess: () => {
                refetch();
                setChecked([]);
            }
        }
    )

    function handleCheck(sku) {
        setChecked((prevChecked) => {
            if (prevChecked.includes(sku)) {
                return prevChecked.filter((element) => element !== sku)
            } else {
                return [...prevChecked, sku]
            }
        })
    }

    function handleDelete() {
        massDelete.mutate();
    }

    function handleAdd() {
        navigate("/add")
    }

    return (
        <>
            <div className='pt-5 d-flex justify-content-between' style={{ height: "15vh" }}>
                <h2 className='align-content-center'>Product List</h2>
                <div className='w-50 d-flex justify-content-end align-items-center gap-3'>
                    <Button variant='success' size='lg' onClick={handleAdd}>ADD</Button>
                    <Button variant='danger' size='lg' onClick={handleDelete}>MASS DELETE</Button>
                </div>
            </div>
            {isLoading && <Loader />}
            {error && <Alert variant='danger'>Something Went Wrong</Alert>}
            {massDelete.isLoading && <Loader />}
            {massDelete.isError && <Alert variant='danger'>Something Went Wrong</Alert>}
            {products &&
                <main className='mt-3 border-top border-2'>
                    <Row>
                        {products.map((product) => (
                            <Col md="3" sm="1" key={product.sku} className='mt-4'>
                                <div className='border border-2 rounded-3 text-md-center py-4 bg-white'>
                                    <Form.Check onClick={() => { handleCheck(product.sku) }} className='delete-checkbox' />
                                    <h3>{product.sku}</h3>
                                    <h3>{product.name}</h3>
                                    <h4>{product.price}</h4>
                                    <h4>{product.productType}</h4>
                                    <h4>{product.productValue}</h4>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </main>
            }
        </>
    )
}

export default HomeScreen
