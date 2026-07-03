import { useNavigate, Link } from 'react-router-dom';
import logo from '../../images/E.png';

export default function Username() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/profile');
  };

  return (
    <div className="login container">
      <header className="navbar">
        <Link to="/" className="logo-link">
          <img src={logo} alt="EduConnect" className="nav-icon" />
        </Link>
      </header>
      <div className="left">
        <h1>You're Doing Great!</h1>
        <p>Just one more step for your journey to begin!</p>
      </div>
      <div className="form-container">
        <h2>Enter Username</h2>
        <form onSubmit={handleSubmit} className="form-grid">
          <input type="text" placeholder="Username" required />
          <input type="password" placeholder="Confirm Password" required />
          <button type="submit">Continue</button>
        </form>
        <p>Already have an account? <Link to="/login">Sign In</Link></p>
      </div>
    </div>
  );
}
