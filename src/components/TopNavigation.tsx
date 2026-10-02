import type { PlaceCategory } from '../types';

interface TopNavigationProps {
  selectedCategory: PlaceCategory | 'All';
  onSelectCategory: (category: PlaceCategory | 'All') => void;
  totalCount: number;
}

const CATEGORIES: (PlaceCategory | 'All')[] = [
  'All',
  'Culture',
  'Nature & Walk',
  'Tea & Cafe',
  'Local Food',
];

export const TopNavigation: React.FC<TopNavigationProps> = ({
  selectedCategory,
  onSelectCategory,
  totalCount,
}) => {
  return (
    <header className="top-nav">
      {/* Brand Identity */}
      <div className="top-nav-brand">
        <div className="brand-symbol" aria-hidden="true">
          S
        </div>
        <div className="brand-text">
          <span className="brand-title">Seongbuk Discovery</span>
          <span className="brand-subtitle">Curated Local Guide · Seoul</span>
        </div>
      </div>

      {/* Area Context Header */}
      <div className="top-nav-context">
        <span className="context-dot" aria-hidden="true" />
        <span className="context-location">Seongbuk-dong</span>
        <span className="context-badge">· {totalCount} Hidden Places</span>
      </div>

      {/* Category Filter Controls */}
      <div className="top-nav-controls">
        <nav className="nav-category-pills" aria-label="Category filters">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              className={`category-pill ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => onSelectCategory(category)}
            >
              {category}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};
