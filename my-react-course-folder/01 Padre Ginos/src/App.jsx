import { createRoot } from "react-dom/client";
import Pizza from "./Pizza";

const App = () => {
  return (
    <div>
      <h1>Padre Gino's - Order Now</h1>
      <Pizza
        name="Americano"
        description="Mozzarella Cheese, French Fries"
        image={"/public/pizzas/big_meat.webp"}
      />
      <Pizza
        name="The Hawaiian Pizza"
        description="Pineapple, Mozzarella Cheese"
        image={"/public/pizzas/hawaiian.webp"}
      />
      <Pizza
        name="Pepperoni"
        description="Mozzarella Cheese, Vegetables"
        image={"/public/pizzas/pepperoni.webp"}
      />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
