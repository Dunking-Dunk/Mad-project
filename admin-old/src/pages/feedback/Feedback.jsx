import "./feedback.scss";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllFeedback, deleteFeedback } from "../../store/actions/action";

const Feedback = () => {
  const dispatch = useDispatch();
  const feedbacks = useSelector((state) => state.feedbacks.feedbacks);

  useEffect(() => {
    dispatch(getAllFeedback());
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteFeedback(id));
  };

  return (
    <div className="feedback__container">
      <h1 className="feedback__title">Feedbacks</h1>
      {feedbacks &&
        feedbacks.map((feedback) => {
          return (
            <div className="feedback__card" key={feedback.id}>
              <div>
                <h3>{feedback.feedback}</h3>
                <a href={feedback.link}>link</a>
              </div>
              <button
                className="deleteButton"
                onClick={() => handleDelete(feedback.id)}
              >
                Delete
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default Feedback;
