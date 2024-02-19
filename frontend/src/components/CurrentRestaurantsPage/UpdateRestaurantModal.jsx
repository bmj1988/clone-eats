import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from '../../context/Modal'
import { thunkUpdateRestaurant, restaurantByName } from "../../redux/restaurants";
import { categoriesArray } from "../../redux/categories";
import Select from "react-select";
import './UpdateRestaurantsModal.css'

const UpdateRestaurantModal = ({restaurantName}) => {
  const dispatch = useDispatch()
  const { closeModal } = useModal()

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [image, setImage] = useState('')
  const [delivery, setDelivery] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const categories = useSelector(categoriesArray)
  const restaurant = useSelector((state) => restaurantByName(state, restaurantName))

  useEffect(() => {
    if (restaurant) {
      setName(restaurant.name)
      setAddress(restaurant.address)
      setCity(restaurant.city)
      setState(restaurant.state)
      setImage(restaurant.image)
      setDelivery(restaurant.delivery)

      const category = categories.find(category => category.id === restaurant.categoryId);
      if (category) {
        setSelectedCategory({ value: restaurant.categoryId, label: (
          <div style={{ display: "flex", alignItems: "center" }} className="categories-map">
            <img src={category.image} alt={category.id} style={{ marginRight: 10, width: 30, height: 30}}/>
            {category.name}
          </div>
        ) });
      }
    }
  }, [restaurant, categories])

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const restaurantDetails = {
      id: restaurant.id,
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

    dispatch(thunkUpdateRestaurant(restaurantDetails))
    closeModal()
  }

  return (
    <>
    <div className="update-restaurant-modal">
      <h2 className="update-res-h2">Update {name}</h2>
      <form className="update-restaurant-form" onSubmit={handleSubmit}>
        <div>
          <label className="update-restaurant-label">Name</label>
          <input className="update-restaurant-input" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required/>
        </div>

        <div>
          <label className="update-restaurant-label">Address</label>
          <input className="update-restaurant-input" type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" required/>
        </div>

        <div>
          <label className="update-restaurant-label">City</label>
          <input className="update-restaurant-input" type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" required/>
        </div>

        <div>
          <label className="update-restaurant-label">State</label>
          <input className="update-restaurant-input" type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="State" required/>
        </div>

        <div>
          <label className="update-restaurant-label">Image</label>
          <input className="update-restaurant-input" type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image" required/>
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

        <button className="update-restaurant-button" type="submit">Submit Changes</button>
        <button className="update-restaurant-cancel" onClick={closeModal}>Cancel</button>
      </form>
    </div>
    </>
  )
}

export default UpdateRestaurantModal;