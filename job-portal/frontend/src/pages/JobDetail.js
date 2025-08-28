import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobAPI, applicationAPI } from '../services/api';

const JobDetail = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState(null);

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const response = await jobAPI.getJob(id);
      setJob(response.data);
    } catch (error) {
      console.error('Error fetching job:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    setApplying(true);
    try {
      await applicationAPI.apply({ jobId: id, coverLetter });
      setApplicationStatus('success');
      setShowApplicationForm(false);
      setCoverLetter('');
    } catch (error) {
      setApplicationStatus('error');
      console.error('Error applying:', error);
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading job details...</div>;
  }

  if (!job) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Job not found</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '2rem' }}>
      {/* Job Header */}
      <div style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>{job.title}</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ color: '#2563eb', fontSize: '1.5rem', fontWeight: '600' }}>{job.company_name}</h2>
          <span style={{ color: '#64748b' }}>📍 {job.location}</span>
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
        </div>
        
        {job.salary_min && job.salary_max && (
          <p style={{ color: '#059669', fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
            ${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()} per year
          </p>
        )}

        <p style={{ color: '#64748b' }}>
          Posted on {new Date(job.created_at).toLocaleDateString()}
        </p>
      </div>

      {/* Application Status */}
      {applicationStatus === 'success' && (
        <div style={{ padding: '1rem', backgroundColor: '#f0fdf4', color: '#166534', borderRadius: '4px', marginBottom: '1.5rem' }}>
          Application submitted successfully! The employer will review your application.
        </div>
      )}

      {applicationStatus === 'error' && (
        <div style={{ padding: '1rem', backgroundColor: '#fef2f2', color: '#dc2626', borderRadius: '4px', marginBottom: '1.5rem' }}>
          Failed to submit application. You may have already applied for this job.
        </div>
      )}

      {/* Apply Button */}
      {user && user.role === 'jobseeker' && !showApplicationForm && applicationStatus !== 'success' && (
        <div style={{ marginBottom: '2rem' }}>
          <button
            onClick={() => setShowApplicationForm(true)}
            style={{ 
              padding: '0.75rem 2rem', 
              backgroundColor: '#2563eb', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontWeight: '600'
            }}
          >
            Apply for this Job
          </button>
        </div>
      )}

      {/* Application Form */}
      {showApplicationForm && (
        <div style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '8px', backgroundColor: '#f8fafc' }}>
          <h3 style={{ marginBottom: '1rem' }}>Apply for {job.title}</h3>
          <form onSubmit={handleApply}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                Cover Letter (Optional)
              </label>
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                rows="5"
                placeholder="Tell the employer why you're interested in this position..."
                style={{ 
                  width: '100%', 
                  padding: '0.75rem', 
                  border: '1px solid #d1d5db', 
                  borderRadius: '4px',
                  resize: 'vertical'
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                type="submit"
                disabled={applying}
                style={{ 
                  padding: '0.75rem 1.5rem', 
                  backgroundColor: applying ? '#9ca3af' : '#2563eb', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '4px', 
                  cursor: applying ? 'not-allowed' : 'pointer'
                }}
              >
                {applying ? 'Submitting...' : 'Submit Application'}
              </button>
              <button
                type="button"
                onClick={() => setShowApplicationForm(false)}
                style={{ 
                  padding: '0.75rem 1.5rem', 
                  backgroundColor: '#6b7280', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '4px', 
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Job Description */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1e293b' }}>Job Description</h3>
        <div style={{ color: '#374151', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
          {job.description}
        </div>
      </div>

      {/* Requirements */}
      {job.requirements && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1e293b' }}>Requirements</h3>
          <div style={{ color: '#374151', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
            {job.requirements}
          </div>
        </div>
      )}

      {/* Company Info */}
      <div style={{ padding: '1.5rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1e293b' }}>About {job.company_name}</h3>
        {job.company_description && (
          <p style={{ color: '#374151', lineHeight: '1.6', marginBottom: '1rem' }}>
            {job.company_description}
          </p>
        )}
        {job.website && (
          <p>
            <strong>Website:</strong>{' '}
            <a href={job.website} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb' }}>
              {job.website}
            </a>
          </p>
        )}
      </div>

      {/* Login prompt for non-authenticated users */}
      {!user && (
        <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#1e293b', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
          <h3 style={{ marginBottom: '1rem' }}>Ready to Apply?</h3>
          <p style={{ marginBottom: '1rem' }}>Create an account or login to apply for this job</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
              onClick={() => navigate('/register?role=jobseeker')}
              style={{ padding: '0.75rem 1.5rem', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Create Account
            </button>
            <button
              onClick={() => navigate('/login')}
              style={{ padding: '0.75rem 1.5rem', backgroundColor: 'transparent', color: 'white', border: '1px solid white', borderRadius: '4px', cursor: 'pointer' }}
            >
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetail;