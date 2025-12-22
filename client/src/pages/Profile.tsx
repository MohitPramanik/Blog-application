import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Image, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { IoMdCamera } from "react-icons/io";
import profileImgagePlaceholder from '../assets/common/profile-placeholder.jpg';
import '../styles/Profile.css';

const Profile: React.FC = () => {

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    dob: '',
    profileImageUrl: profileImgagePlaceholder
  })

  const { user } = useAuth();

  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if(user) {
      setUserData({
        username: user?.username,
        email: user?.email,
        dob: user?.dob || "",
        profileImageUrl: user?.profileImageUrl || profileImgagePlaceholder
      })
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prevData => ({ ...prevData, [name]: value }));
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData(prevData => ({ ...prevData, profileImageUrl: reader.result as string }));
      }
      reader.readAsDataURL(file);
    }
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!userData.username || !userData.email || !userData.dob) {
        setMessage('Please fill in all required fields.');
        return;
      }
      setMessage('Profile updated successfully.');
    }
    catch (error) {
      setMessage('Failed to update profile. Please try again.');
    }
  }

  return (
    <Container className="py-5">
      <div className="profile-card">
        <h1 className="mb-3">Profile</h1>
        {message && <Alert variant="info">{message}</Alert>}
        <Form onSubmit={handleSave} className="profile-form d-flex gap-4">
          <div className="profile-picture-section text-center">
            <Image src={userData.profileImageUrl} roundedCircle width={140} height={140} alt="Avatar" className="profile-avatar mb-2" />
            <Form.Group controlId="avatar" className="d-flex justify-content-center">
              <Form.Label className='camera-label mb-0'><IoMdCamera /></Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleFileChange} className="file-input d-none" />
            </Form.Group>
          </div>

          <div className="flex-grow-1">
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control name="username" value={userData.username} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control name="email" value={userData.email} disabled />
            </Form.Group>

            <Form.Group className="mb-3" controlId="dob">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control type='date' name="dob" value={userData.dob} onChange={handleChange} />
            </Form.Group>

            <div className="d-flex gap-2 justify-content-end">
              <Button type="submit" className="btn-primary">Save</Button>
            </div>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default Profile;
