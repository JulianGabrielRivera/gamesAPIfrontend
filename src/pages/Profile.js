import { useState, useEffect, useContext } from "react";
import { LoadingContext } from "../context/loading.context";
import axios from "axios";
import { baseUrl } from "../services/baseUrl";

const Profile = () => {
  const { user, setUser, editing, setEditing } = useContext(LoadingContext);

  const [profile, setProfile] = useState({
    profile_image: "",
    bio: "",
    age: "",
  });

  useEffect(() => {
    // Fetch the user's profile data
    if (user) {
      axios
        .get(`${baseUrl}/users/profile/${user._id}`)
        .then((results) => {
          console.log(results.data, "my profile");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  const handleEdit = (e) => {
    e.preventDefault();
    setEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Save the profile data
    axios
      .post(`${baseUrl}/users/profile-edit/${user._id}`, profile)
      .then((res) => {
        setUser(res.data);
        // setUser((prevUser) => ({
        //   ...prevUser,
        //   profile: res.data.profile,
        // }));
        setEditing(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setEditing(false);
  };

  const handleInputChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div>
        {editing ? (
          <form onSubmit={handleSave}>
            <div>
              <label>Profile Image</label>
              <input
                type="text"
                name="profile_image"
                value={profile.profile_image || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Bio</label>
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div>
              <label>Age</label>
              <input
                type="text"
                name="age"
                value={profile.age}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit">Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </form>
        ) : (
          <div>
            <div>
              <img
                src={user ? user.profile_image : <p>no image</p>}
                alt="Profile"
                style={{ width: "150px" }}
              />
            </div>
            <div>
              <h2>Bio</h2>
              {user ? user.bio : <p>no bio</p>}
            </div>
            <div>
              <h2>Age</h2>
              {user ? user.age : <p>no age</p>}
            </div>
            <button onClick={handleEdit}>Edit Profile</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
