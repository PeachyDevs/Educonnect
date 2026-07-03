import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container">
      <main className="main-content">
        <div className="section">
          <h1>Page Not Found</h1>
          <p>Sorry, the page you are looking for does not exist.</p>
          <Link to="/" className="btn-primary">Return Home</Link>
        </div>
      </main>
    </div>
  );
}
