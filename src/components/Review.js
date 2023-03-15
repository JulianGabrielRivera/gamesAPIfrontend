import React, { useState } from 'react';
import axios from 'axios';

function AddReview({ userId }) {
  const [comment, setComment] = useState('');
  const [rate, setRate] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send a POST request to the server to add the new review
    axios.post('/reviews', { user: userId, comment, rate })
      .then(response => {
        // Reset the form fields
        setComment('');
        setRate('');
      })
      .catch(error => {
        console.error('Error adding review:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Comment:
        <textarea value={comment} onChange={event => setComment(event.target.value)} />
      </label>
      <label>
        Rate:
        <input type="number" value={rate} onChange={event => setRate(event.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddReview;