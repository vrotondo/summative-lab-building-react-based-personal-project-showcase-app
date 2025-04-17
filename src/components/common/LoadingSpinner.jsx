/**
 * Loading spinner component to display during asynchronous operations
 */
const LoadingSpinner = () => {
    return (
        <div className="loading-spinner-container">
            <div className="loading-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default LoadingSpinner