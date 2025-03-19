import React, { useContext, useEffect, useState } from 'react';
import './ProfileUpdate.css';
import assets from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../../context/AppContext';
import { upload } from '../../lib/Upload';

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [uid, setUid] = useState('');
  const [prevImage, setPrevImage] = useState('');
  const { setUserData } = useContext(AppContext);

  useEffect(() => {
    // Load saved image from localStorage
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setPrevImage(savedImage);
    }
  }, []);

  const profileUpdate = async (e) => {
    e.preventDefault();
    try {
      if (!image && !prevImage) {
        toast.error('Upload your profile photo');
        return;
      }

      let imgUrl = prevImage; // Default to previous image
      if (image) {
        imgUrl = await upload(image); // Convert and save new image
        setPrevImage(imgUrl);
      }

      // Simulating profile update (in real case, you'd update a database)
      const updatedUser = { avatar: imgUrl, bio, name };
      setUserData(updatedUser);
      toast.success("Profile updated successfully!");

      navigate('/chat');
    } catch (err) {
      console.error(err);
      toast.error("Error updating profile");
    }
  };

  return (
    <div className='profile'>
      <div className="profile-container">
        <form onSubmit={profileUpdate}>
          <h3>Profile Details</h3>
          <label htmlFor="avatar">
            <input 
              type="file" 
              id='avatar' 
              accept='.png, .jpeg, .jpg' 
              hidden 
              onChange={(e) => setImage(e.target.files[0])} 
            />
            <img src={image ? URL.createObjectURL(image) : prevImage || assets.avatar_icon} alt="Profile" />
            Upload Profile Image
          </label>
          <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Your name' required />
          <textarea onChange={(e) => setBio(e.target.value)} value={bio} placeholder='Write profile bio' required></textarea>
          <button type='submit'>Save</button>
        </form>
        <img className='profile-pic' src={prevImage || prevImage ? prevImage : assets.logo_icon} alt="Profile Pic" />
      </div>
    </div>
  );
};

export default ProfileUpdate;
