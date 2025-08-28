import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jobAPI } from '../services/api';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    jobType: ''
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async (searchParams = {}) => {
    setLoading(true);
    try {
      const response = await jobAPI.getJobs(searchParams);
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs(filters);
  };

  const clearFilters = () => {
    setFilters({ search: '', location: '', jobType: '' });
    fetchJobs();
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading jobs...</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>Browse Jobs</h1>

      {/* Search and Filters */}
      <div style={{ backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <form onSubmit={handleSearch}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
            <input
              type="text"
              name="search"
              placeholder="Job title or keywords"
              value={filters.search}
              onChange={handleFilterChange}
              style={{ padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={filters.location}
              onChange={handleFilterChange}
              style={{ padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
            />
            <select
              name="jobType"
              value={filters.jobType}
              onChange={handleFilterChange}
              style={{ padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
            >
              <option value="">All Job Types</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              type="submit"
              style={{ padding: '0.75rem 1.5rem', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Search Jobs
            </button>
            <button 
              type="button"
              onClick={clearFilters}
              style={{ padding: '0.75rem 1.5rem', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Clear Filters
            </button>
          </div>
        </form>
      </div>

      {/* Job Results */}
      <div style={{ marginBottom: '1rem' }}>
        <p style={{ color: '#64748b' }}>{jobs.length} jobs found</p>
      </div>

      {jobs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
          <h3>No jobs found</h3>
          <p>Try adjusting your search criteria</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {jobs.map((job) => (
            <div key={job.id} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1.5rem', backgroundColor: 'white' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>
                    <Link to={`/jobs/${job.id}`} style={{ color: '#1e293b', textDecoration: 'none' }}>
                      {job.title}
                    </Link>
                  </h3>
                  <p style={{ color: '#2563eb', marginBottom: '0.5rem', fontWeight: '600', fontSize: '1.1rem' }}>
                    {job.company_name}
                  </p>
                  <p style={{ color: '#64748b', marginBottom: '0.5rem' }}>📍 {job.location}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ 
                    backgroundColor: '#dbeafe', 
                    color: '#1e40af', 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '9999px', 
                    fontSize: '0.875rem',
                    textTransform: 'capitalize'
                  }}>
                    {job.job_type.replace('-', ' ')}
                  </span>
                  {job.salary_min && job.salary_max && (
                    <p style={{ color: '#059669', marginTop: '0.5rem', fontWeight: '600' }}>
                      ${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
              
              <p style={{ 
                color: '#64748b', 
                marginBottom: '1rem', 
                display: '-webkit-box', 
                WebkitLineClamp: 2, 
                WebkitBoxOrient: 'vertical', 
                overflow: 'hidden' 
              }}>
                {job.description}
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#64748b', fontSize: '0.875rem' }}>
                  Posted {new Date(job.created_at).toLocaleDateString()}
                </span>
                <Link 
                  to={`/jobs/${job.id}`}
                  style={{ 
                    padding: '0.5rem 1rem', 
                    backgroundColor: '#2563eb', 
                    color: 'white', 
                    textDecoration: 'none', 
                    borderRadius: '4px',
                    fontSize: '0.875rem'
                  }}
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;