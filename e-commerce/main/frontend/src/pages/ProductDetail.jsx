import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { shopDataContext } from '../context/ShopContext';
import RelatedProduct from '../components/RelatedProduct';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { toast } from 'react-toastify'; // 🆕 Import toast
import 'react-toastify/dist/ReactToastify.css';

gsap.registerPlugin(ScrollTrigger);

function ProductDetail() {
  const { productId } = useParams();
  const { product, currency, addtoCart } = useContext(shopDataContext);
  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [size, setSize] = useState('');
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const found = product.find(item => item._id === productId);
    if (found) {
      setProductData(found);
      setSelectedImage(found.image1);
    }
  }, [productId, product]);

  useEffect(() => {
    if (!productData) return;
    const elements = document.querySelectorAll(".fade-in");
    if (elements.length > 0) {
      gsap.from(elements, {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: elements[0],
          start: "top 80%",
        },
      });
    }
  }, [productData]);

  const handleAddToCart = () => {
    if (!size) {
      toast.warning('Please select a size before adding to cart.');
      return;
    }
    addtoCart(productData._id, size);
    toast.success(`${productData.name} added to cart!`);
  };

  if (!productData) return <div className='text-white text-center pt-10'>Loading...</div>;

  return (
    <div>
      <div className='w-full min-h-screen bg-gradient-to-br from-[#0f172a] to-[#0c4a6e] flex flex-col lg:flex-row items-center justify-center gap-10 p-8 pt-[100px]'>
        <div className='flex flex-col items-center lg:items-start lg:w-[40%] fade-in'>
          <img src={selectedImage} alt={productData.name} className='image-zoom w-[300px] h-[350px] object-cover rounded-xl shadow-lg border-2 border-white/10' />
          <div className='flex gap-3 mt-6 flex-wrap justify-center'>
            {[productData.image1, productData.image2, productData.image3, productData.image4].map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`thumb-${i}`}
                className={`w-16 h-16 object-cover rounded-lg shadow-md cursor-pointer transition-all duration-300 ${
                  selectedImage === img ? 'ring-2 ring-cyan-400' : 'opacity-80 hover:opacity-100'
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        <div className='lg:w-[50%] text-white flex flex-col gap-6 fade-in'>
          <h2 className='text-4xl font-bold'>{productData.name}</h2>
          <p className='text-2xl font-semibold text-cyan-400'>{currency}{productData.price}</p>
          <p className='text-sm text-gray-300 leading-relaxed'>{productData.description}</p>

          <div>
            <label className='block mb-3 text-sm font-semibold text-gray-200'>Select Size:</label>
            <div className='flex gap-4 flex-wrap'>
              {productData.sizes?.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setSize(s)}
                  className={`px-5 py-2 rounded-full border text-sm font-medium shadow-sm transition-all duration-200 ${
                    size === s
                      ? 'bg-cyan-500 text-white border-cyan-500'
                      : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            {size && <p className='text-sm text-green-400 mt-2 font-medium'>Selected Size: {size}</p>}
          </div>

          <button
            className='mt-6 w-fit px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full text-sm font-semibold shadow-md transition cursor-pointer'
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div className='w-full bg-gradient-to-br from-[#0f172a] to-[#1e293b] px-6 lg:px-[80px] py-10 fade-in'>
        <div className='flex gap-6 border-b border-gray-700 mb-6'>
          <button
            onClick={() => setActiveTab("description")}
            className={`px-5 py-3 text-sm font-semibold ${
              activeTab === "description" ? "text-white border-b-2 border-cyan-400" : "text-gray-400 hover:text-white"
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab("review")}
            className={`px-5 py-3 text-sm font-semibold ${
              activeTab === "review" ? "text-white border-b-2 border-cyan-400" : "text-gray-400 hover:text-white"
            }`}
          >
            Review (124)
          </button>
        </div>

        <div className='bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 md:p-8 lg:p-10 text-white text-base md:text-lg shadow-xl'>
          {activeTab === "description" ? (
            <p className='leading-relaxed'>
              Discover effortless style with our premium product. Designed with comfort and durability in mind,
              this piece blends timeless fashion with modern quality. Whether you're heading out or staying in,
              this wardrobe essential keeps you looking sharp and feeling great.
            </p>
          ) : (
            <div className='space-y-6'>
              <div>
                <p className='font-semibold text-cyan-300'>⭐️⭐️⭐️⭐️⭐️ Excellent Product</p>
                <p className='text-sm text-gray-300'>
                  I bought this last month and it's already my favorite item. Great quality, fits perfectly, and looks amazing.
                </p>
              </div>
              <hr className="border-gray-600" />
              <div>
                <p className='font-semibold text-cyan-300'>⭐️⭐️⭐️⭐️ Great Fit</p>
                <p className='text-sm text-gray-300'>
                  Really happy with the material and fit. Would definitely buy again.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <div className="fade-in">
        <RelatedProduct
          category={productData.category}
          subCategory={productData.subCategory}
          currentProductId={productData._id}
        />
      </div>
    </div>
  );
}

export default ProductDetail;
