import productsData from '../../../../data/products.json';
import styles from './CatalogPage.module.css';

import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductCard } from '../productcard/ProductCard';

export const CatalogPage = () => {
  const { id } = useParams();
  let products = [];
  let title = 'Product Catalog';
  let description = '';

  //PAGE SETUP
  if (id) {
    const category = productsData.categories.find(cat => cat.id === parseInt(id));
    products = category ? category.products : [];
    title = category ? category.name : 'Category Not Found';
    description = category ? category.description : '';
  } else {
    products = productsData.categories.flatMap(category => category.products);
  }

  //STATES
  const [visibleItemsCount, setVisibleItems] = useState(8);
  const [sortOption, setSortOption] = useState('');
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  //RESET
  useEffect(() => {
    setVisibleItems(8);
    setSortOption('');
    setSelectedMaterials([]);
    setSelectedBrands([]);
    setPriceRange([0, 10000]);
  }, [id]);

  //LOAD MORE
  const handleLoadMore = () => {
    setVisibleItems(prev => Math.min(prev + 8, products.length));
  };

  //GET FILTER CRITERIA
  const availableMaterials = useMemo(() => {
    const set = new Set(products.map(p => p.material));
    return Array.from(set);
  }, [products]);

  const availableBrands = useMemo(() => {
    const set = new Set(products.map(p => p.brand));
    return Array.from(set);
  }, [products]);

  const prices = products.map(p => p.price);
  const minPrice = Math.min(...prices, 0);
  const maxPrice = Math.max(...prices, 0);

  //FILTERING LOGIC
  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedMaterials.length) {
      result = result.filter(p => selectedMaterials.includes(p.material));
    }

    if (selectedBrands.length) {
      result = result.filter(p => selectedBrands.includes(p.brand));
    }

    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (sortOption) {
      result = [...result];
      switch (sortOption) {
        case 'name-asc':
          result.sort((a, b) => a.model.localeCompare(b.model));
          break;
        case 'name-desc':
          result.sort((a, b) => b.model.localeCompare(a.model));
          break;
        case 'price-asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result.sort((a, b) => b.price - a.price);
          break;
        default:
          break;
      }
    }
    return result;
  }, [products, sortOption, selectedMaterials, selectedBrands, priceRange]);

  const displayedProducts = filteredProducts.slice(0, visibleItemsCount);

  //FILTER HANDLERS
  const handleMaterialChange = (material) => {
    setSelectedMaterials(prev =>
      prev.includes(material)
        ? prev.filter(m => m !== material)
        : [...prev, material]
    );
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

    const handlePriceChange = (e) => {
      const index = parseInt(e.target.dataset.index);
      const newValue = parseInt(e.target.value) || 0;
      const newRange = [...priceRange];
      newRange[index] = newValue;
      setPriceRange(newRange);
  };

  return (
    <div className={styles.catalogWithSidebar}>
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          <h2>Filters</h2>
          <button className={styles.closeButton} onClick={() => setSidebarOpen(false)}>
            <i className="fa-solid fa-times"></i>
          </button>
        </div>
        <div className={styles.filterSection}>
          <h3>Material</h3>
          {availableMaterials.map(mat => (
            <label key={mat} className={styles.filterLabel}>
              <input
                type="checkbox"
                checked={selectedMaterials.includes(mat)}
                onChange={() => handleMaterialChange(mat)}
              />
              {mat}
            </label>
          ))}
        </div>
        <div className={styles.filterSection}>
          <h3>Brand</h3>
          {availableBrands.map(br => (
            <label key={br} className={styles.filterLabel}>
              <input
                type="checkbox"
                checked={selectedBrands.includes(br)}
                onChange={() => handleBrandChange(br)}
              />
              {br}
            </label>
          ))}
        </div>
        <div className={styles.filterSection}>
          <h3>Price</h3>
          <div className={styles.priceRange}>
            <input
              type="number"
              min={minPrice}
              max={maxPrice}
              value={priceRange[0]}
              data-index="0"
              onChange={handlePriceChange}
            />
            <span>–</span>
            <input
              type="number"
              min={minPrice}
              max={maxPrice}
              value={priceRange[1]}
              data-index="1"
              onChange={handlePriceChange}
            />
          </div>
          <div className={styles.priceLabels}>
            <p>Min Price</p>
            <p>Max Price</p>
          </div>
        </div>
      </aside>

      <div className={styles.mainContent}>
        <button className={styles.filterToggle} onClick={() => setSidebarOpen(!sidebarOpen)}>
          <i className="fa-solid fa-filter"></i> Filters
        </button>
        <div className={styles.controls}>
          <div className={styles.categoryInfoContainer}>
            <h1 className={styles.categoryTitle}>{title}</h1>
            <p className={styles.categoryDesc}>{description}</p>
          </div>
          <select
            value={sortOption}
            onChange={e => setSortOption(e.target.value)}
            className={styles.sortSelect}
          >
            <option value="">Sort By</option>
            <option value="name-asc">Name ↑</option>
            <option value="name-desc">Name ↓</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
          </select>
        </div>
        <div className={styles.displayCount}>
          {displayedProducts.length} out of {filteredProducts.length} products displayed.
        </div>
        <div className={styles.grid}>
          {displayedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {visibleItemsCount < filteredProducts.length && (
          <div className={styles.loadMoreContainer}>
            <button className={styles.loadMoreButton} onClick={handleLoadMore}>
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};