import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Layout from '../components/Layout';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [name, setName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [error, setError] = useState(null);

  const fetchDoctors = async () => {
    try {
      const response = await api.get('doctors/');
      setDoctors(response.data);
    } catch (err) {
      setError('Failed to fetch doctors');
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleAddDoctor = async e => {
    e.preventDefault();
    try {
      await api.post('doctors/', { name, specialization });
      setName(''); setSpecialization('');
      fetchDoctors();
    } catch (err) {
      setError('Failed to add doctor');
    }
  };

  return (
    <Layout>
      <h2>Doctors</h2>
      <form onSubmit={handleAddDoctor}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input placeholder="Specialization" value={specialization} onChange={e => setSpecialization(e.target.value)} required />
        <button type="submit">Add Doctor</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
      <ul>
        {doctors.map(doctor => (
          <li key={doctor.id}>{doctor.name} - {doctor.specialization}</li>
        ))}
      </ul>
    </Layout>
  );
};

export default Doctors;
