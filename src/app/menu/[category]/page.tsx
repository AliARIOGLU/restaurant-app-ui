import { pizzas } from "@/data";
import Image from "next/image";
import Link from "next/link";

const CategoryPage = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 text-red-500">
      {pizzas.map((pizza) => (
        <Link
          className="w-full h-[60vh] border-r-2 border-b-2 border-red-500 p-4 flex flex-col justify-between group even:bg-fuchsia-50"
          href={`/product/${pizza.id}`}
          key={pizza.id}
        >
          {/* IMAGE CONTAINER */}
          {pizza.img && (
            <div className="relative h-[80%]">
              <Image
                className="object-contain"
                src={pizza.img}
                alt="PizzaPhoto"
                fill
              />
            </div>
          )}
          {/* TEXT CONTAINER */}
          <div className="flex justify-between items-center font-bold">
            <h1 className="text-xl uppercase p-2">{pizza.title}</h1>
            <h2 className="group-hover:hidden text-xl">${pizza.price}</h2>
            <button className="hidden group-hover:block uppercase bg-red-500 text-white p-2 rounded-md">
              Add to Cart
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryPage;
