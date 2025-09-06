import React, { useState } from 'react';

const ResponsiveSizeSelector = () => {
  const [sizes, setSizes] = useState([]);

  const sizeOptions = [
    'S', 'M', 'L', 'XL', 'XXL', 'Free Size',
    '28', '30', '32', '34', '36', '38',
    '0-3 Months', '3-6 Months', '6-9 Months', '9-12 Months',
  ];

  return (
    <div>
      <h2 className="font-medium text-lg mb-4">Select Size</h2>
      <div className="flex flex-wrap gap-4">
        {sizeOptions.map((size) => (
          <div
            key={size}
            onClick={() =>
              setSizes((prev) =>
                prev.includes(size)
                  ? prev.filter((item) => item !== size)
                  : [...prev, size]
              )
            }
            className={`cursor-pointer border px-4 py-2 rounded text-sm md:text-base 
              ${sizes.includes(size) ? 'bg-pink-100 border-pink-400' : 'bg-slate-200 border-gray-400'}`}
          >
            {size}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResponsiveSizeSelector;
