import { useEffect } from "react";

type dataprops = {
  cart: Array<Record<string, string | number>>;
  incr: (key: number) => void;
  decr: (key: number) => void;
  del: (key: number) => void;

  // rows:Array <Array<string|React.ReactNode>>
};
interface MapObject {
  [name: string]: string | number | boolean | React.ReactNode;
}

function Cartitem(props: dataprops) {
  useEffect(() => {
    console.log(props.cart, "kl");
  }, [props.cart]);
  // console.log(props.incr)

  return (
    <>
      <h1>Product cart</h1>
      <div className="cartproduct">
        <table>
          <thead>
            <tr>
              <th>Serial No.</th>
              <th>Product name</th>
              <th>Product Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {props.cart.map((index: MapObject, key) => {
              return (
                <tr>
                  <td>{key + 1}</td>
                  <td>{index.title}</td>
                  <td>{index.price}</td>
                  <td>
                    {index.quantity}
                    <br />
                    <button onClick={() => props.incr(key)}>+</button>
                    <button onClick={() => props.decr(key)}>-</button>
                  </td>
                  <td>
                    <button onClick={() => props.del(key)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default Cartitem;
