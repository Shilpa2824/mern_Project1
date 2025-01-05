import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
export const ShopContext = createContext();
import axios from 'axios'
import { useNavigate } from "react-router-dom";
// import { products } from '../assets/assets'

const ShopContextProvider = (props) => {
  
    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = "http://localhost:4000"
    const [search, setSearch] = useState(' ');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({}); //here we are intialize it with an empty onject
    const [products, setProducts] = useState([]);
    const[token , setToken] = useState('')
    const navigate = useNavigate();

    const axiosConfig = {
        baseURL: backendUrl,
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: 5000,
    };

    // const axiosConfig = {
    //     baseURL: backendUrl, // sahi backend URL
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer,  ${token} ` // agar authentication ki zaroorat hai
    //     },
    //     timeout: 10000, // timeout ko increase kiya
       
    //   };
      
    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Select Product Size')
            return;
        }
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add' , {itemId,size},{headers: {token}})
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
        
    }


    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error.message)
                }
            }
        }
        return totalCount;
    }

    const updateQuantity =  async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update' ,{itemId,size,quantity} , {headers :{token}})
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item]
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error.message)
                }
            }
        }
        return totalAmount;
    }

    // useEffect(()=>{
    //     console.log(cartItems);
    // },[cartItems])

    // const getProductsData = async () => {
    //     try {
    //         const response = await axios.get(backendUrl + '/api/product/list')
    //     if(response.data.success){
    //         setProducts(response.data.products)
    //     }    
    //     else{
    //         toast.error(response.data.message)
    //     }
    //     } catch (error) {
    //         console.log(error)
    //         toast.error(error.message)
    //     }
    // }
    // useEffect(() => {
    //     getProductsData();
    // },[])

    const getProductsData = async () => {
        try {
            const response = await axios.get('/api/product/list', axiosConfig)
            if (response.data.success) {
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getUserCart = async (token ) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get' , {} , {headers: {token}})
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    useEffect(() => {
        getProductsData();
    }, [])

    useEffect(() => {
if (!token && localStorage.getItem('token')) {
   setToken(localStorage.getItem('token'))
   getUserCart(localStorage.getItem('token'))
}

    },[])


    const value = {
        products, currency, delivery_fee, search, setSearch, showSearch,
        setShowSearch, cartItems, addToCart,setCartItems , getCartCount, updateQuantity, getCartAmount, 
        navigate, backendUrl,setToken,token
    }


    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;