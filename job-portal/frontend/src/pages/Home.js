import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jobAPI } from '../services/api';

const Home = ({ user }) => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async (searchParams = {}) => {
    try {
      const response = await jobAPI.getJobs(searchParams);
      setJobs(response.data.slice(0, 6)); // Show only 6 jobs on home page
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs({ search, location });
  };

  return (
    <div style={{ padding: '2rem' }}>
      {/* Hero Section */}
      <div style={{ textAlign: 'center', marginBottom: '3rem', padding: '3rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#1e293b' }}>Find Your Dream Job</h1>
        <p style={{ fontSize: '1.2rem', color: '#64748b', marginBottom: '2rem' }}>
          Connect with top employers and discover opportunities that match your skills
        </p>
        
        {/* Search Form */}
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <input
            type="text"
            placeholder="Job title or keywords"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{ flex: 1, padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
          />
          <button type="submit" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Search
          </button>
        </form>
      </div>

      {/* Featured Jobs */}
      <div>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center' }}>Featured Jobs</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {jobs.map((job) => (
            <div key={job.id} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1.5rem', backgroundColor: 'white' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>{job.title}</h3>
              <p style={{ color: '#2563eb', marginBottom: '0.5rem', fontWeight: '600' }}>{job.company_name}</p>
              <p style={{ color: '#64748b', marginBottom: '0.5rem' }}>{job.location}</p>
              <p style={{ color: '#64748b', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {job.description}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ backgroundColor: '#dbeafe', color: '#1e40af', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.875rem' }}>
                  {job.job_type}
                </span>
                <Link 
                  to={`/jobs/${job.id}`}
                  style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '600' }}
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link 
            to="/jobs"
            style={{ display: 'inline-block', padding: '0.75rem 1.5rem', backgroundColor: '#2563eb', color: 'white', textDecoration: 'none', borderRadius: '4px' }}
          >
            View All Jobs
          </Link>
        </div>
      </div>

      {/* CTA Section */}
      {!user && (
        <div style={{ textAlign: 'center', marginTop: '4rem', padding: '2rem', backgroundColor: '#1e293b', color: 'white', borderRadius: '8px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Ready to Get Started?</h2>
          <p style={{ marginBottom: '1.5rem' }}>Join thousands of job seekers and employers</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link 
              to="/register?role=jobseeker"
              style={{ padding: '0.75rem 1.5rem', backgroundColor: '#2563eb', color: 'white', textDecoration: 'none', borderRadius: '4px' }}
            >
              Find Jobs
            </Link>
            <Link 
              to="/register?role=employer"
              style={{ padding: '0.75rem 1.5rem', backgroundColor: '#059669', color: 'white', textDecoration: 'none', borderRadius: '4px' }}
            >
              Post Jobs
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;