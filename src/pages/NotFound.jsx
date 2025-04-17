import { Link } from 'react-router-dom'

/**
 * 404 Not Found page component
 */
const NotFound = () => {
    return (
        <div className="not-found-container">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>The page you're looking for doesn't exist or has been moved.</p>
            <Link to="/" className="btn btn-primary">
                Back to Home
            </Link>
        </div>
    )
}

export default NotFound