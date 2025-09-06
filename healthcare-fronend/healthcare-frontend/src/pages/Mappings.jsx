import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Layout from '../components/Layout';

const Mappings = () => {
  const [mappings, setMappings] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [error, setError] = useState(null);

  const fetchMappings = async () => {
    try {
      const res = await api.get('mappings/');
      setMappings(res.data);
    } catch {
      setError('Failed to fetch mappings');
    }
  };

  const fetchPatients = async () => {
    try {
      const res = await api.get('patients/');
      setPatients(res.data);
    } catch {
      setError('Failed to fetch patients');
    }
  };

  const fetchDoctors = async () => {
    try {
      const res = await api.get('doctors/');
      setDoctors(res.data);
    } catch {
      setError('Failed to fetch doctors');
    }
  };

  useEffect(() => {
    fetchMappings();
    fetchPatients();
    fetchDoctors();
  }, []);

  const handleAddMapping = async e => {
    e.preventDefault();
    try {
      await api.post('mappings/', {
        patient: selectedPatient,
        doctor: selectedDoctor,
      });
      setSelectedPatient('');
      setSelectedDoctor('');
      fetchMappings();
    } catch {
      setError('Failed to add mapping');
    }
  };

  return (
    <Layout>
      <h2>Patient-Doctor Mappings</h2>
      <form onSubmit={handleAddMapping}>
        <select value={selectedPatient} onChange={e=>setSelectedPatient(e.target.value)} required>
          <option value="">Select Patient</option>
          {patients.map(p => (<option key={p.id} value={p.id}>{p.name}</option>))}
        </select>
        <select value={selectedDoctor} onChange={e=>setSelectedDoctor(e.target.value)} required>
          <option value="">Select Doctor</option>
          {doctors.map(d => (<option key={d.id} value={d.id}>{d.name}</option>))}
        </select>
        <button type="submit">Add Mapping</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
      <ul>
        {mappings.map(m => (
          <li key={m.id}>
            Patient ID: {m.patient} - Doctor ID: {m.doctor}
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Mappings;
