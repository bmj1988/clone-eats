import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkNewRestaurant } from "../../redux/restaurants"
import { categoriesArray, thunkCategories } from "../../redux/categories";
import { useNavigate } from "react-router-dom";
import Select from "react-select"
import './NewRestaurantPage.css'

const NewRestaurantPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const categories = useSelector(categoriesArray)

  const [errors, setErrors] = useState({}) //need to figure this out

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [image, setImage] = useState('')
  const [delivery, setDelivery] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState(null)

  useEffect(() => {
    dispatch(thunkCategories())
  }, [dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const restaurantDetails = {
      name,
      address,
      city,
      state,
      image,
      lat: 90,
      lng: 90,
      delivery,
      category_id: selectedCategory.value
    }
    
    dispatch(thunkNewRestaurant(restaurantDetails))
    navigate(`/store/${name}`)
  }

  const customStyling = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px solid #ddd",
      padding: 10,
      display: "flex",
      alignItems: "center",
      alignSelf: "center",
      fontFamily: 'Rubik, sans-serif'
    }),
    singleValue : (provided, state) => ({
      ...provided,
      color: "#333",
      fontFamily: 'Rubik, sans-serif',
    })
  }

  const options = categories.map((category) => ({
    value: category.id,
    label: (
      <div style={{ display: "flex", alignItems: "center" }} className="categories-map">
        <img src={category.image} alt={category.id} style={{ marginRight: 10, width: 30, height: 30}}/>
        {category.name}
      </div>
    )
  }))

  return (
    <>
      <h2 className="new-restaurant-h2">Create New Restaurant</h2>
      <form className="new-restaurant-form" onSubmit={handleSubmit}>
        <div>
          <label className="new-restaurant-label">Name</label>
          <input className="new-restaurant-input" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required/>
          {errors && errors.name && <div className="error">{errors.name}</div>}
        </div>

        <div>
          <label className="new-restaurant-label">Address</label>
          <input className="new-restaurant-input" type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" required/>
          {errors && errors.address && <div className="error">{errors.address}</div>}
        </div>

        <div>
          <label className="new-restaurant-label">City</label>
          <input className="new-restaurant-input" type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" required/>
          {errors && errors.city && <div className="error">{errors.city}</div>}
        </div>

        <div>
          <label className="new-restaurant-label">State</label>
          <input className="new-restaurant-input" type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="State" required/>
          {errors && errors.state && <div className="error">{errors.state}</div>}
        </div>

        <div>
          <label className="new-restaurant-label">Image</label>
          <input className="new-restaurant-input" type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image" required/>
          {errors && errors.image && <div className="error">{errors.image}</div>}
        </div>

        <div>
          <label className="new-restaurant-label">Delivery</label>
          <div>
            <label> <input type="radio" value="true" checked={delivery === true} onChange={() => setDelivery(true)}/> Yes </label>
            <label> <input type="radio" value="false" checked={delivery === false} onChange={() => setDelivery(false)}/> No </label>
          </div>
        </div>

        <div>
          <label className="new-restaurant-label">Category</label>
          <Select 
          options={options}
          value={selectedCategory}
          onChange={setSelectedCategory}
          styles={customStyling}
          placeholder="Select a category"
          />
        </div>

        <button className="new-restaurant-submit" type="submit">Create Restaurant</button>
      </form>
    </>
  )
}

export default NewRestaurantPage;