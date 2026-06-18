import React from 'react';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share';
import { X, Copy, Share2 } from 'lucide-react';

function ShareModal({ shareUrl, onClose }) {
  if (!shareUrl) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    alert('Link copied to clipboard');
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2000,
      animation: 'fadeInUp 0.3s ease-out'
    }} onClick={onClose}>
      <div className="card" style={{
        maxWidth: '500px',
        width: '90%',
        textAlign: 'center',
        position: 'relative'
      }} onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#999'
          }}
        >
          <X size={24} />
        </button>
        
        <div style={{ padding: '1rem 0' }}>
          <Share2 size={48} color="#FF69B4" style={{ marginBottom: '1rem' }} />
          <h3 style={{ marginBottom: '0.5rem', color: '#4A2B2B' }}>Share Your Leftovers Combo</h3>
          <p style={{ marginBottom: '1.5rem', color: '#666' }}>
            Share this link with friends so they can try these recipes too
          </p>
        </div>
        
        <div style={{
          background: '#FFF0F5',
          padding: '0.75rem',
          borderRadius: '12px',
          marginBottom: '1.5rem',
          wordBreak: 'break-all'
        }}>
          <code style={{ fontSize: '12px', color: '#FF69B4' }}>{shareUrl}</code>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <FacebookShareButton url={shareUrl}>
            <FacebookIcon size={44} round />
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl}>
            <TwitterIcon size={44} round />
          </TwitterShareButton>
          <WhatsappShareButton url={shareUrl}>
            <WhatsappIcon size={44} round />
          </WhatsappShareButton>
        </div>
        
        <button onClick={copyToClipboard} className="btn-primary" style={{ width: '100%', gap: '8px' }}>
          <Copy size={16} /> Copy Link
        </button>
      </div>
    </div>
  );
}

export default ShareModal;