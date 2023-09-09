function Preloader({ isLoading }) {
    return (
        <div className={`preloader ${isLoading? "preloader_active" : ""}`}>
            <div className="preloader__container">
                <span className={`preloader__round ${isLoading ? "preloader__round_active" : ""}`}></span>
            </div>
        </div>
    )
};

export default Preloader
