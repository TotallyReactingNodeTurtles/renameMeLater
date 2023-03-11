import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_VOLUNTEER } from '../utils/mutations';

function VolunteerSignup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addVolunteer] = useMutation(ADD_VOLUNTEER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addVolunteer({
      variables: {
        email: formState.email,
        password: formState.password,
        username: formState.name,
      },
    });
    const token = mutationResponse.data.addVolunteer.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container my-1">
      <Link to="/login">← Go to Login</Link>

      <h2>Signup</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="name">Name:</label>
          <input
            placeholder="Name"
            name="name"
            type="name"
            id="name"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
        <p>OR</p>
        <div className="flex-row flex-end">
          <button type="submit">Sign Up with Google</button>
        </div>
      </form>
    </div>
  );
}

export default VolunteerSignup;
