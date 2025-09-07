import React, { useState } from 'react'
import { assets } from '../assets/admin_assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import ResponsiveSizeSelector from '../components/ResponsiveSizeSelector'

const Add = ({ token }) => {

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState("softtoys");
  const [subCategory, setSubCategory] = useState('Ganpati');
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [adding, setAdding] = useState(false)


  const onSubmitHandler = async (e) => {

    e.preventDefault();
    setAdding(true);
    try {


      const formData = new FormData()

      formData.append('name', name)
      formData.append('description', description)
      formData.append('price', price)
      formData.append('category', category)
      formData.append('subCategory', subCategory)
      formData.append('bestseller', bestseller)
      formData.append('sizes', JSON.stringify(sizes))

      image1 && formData.append('image1', image1)
      image2 && formData.append('image2', image2)
      image3 && formData.append('image3', image3)
      image4 && formData.append('image4', image4)

      const requrl = backendUrl + "/api/product/add"
      const response = await axios.post(requrl, formData,
        {
          headers: { token }
        }
      )

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
        setSizes([])

      } else {
        toast.error(response.data.message)
      }

      setAdding(false);

    } catch (error) {
      console.log("add product :", error);
      toast.error(error.message)
    }



  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div >
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img className='w-20 ' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" name="" id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <img className='w-20 ' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" name="" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <img className='w-20 ' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" name="" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img className='w-20 ' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" name="" id="image4" hidden />
          </label>
        </div>
      </div>

      <div className='w-full'>
        <p className='my-2'>Product Name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className="w-full max-w-[500px] px-3 py-2" type="text" placeholder='Type Here' required />
      </div>

      <div className='w-full'>
        <p className='my-2'>Product Description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className="w-full max-w-[500px] px-3 py-2" type="text" placeholder='Type Here' required />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 sm:gap-8 sm:w-full'>

        <div>
          <p className='mb-2'>Product Category</p>
          <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2 mb-2' name="" id="">
            <option value="softtoys">Soft toys</option>
            <option value="hardtoys">Hard toys</option>
            <option value="Kidstoys">Kids toys</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Product subCategory</p>
          <select onChange={(e) => setSubCategory(e.target.value)} className='w-full px-3 py-2' name="" id="">
            <option value="Ganpati">Ganpati</option>
            <option value="Hanuman">Hanuman</option>
            <option value="Krishna">Krishna</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Product Price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full sm:w-[120px] px-3 py-1.5' type="number" name="" placeholder='25' id="" />
        </div>

      </div>

      <div className='w-[70%] sm:w-full'>
        <p className='mb-2'>Product Sizes</p>
        <ResponsiveSizeSelector />
      </div>

      <div className='my-3 flex gap-2'>
        <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" name="" id="bestseller" />
        <label className='cursor-pointer' htmlFor="bestseller">Add to Bestseller</label>
      </div>

      <button className='w-28 bg-black text-white px-2 py-2' type="submit">{adding ? "Adding..." : "Add"} </button>

    </form>
  )
}

export default Add