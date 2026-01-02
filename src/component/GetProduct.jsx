import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./footer";

function App() {
  const [products, setProducts] = useState([]); // Correct state

  async function fetchData() {
    try {
      let response = await fetch("https://dummyjson.com/products");
      response = await response.json();
      console.log(response);
      setProducts(response.products); // Store product list
    } catch (error) {
      console.error("API Fetch Error:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <NavBar />

      <div className="p-4">
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {products.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg shadow p-3 flex flex-col"
            >
              {/* Product Image */}
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-40 object-cover rounded"
              />

              {/* Product Title */}
              <h2 className="font-semibold text-lg mt-2">{item.title}</h2>

              {/* Product Description */}
              <p className="text-sm text-gray-600 mt-1">
                {item.description.slice(0, 80)}...
              </p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default App;
