function Pagination({
  productsPerPage,
  currentProducts,
  activePage,
  setActivepage,
}) {
  const pages = [];

  for (
    let index = 1;
    index <= Math.ceil(currentProducts.length / productsPerPage);
    index++
  ) {
    pages.push(index);
  }

  return (
    <ul className="default-pagination lab-ul">
      <li>
        <a
          href=""
          onClick={(e) => {
            e.preventDefault();
            if (activePage === 1) {
              setActivepage(pages.length);
            } else {
              setActivepage(activePage - 1);
            }
          }}
        >
          <i className="icofont-rounded-left"></i>
        </a>
      </li>
      {pages.map((item, index) => (
        <li
          key={index}
          className={`page-item ${activePage === item ? "bg-warning" : ""}`}
        >
          <button
            className="bg-transparent"
            onClick={() => {
              setActivepage(item);
            }}
          >
            {item}
          </button>
        </li>
      ))}
      <li>
        <a
          href=""
          onClick={(e) => {
            e.preventDefault();
            if (activePage === pages.length) {
              setActivepage(1);
            } else {
              setActivepage(activePage + 1);
            }
          }}
        >
          <i className="icofont-rounded-right"></i>
        </a>
      </li>
    </ul>
  );
}

export default Pagination;
