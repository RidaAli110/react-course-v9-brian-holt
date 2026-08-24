import { useEffect, useState } from "react";
import Pizza from "./Pizza";

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Order() {
  //  This empty array state will hold the data from the fetched API
  const [PizzaTypes, SetPizzaTypes] = useState([]);

  // These are the default sates
  const [PizzaType, SetPizzaType] = useState("");
  const [PizzaSize, SetPizzaSize] = useState("M");
  const [loading, SetLoading] = useState(true);

  let price, selectedPizza;

  if (!loading) {
    selectedPizza = PizzaTypes.find((pizza) => pizza.id === PizzaType);
    price = intl.format(selectedPizza.sizes[PizzaSize]);
  }

  // Fetching from the pizza API
  async function fetchPizzaTypes() {
    const res = await fetch("/api/pizzas");
    const data = await res.json();
    // This sets the empty array state to the fetched data
    SetPizzaTypes(data);

    SetLoading(false);
    SetPizzaType(data[0].id);
  }

  useEffect(() => {
    fetchPizzaTypes();
  }, []);

  return (
    <div className="order">
      <h2>Create Order</h2>
      <form action="">
        <div>
          <div>
            <label htmlFor="pizza-type" value={PizzaType}>
              Pizza Type
            </label>
            <select
              onChange={(e) => SetPizzaType(e.target.value)}
              name="pizza-type"
              value={PizzaType}
            >
              {PizzaTypes.map((pizza) => (
                <option key={pizza.id} value={pizza.id}>
                  {pizza.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="pizza-size">Pizza Size</label>
            <div>
              <span>
                <input
                  type="radio"
                  checked={PizzaSize === "S"}
                  name="pizza-size"
                  value="S"
                  id="pizza-s"
                  onChange={(e) => SetPizzaSize(e.target.value)}
                />
                <label htmlFor="pizza-s">Small</label>
              </span>
              <span>
                <input
                  checked={PizzaSize === "M"}
                  type="radio"
                  name="pizza-size"
                  value="M"
                  id="pizza-m"
                  onChange={(e) => SetPizzaSize(e.target.value)}
                />
                <label htmlFor="pizza-m">Medium</label>
              </span>
              <span>
                <input
                  checked={PizzaSize === "L"}
                  type="radio"
                  name="pizza-size"
                  value="L"
                  id="pizza-l"
                  onChange={(e) => SetPizzaSize(e.target.value)}
                />
                <label htmlFor="pizza-l">Large</label>
              </span>
            </div>
          </div>
          <button type="submit">Add to Cart</button>
          <p>{price}</p>
        </div>
      </form>
      <div className="order-pizza">
        {loading ? (
          <h1>Loading</h1>
        ) : (
          <Pizza
            name={selectedPizza.name}
            description={selectedPizza.description}
            image={selectedPizza.image}
          />
        )}
      </div>
    </div>
  );
}
