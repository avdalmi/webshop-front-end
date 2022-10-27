import React from "react";
import './styles.css';

function Reviews(props) {
    const { reviews } = props;
    return (
        <div className="reviewsContainer">
            { reviews.reviews.map((review, index) => (

                < div className="propReview" key={ review.id } >
                    <h3 className="revRating">{ review.stars }</h3>
                    <p className="revMsg">{ review.message }</p>
                </div>
            )) }



        </div >
    );
}
export { Reviews };

