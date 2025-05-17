const Footer = () => {

  return (
    <footer className="bg-white rounded shadow p-5 mb-4 mt-4">
      <div className="row">
        <div className="col-12 col-md-4 col-xl-6 mb-4 mb-md-0">
          <p className="mb-0 text-center text-lg-start">
            © <span className="current-year">2025</span>{' '}
          </p>
        </div>
        <div className="col-12 col-md-8 col-xl-6 text-center text-lg-start">
          <ul className="list-inline list-group-flush list-group-borderless text-md-end mb-0">
            <li className="list-inline-item px-0 px-sm-2">
              <a href="/about">Про сайт</a>
            </li>
            <li className="list-inline-item px-0 px-sm-2">
              <a href="/contact">Обратний зв'язок</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
