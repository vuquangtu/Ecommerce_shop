function ShopCategory({ filterCategories, activeCategory, setActive }) {
  return (
    <div className="wiget-header">
      <h6 className="ms-2 mb-2">All Categories</h6>
      <div>
        {filterCategories.map((item, index) => (
          <button
            key={index}
            onClick={() => setActive(item)}
            className={`ms-2 mb-2 ${
              activeCategory === item ? "bg-warning" : ""
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ShopCategory;
