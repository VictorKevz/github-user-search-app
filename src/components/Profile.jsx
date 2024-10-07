import React, { useEffect, useState } from "react";
import "../css/profile.css";

function Profile({ data}) {

  return (
    <section className="profile-wrapper">
      <div className="profile-header">
        <figure className="profile-img-wrapper">
          <img
            src={data?.avatar_url}
            alt={`Proile picture of ${data?.name}`}
            className="profile-img"
          />
        </figure>
        <div className="tabs-wrapper">
          <div className="followers-wrapper tab">
            <p className="category">Followers</p>
            <div className="divider"></div>
            <p className="value">{data?.followers}</p>
          </div>
          <div className="followers-wrapper tab">
            <p className="category">Following</p>
            <div className="divider"></div>
            <p className="value">{data?.following}</p>
          </div>
          <div className="followers-wrapper tab">
            <p className="category">Location</p>
            <div className="divider"></div>
            <p className="value">{data?.location}</p>
          </div>
        </div>
      </div>
      <article className="intro">
        <h1 className="name">{data?.name}</h1>
        <p className="bio">{data?.bio}</p>
      </article>
     

    </section>
  );
}

export default Profile;
