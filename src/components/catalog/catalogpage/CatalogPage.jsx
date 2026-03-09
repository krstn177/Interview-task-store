import productsData from '../../../../data/products.json';
import styles from './CatalogPage.module.css';

import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ProductCard } from '../productcard/ProductCard';

export const CatalogPage = () => {
  const { id } = useParams();
  let products = [];
  let title = 'Product Catalog';

  if (id) {
    const category = productsData.categories.find(cat => cat.id === parseInt(id));
    products = category ? category.products : [];
    title = category ? category.name : 'Category Not Found';
  } else {
    products = productsData.categories.flatMap(category => category.products);
  }

  const [visibleItemsCount, setVisibleItems] = useState(8);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);

  const handleLoadMore = () => {
    setVisibleItems(prev => Math.min(prev + 8, products.length));
  };

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

  const filteredProducts = useMemo(() => {
    let result = products;

    // search
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(p =>
        p.model.toLowerCase().includes(term) ||
        p.brand.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
      );
    }

    // material filter
    if (selectedMaterials.length) {
      result = result.filter(p => selectedMaterials.includes(p.material));
    }

    // brand filter
    if (selectedBrands.length) {
      result = result.filter(p => selectedBrands.includes(p.brand));
    }

    // price range filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // sorting
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
  }, [products, searchTerm, sortOption, selectedMaterials, selectedBrands, priceRange]);

  const displayedProducts = filteredProducts.slice(0, visibleItemsCount);

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

  const handlePriceChange = (values) => {
    setPriceRange(values);
  };

  return (
    <div className={styles.catalogWithSidebar}>
      <aside className={styles.sidebar}>
        <h2>Filters</h2>
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
        <h1>{title}</h1>
        <div className={styles.controls}>
          <input
            type="text"
            placeholder="Search by name, brand or description..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
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