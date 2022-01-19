import { useEffect, useState } from "react";
import Cartitem from "./cart";

interface MapObject {
  [type: string]: string | number | boolean | React.ReactNode;
}
interface MapObjectb {
  [type: number]: number | boolean | React.ReactNode;
}
interface MapObjecta {
  [index: string]: string | undefined;
}

function Displayproduct() {
  const [data, setData] = useState([] as MapObjecta[]);
  const [cartitem, setCartitem] = useState<Record<string, any>[]>([]);
  const [id, setId] = useState<Array<number | React.ReactNode>>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=6", {})
      .then((res) => res.json())
      .then((json) => {
        setData(json);
      });
    let app: string | null;
    app = localStorage.getItem("cart") as string;
    setCartitem(JSON.parse(app) ? JSON.parse(app) : []);
    cartTotal(JSON.parse(app) ? JSON.parse(app) : []);
  }, []);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartitem));
  }, [total, cartitem]);

  function handleclick(index: MapObject, key: number) {
    // console.log(key)
    // console.log(index)
    if (!id.includes(key)) {
      id.push(key);
      const t = [...cartitem];
      t.push({ ...index, quantity: 1, id: key });
      // console.log(t)
      setCartitem(t);
      cartTotal(t);
    } else {
      // console.log(index, "f", key);
      // console.log(cartitem);
      const cartObj = [...cartitem];
      cartObj.map((i, k) => {
        return key == i.id ? (i.quantity += 1) : null;
      });
      // cartObj[key].quantity += 1;
      setCartitem(cartObj);
      cartTotal(cartObj);
    }
  }
  function increment(key: number) {
    const cartObj = [...cartitem];
    cartObj[key].quantity += 1;
    setCartitem(cartObj);
    cartTotal(cartitem);
  }
  function decrement(key: number) {
    const cartObj = [...cartitem];
    if (cartObj[key].quantity > 1) {
      cartObj[key].quantity -= 1;
      setCartitem(cartObj);
      cartTotal(cartitem);
    } else {
      alert("quantity 1 is minimum");
    }
  }
  function deleteitem(key: number) {
    console.log(key);
    let arr = cartitem.filter((id, keys) => {
      return keys !== key;
    });
    let arr1 = id.filter((id, keys) => {
      return keys !== key;
    });
    setCartitem(arr);
    setId(arr1);
    cartTotal(arr);
  }
  function cartTotal(cartitem: Array<Record<string, string | number>>) {
    let totalsum = cartitem.reduce(
      (total: number, item: any) => total + item.quantity * item.price,
      0
    );
    setTotal(totalsum);
    console.log(cartitem);
    console.log(totalsum);
  }

  // console.log(cartitem)
  return (
    <>
      <h1>Product List</h1>
      <div className="product">
        {data.map((index: MapObjecta, key: number) => {
          return (
            <div key={key} className="cardbody">
              <h3>{index.category}</h3>
              <div>
                <img src={index.image} alt="" />
              </div>
              <h4>{index.price}</h4>

              <span>{index.title}</span>
              <br />
              <br />
              <button key={key} onClick={() => handleclick(index, key)}>
                Add To Cart
              </button>
            </div>
          );
        })}
      </div>
      <Cartitem
        cart={cartitem}
        incr={increment}
        decr={decrement}
        del={deleteitem}
      />
      <h1>{total}</h1>
    </>
  );
}
export default Displayproduct;
