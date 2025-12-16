import React, { useState } from 'react';
import { Container, Form, Button, Image, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import '../styles/Profile.css';

const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [username, setUsername] = useState(user?.username || '');
  const [email] = useState(user?.email || '');
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(user?.avatar);
  const [, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(f);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const update: any = { username };
      if (avatarPreview) update.avatar = avatarPreview;
      await updateProfile(update);
      setMessage('Profile updated successfully');
      setTimeout(() => setMessage(null), 2500);
    } catch (err) {
      setMessage('Failed to update profile');
    }
  };

  return (
    <Container className="py-5">
      <h1 className="mb-3">Profile</h1>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleSave} className="profile-form d-flex gap-4">
        <div>
          <Image src={avatarPreview} roundedCircle width={120} height={120} alt="Avatar" />
          <Form.Group controlId="avatar" className="mt-3">
            <Form.Label>Update Profile Photo</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
          </Form.Group>
        </div>

        <div className="flex-grow-1">
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control value={email} disabled />
          </Form.Group>

          <div className="d-flex gap-2">
            <Button type="submit">Save</Button>
          </div>
        </div>
      </Form>
    </Container>
  );
};

export default Profile;
