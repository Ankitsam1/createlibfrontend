import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Auth.css';

const UserProfile = () => {
    const [user, setUser] = useState({});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (userInfo) {
                const { data } = await axios.get('/api/users/profile', {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                });
                setUser(data);
                setName(data.name);
                setEmail(data.email);
            }
        };

        fetchUserProfile();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        try {
            const { data } = await axios.put(
                '/api/users/profile',
                { name, email },
                {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                }
            );
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className="auth">
            <form onSubmit={handleSubmit}>
                <h2>Profile</h2>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn">Update Profile</button>
            </form>
        </div>
    );
};

export default UserProfile;
