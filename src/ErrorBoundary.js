import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: 'red', fontFamily: 'monospace' }}>
          <h1>❌ App Error</h1>
          <p><strong>Error:</strong> {this.state.error?.message}</p>
          <p><strong>Stack:</strong></p>
          <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
            {this.state.error?.stack}
          </pre>
          <p style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
            Check browser console (F12) for more details. 
            Try clearing localStorage and reloading:
          </p>
          <button onClick={() => {
            localStorage.clear();
            window.location.reload();
          }} style={{ padding: '10px 20px', fontSize: '14px' }}>
            Clear Cache & Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
