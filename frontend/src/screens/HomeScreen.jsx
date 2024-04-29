import { useEffect, useState } from 'react'
import { useQuery, useMutation } from "react-query";
import { axiosClient } from '../axiosConfig';
import { Link } from 'react-router-dom';

function HomeScreen() {
    const [products, setProducts] = useState([])
    const [checked, setChecked] = useState([])
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

    //TODO: Use delete crud operation instead
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

    useEffect(() => {
        console.log(checked);
    }, [checked])

    return (
        <>
            <div className='pt-5 d-flex justify-content-between' style={{ height: "15vh" }}>
                <h2>My Products</h2>
                <div className='w-50 d-flex justify-content-end align-items-center gap-4'>
                    <Link to={"/add"} className='w-25 h-75 d-flex align-items-center'>
                        <button className='h-100 w-100 rounded-2 bg-success text-white fs-5 '>Add</button>
                    </Link>
                    <button onClick={handleDelete} className='w-50 h-75 rounded-2 bg-danger text-white fs-5'>Mass Delete</button>
                </div>
            </div>
            <main className='d-flex gap-3 mt-3 border-top border-2'>
                <div className='row w-100'>
                    {products.map((product) => (
                        <div key={product.sku} className='col-3 mt-4'>
                            <div className='border border-2 rounded-3 text-md-center py-4 bg-white'>
                                <input type='checkbox' className='form-check-input' onClick={() => { handleCheck(product.sku) }} />
                                <h3>{product.sku}</h3>
                                <h3>{product.name}</h3>
                                <h4>{product.price}</h4>
                                <h4>{product.productType}</h4>
                                <h4>{product.productValue}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    )
}

export default HomeScreen