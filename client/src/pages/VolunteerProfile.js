//Components on page:
//Profile picture
//About section
//Contact icons
//Event cards (previous volunteer experience)

import React from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_VOLUNTEER } from '../utils/queries';

function VolunteerProfile() {
  const { data } = useQuery(QUERY_VOLUNTEER);
  let volunteer;

  if (data) {
    volunteer = data.volunteer;
  }

  return (
    <>
      <div className="container my-1">
        <Link to="/">← Back to Products</Link>

        {volunteer ? (
          <>
            <h2>
              Order History for {volunteer.fullName}
            </h2>
            {volunteer.orders.map((order) => (
              <div key={order._id} className="my-2">
                <h3>
                  {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                </h3>
                <div className="flex-row">
                  {order.products.map(({ _id, image, name, price }, index) => (
                    <div key={index} className="card px-1 py-1">
                      <Link to={`/products/${_id}`}>
                        <img alt={name} src={`/images/${image}`} />
                        <p>{name}</p>
                      </Link>
                      <div>
                        <span>${price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </>
  );
}

export default VolunteerProfile;
