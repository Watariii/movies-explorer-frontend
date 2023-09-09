import { Link, useNavigate } from "react-router-dom";

function NotFound() {
  
 const navigate = useNavigate();
 
  return (
    <main className="content">
      <section className="not-found">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__text">Страница не найдена</p>
        <Link onClick={() => {  navigate(-1, { replace: true })}} className="not-found__link">
          Назад
        </Link>
      </section>
    </main>
  );
}

export default NotFound;
