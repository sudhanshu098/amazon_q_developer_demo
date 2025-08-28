import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jobAPI, applicationAPI } from '../services/api';

const MyJobs = ({ user }) => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applications, setApplications] = useState([]);

  // Redirect if not employer
  if (!user || user.role !== 'employer') {
    navigate('/');
    return null;
  }

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    try {
      const response = await jobAPI.getMyJobs();
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async (jobId) => {
    try {
      const response = await applicationAPI.getJobApplications(jobId);
      setApplications(response.data);
      setSelectedJob(jobId);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const updateApplicationStatus = async (applicationId, status) => {
    try {
      await applicationAPI.updateStatus(applicationId, status);
      // Refresh applications
      if (selectedJob) {
        fetchApplications(selectedJob);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#f59e0b';
      case 'reviewed': return '#3b82f6';
      case 'accepted': return '#10b981';
      case 'rejected': return '#ef4444';
      default: return '#6b7280';
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading your jobs...</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem' }}>My Job Postings</h1>
        <Link 
          to="/post-job"
          style={{ 
            padding: '0.75rem 1.5rem', 
            backgroundColor: '#2563eb', 
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '4px',
            fontWeight: '600'
          }}
        >
          Post New Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
          <h3 style={{ marginBottom: '1rem' }}>No jobs posted yet</h3>
          <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Start by posting your first job to attract candidates</p>
          <Link 
            to="/post-job"
            style={{ 
              display: 'inline-block',
              padding: '0.75rem 1.5rem', 
              backgroundColor: '#2563eb', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '4px'
            }}
          >
            Post Your First Job
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: selectedJob ? '1fr 1fr' : '1fr', gap: '2rem' }}>
          {/* Jobs List */}
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Your Jobs ({jobs.length})</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {jobs.map((job) => (
                <div 
                  key={job.id} 
                  style={{ 
                    border: selectedJob === job.id ? '2px solid #2563eb' : '1px solid #e5e7eb', 
                    borderRadius: '8px', 
                    padding: '1.5rem', 
                    backgroundColor: 'white',
                    cursor: 'pointer'
                  }}
                  onClick={() => fetchApplications(job.id)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>{job.title}</h3>
                      <p style={{ color: '#64748b', marginBottom: '0.5rem' }}>📍 {job.location}</p>
                      <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
                        Posted {new Date(job.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ 
                        backgroundColor: job.status === 'active' ? '#dcfce7' : '#fef2f2', 
                        color: job.status === 'active' ? '#166534' : '#dc2626', 
                        padding: '0.25rem 0.75rem', 
                        borderRadius: '9999px', 
                        fontSize: '0.875rem',
                        textTransform: 'capitalize'
                      }}>
                        {job.status}
                      </span>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ color: '#059669', fontWeight: '600' }}>
                        {job.application_count} applications
                      </span>
                      <span style={{ color: '#2563eb', fontSize: '0.875rem' }}>
                        Click to view applications →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Applications Panel */}
          {selectedJob && (
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                Applications ({applications.length})
              </h2>
              
              {applications.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                  <p style={{ color: '#64748b' }}>No applications yet for this job</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '600px', overflowY: 'auto' }}>
                  {applications.map((application) => (
                    <div key={application.id} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1.5rem', backgroundColor: 'white' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                        <div>
                          <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#1e293b' }}>{application.name}</h4>
                          <p style={{ color: '#64748b', marginBottom: '0.25rem' }}>📧 {application.email}</p>
                          {application.phone && (
                            <p style={{ color: '#64748b', marginBottom: '0.25rem' }}>📞 {application.phone}</p>
                          )}
                          <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
                            Applied {new Date(application.applied_at).toLocaleDateString()}
                          </p>
                        </div>
                        <span style={{ 
                          backgroundColor: `${getStatusColor(application.status)}20`, 
                          color: getStatusColor(application.status), 
                          padding: '0.25rem 0.75rem', 
                          borderRadius: '9999px', 
                          fontSize: '0.875rem',
                          textTransform: 'capitalize'
                        }}>
                          {application.status}
                        </span>
                      </div>

                      {application.cover_letter && (
                        <div style={{ marginBottom: '1rem' }}>
                          <h5 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
                            Cover Letter:
                          </h5>
                          <p style={{ 
                            color: '#64748b', 
                            fontSize: '0.875rem', 
                            backgroundColor: '#f8fafc', 
                            padding: '0.75rem', 
                            borderRadius: '4px',
                            whiteSpace: 'pre-wrap'
                          }}>
                            {application.cover_letter}
                          </p>
                        </div>
                      )}

                      {application.status === 'pending' && (
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            onClick={() => updateApplicationStatus(application.id, 'reviewed')}
                            style={{ 
                              padding: '0.5rem 1rem', 
                              backgroundColor: '#3b82f6', 
                              color: 'white', 
                              border: 'none', 
                              borderRadius: '4px', 
                              cursor: 'pointer',
                              fontSize: '0.875rem'
                            }}
                          >
                            Mark as Reviewed
                          </button>
                          <button
                            onClick={() => updateApplicationStatus(application.id, 'accepted')}
                            style={{ 
                              padding: '0.5rem 1rem', 
                              backgroundColor: '#10b981', 
                              color: 'white', 
                              border: 'none', 
                              borderRadius: '4px', 
                              cursor: 'pointer',
                              fontSize: '0.875rem'
                            }}
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => updateApplicationStatus(application.id, 'rejected')}
                            style={{ 
                              padding: '0.5rem 1rem', 
                              backgroundColor: '#ef4444', 
                              color: 'white', 
                              border: 'none', 
                              borderRadius: '4px', 
                              cursor: 'pointer',
                              fontSize: '0.875rem'
                            }}
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyJobs;