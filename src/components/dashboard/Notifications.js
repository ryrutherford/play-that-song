import React from 'react';
import moment from 'moment';

const Notifications = (props) => {
  const {notifications} = props;
  return (
    <div className="section">
      <h3 className="green-text">Notifications</h3>
      <div className="card">
        <div className="card-content">
          
          <ul>
            {notifications && notifications.map((item) => {
              return (
                <li key={item.id}>
                  <span className="green-text notifications">
                    <b>{item.title + " • " + item.artists.replace(",", ", ")}</b>
                    {" was requested " + moment(item.time.toDate()).fromNow()}
                  </span>
                  <hr/>
                </li>
              );
            })}
          </ul>
          <span className="black-text notifications"><i>{notifications !== [] ? null : "No new notifications"}</i></span>
        </div>
      </div>
    </div>
  );
}

export default Notifications