import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Image } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { IoMdCamera } from "react-icons/io";
import profileImagePlaceholder from '../assets/common/profile-placeholder.jpg';
import '../styles/Profile.css';
import api from '../api/axiosInstance';
import { toast } from 'react-toastify';

type UserDataType = {
  username: string;
  email: string;
  dob: string;
  profileImage: File | null;
  profilePreviewImageUrl: string;
}

const Profile: React.FC = () => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const [userData, setUserData] = useState<UserDataType>({
    username: '',
    email: '',
    dob: '',
    profileImage: null,  // maintaining this variable to send file to backend
    profilePreviewImageUrl: "" // to store the image url
  });

  // Populate data from auth user
  useEffect(() => {
    if (!user) return;

    setUserData({
      username: user.username,
      email: user?.email,
      dob: user?.dob || "",
      profileImage: null,
      profilePreviewImageUrl: user?.profileImageUrl || ""
    });
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    setUserData(prev => ({
      ...prev,
      profileImage: file,
      profilePreviewImageUrl: previewUrl
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userData.username || !userData.dob) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('username', userData.username);
      formData.append('dob', userData.dob);

      if (userData.profileImage) {
        formData.append('profileImage', userData.profileImage);
      }

      const response = await api.post('/user/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });


      setUser(prev => ({
        ...prev,
        username: userData.username,
        dob: userData.dob,
        profileImageUrl: response?.data.profileUrl
      }));

      toast.success('Profile updated successfully.');
    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
    }
    finally {
      setLoading(false);
    }
  };

  const handleImageError = () => {
          setUser(prev => ({
        ...prev,
        profileImageUrl: profileImagePlaceholder
      }));
  }


  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Container className="py-5">
      <div className="profile-card">
        <h1 className="mb-3">Profile</h1>

        <Form onSubmit={handleSave} className="profile-form d-flex gap-4">
          <div className="profile-picture-section text-center">
            <Image
              src={userData?.profilePreviewImageUrl || profileImagePlaceholder}
              roundedCircle
              width={140}
              height={140}
              alt="Avatar"
              loading='lazy'
              onError={handleImageError}
              className="profile-avatar mb-2"
            />

            <Form.Group controlId="avatar" className="d-flex justify-content-center">
              <Form.Label className="camera-label mb-0">
                <IoMdCamera />
              </Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input d-none"
              />
            </Form.Group>
          </div>

          <div className="flex-grow-1">
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                value={userData.username}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control value={userData.email} disabled className='bg-secondary-subtle' />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                value={userData.dob}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button type="submit" className="primary-btn">
                Save
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default Profile;
