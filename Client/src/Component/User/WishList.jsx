import React from 'react'

function WishList() {
  return (
    <div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pl-4">
        {products.slice(0, visibleCount).map((product) => (
          <div className="relative group" key={product._id}>
            <div className="overflow-hidden">
              <img
                src={product.images[0].url} // Replace with actual product image path
                alt={product.name}
                className="w-[260px] h-[335px] object-cover transform transition-transform duration-300 group-hover:scale-110"
              />
              <button
                onClick={() => handleQuickView(product._id)}
                className="absolute inset-0 mx-24 mt-72 bg-white text-gray-800 border h-10 rounded-3xl w-24 border-gray-300 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 hover:bg-black hover:text-white"
              >
                Quick View
              </button>
            </div>
            <div className="flex justify-between items-center mt-2">
              <h2 className="font-semibold">{product.name}</h2>
              <button className="text-gray-500 hover:text-red-500">
                <FaHeart />
              </button>
            </div>
            <p className="text-gray-500">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>   
    </div>
  )
}

export default WishList;
