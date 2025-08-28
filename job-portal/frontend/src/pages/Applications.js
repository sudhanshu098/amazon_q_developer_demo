import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { applicationAPI } from '../services/api';

const Applications = ({ user }) => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Redirect if not job seeker
  if (!user || user.role !== 'jobseeker') {
    navigate('/');
    return null;
  }

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await applicationAPI.getMyApplications();
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return { bg: '#fef3c7', color: '#d97706' };
      case 'reviewed': return { bg: '#dbeafe', color: '#2563eb' };
      case 'accepted': return { bg: '#dcfce7', color: '#059669' };
      case 'rejected': return { bg: '#fecaca', color: '#dc2626' };
      default: return { bg: '#f3f4f6', color: '#6b7280' };
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return '⏳';
      case 'reviewed': return '👀';
      case 'accepted': return '✅';
      case 'rejected': return '❌';
      default: return '📄';
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading your applications...</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem' }}>My Applications</h1>
        <Link 
          to="/jobs"
          style={{ 
            padding: '0.75rem 1.5rem', 
            backgroundColor: '#2563eb', 
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '4px',
            fontWeight: '600'
          }}
        >
          Browse More Jobs
        </Link>
      </div>

      {applications.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
          <h3 style={{ marginBottom: '1rem' }}>No applications yet</h3>
          <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Start applying for jobs that match your skills and interests</p>
          <Link 
            to="/jobs"
            style={{ 
              display: 'inline-block',
              padding: '0.75rem 1.5rem', 
              backgroundColor: '#2563eb', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '4px'
            }}
          >
            Browse Jobs
          </Link>
        </div>
      ) : (
        <>
          {/* Summary Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            {['pending', 'reviewed', 'accepted', 'rejected'].map(status => {
              const count = applications.filter(app => app.status === status).length;
              const colors = getStatusColor(status);
              return (
                <div key={status} style={{ 
                  padding: '1.5rem', 
                  backgroundColor: colors.bg, 
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{getStatusIcon(status)}</div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: colors.color, marginBottom: '0.25rem' }}>
                    {count}
                  </div>
                  <div style={{ color: colors.color, textTransform: 'capitalize', fontWeight: '600' }}>
                    {status}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Applications List */}
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>All Applications ({applications.length})</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {applications.map((application) => {
                const colors = getStatusColor(application.status);
                return (
                  <div key={application.id} style={{ 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '8px', 
                    padding: '1.5rem', 
                    backgroundColor: 'white'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                      <div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>
                          <Link 
                            to={`/jobs/${application.job_id}`}
                            style={{ color: '#1e293b', textDecoration: 'none' }}
                          >
                            {application.title}
                          </Link>
                        </h3>
                        <p style={{ color: '#2563eb', marginBottom: '0.5rem', fontWeight: '600' }}>
                          {application.company_name}
                        </p>
                        <p style={{ color: '#64748b', marginBottom: '0.5rem' }}>📍 {application.location}</p>
                        <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
                          Applied on {new Date(application.applied_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ 
                          backgroundColor: colors.bg, 
                          color: colors.color, 
                          padding: '0.5rem 1rem', 
                          borderRadius: '9999px', 
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          textTransform: 'capitalize',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          {getStatusIcon(application.status)} {application.status}
                        </span>
                      </div>
                    </div>

                    {application.cover_letter && (
                      <div style={{ marginBottom: '1rem' }}>
                        <h4 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
                          Your Cover Letter:
                        </h4>
                        <p style={{ 
                          color: '#64748b', 
                          fontSize: '0.875rem', 
                          backgroundColor: '#f8fafc', 
                          padding: '0.75rem', 
                          borderRadius: '4px',
                          whiteSpace: 'pre-wrap',
                          maxHeight: '100px',
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical'
                        }}>
                          {application.cover_letter}
                        </p>
                      </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        {application.status === 'accepted' && (
                          <span style={{ color: '#059669', fontSize: '0.875rem', fontWeight: '600' }}>
                            🎉 Congratulations! Your application was accepted.
                          </span>
                        )}
                        {application.status === 'rejected' && (
                          <span style={{ color: '#dc2626', fontSize: '0.875rem' }}>
                            Unfortunately, your application was not selected.
                          </span>
                        )}
                        {application.status === 'reviewed' && (
                          <span style={{ color: '#2563eb', fontSize: '0.875rem' }}>
                            Your application is being reviewed by the employer.
                          </span>
                        )}
                        {application.status === 'pending' && (
                          <span style={{ color: '#d97706', fontSize: '0.875rem' }}>
                            Your application is waiting to be reviewed.
                          </span>
                        )}
                      </div>
                      <Link 
                        to={`/jobs/${application.job_id}`}
                        style={{ 
                          color: '#2563eb', 
                          textDecoration: 'none', 
                          fontSize: '0.875rem',
                          fontWeight: '600'
                        }}
                      >
                        View Job Details →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Applications;