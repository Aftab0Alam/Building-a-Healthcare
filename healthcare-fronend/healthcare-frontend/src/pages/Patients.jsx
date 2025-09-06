import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Layout from '../components/Layout';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);

  const fetchPatients = async () => {
    try {
      const response = await api.get('patients/');
      setPatients(response.data);
    } catch (err) {
      setError('Failed to fetch patients');
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleAddPatient = async e => {
    e.preventDefault();
    try {
      await api.post('patients/', { name, age: Number(age), address });
      setName(''); setAge(''); setAddress('');
      fetchPatients();
    } catch (err) {
      setError('Failed to add patient');
    }
  };

  return (
    <Layout>
      <h2>Patients</h2>
      <form onSubmit={handleAddPatient}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input placeholder="Age" value={age} onChange={e => setAge(e.target.value)} required type="number" />
        <input placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} required />
        <button type="submit">Add Patient</button>
      </form>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <ul>
        {patients.map(patient => (
          <li key={patient.id}>{patient.name} - Age: {patient.age} - {patient.address}</li>
        ))}
      </ul>
    </Layout>
  );
};

export default Patients;
