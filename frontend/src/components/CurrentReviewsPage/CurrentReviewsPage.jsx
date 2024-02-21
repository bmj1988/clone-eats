import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { thunkUsersReviews, reviewsArray } from "../../redux/reviews";
import { thunkAllRestaurants } from "../../redux/restaurants";
import DeleteReviewModal from "./DeleteReviewModal";
import OpenModalButton from '../OpenModalButton'
import CurrentReviewBox from "./CurrentReviewsBox";
import UpdateReviewModal from "./UpdateReviewModal";
import Spinner from "../Spinner";
import './CurrentReviewsPage.css'

const CurrentReviewsPage = () => {
  const [objreviews, setObjreviews] = useState([])
  const dispatch = useDispatch();

  const reviews = useSelector(reviewsArray)

  useEffect(() => {
    dispatch(thunkUsersReviews())
  }, [dispatch])

  useEffect(() => {
    dispatch(thunkAllRestaurants())
  }, [dispatch])

  useEffect(() => {
    setObjreviews(reviews)
  }, [reviews])



  if (!reviews) {
    return <Spinner />
  }

  return (
    <>
      <div className="reviews">
        {objreviews.map((review) => {
          return (
            <>
              <div className="review-box">
                <CurrentReviewBox review={review} key={review.id} />
                <div className="review-buttons">
                  < OpenModalButton className="review-modal-button"
                    modalComponent={<DeleteReviewModal restaurant_id={review.restaurant_id} />}
                    buttonText="Delete" />
                  < OpenModalButton className="review-modal-button"
                    modalComponent={<UpdateReviewModal restaurant_id={review.restaurant_id} />}
                    buttonText="Update"
                  />
                </div>
              </div>
            </>
          )
        })}
      </div>
    </>
  )
}

export default CurrentReviewsPage
