/**
 * Products Page — Paradise Nursery (Redesigned)
 * Organic luxury aesthetic: matches Landing page design system.
 * Features: sticky filter sidebar, masonry-feel grid, category pills,
 * animated product cards with quick-view hover, empty state, sort/search.
 */
import React from 'react';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { plants, categories } from '@/data/plants';
import { Leaf, Search, SlidersHorizontal, X, ChevronDown, ArrowUpDown, Grid3X3, LayoutList } from 'lucide-react';

/* ─── Shared design tokens (mirrors Landing page) ───────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

    :root {
      --forest:      #1a2e1a;
      --moss:        #2d4a2d;
      --sage:        #6b8f5e;
      --fern:        #8aad7a;
      --cream:       #f7f3ec;
      --parchment:   #efe8d8;
      --terracotta:  #c4714a;
      --gold:        #c9a84c;
      --charcoal:    #2a2a2a;
      --muted:       #888;
    }

    .pp-root {
      font-family: 'DM Sans', sans-serif;
      background: var(--cream);
      color: var(--charcoal);
      min-height: 100vh;
    }

    /* ── Page hero banner ── */
    .pp-banner {
      background: var(--forest);
      padding: 5rem 0 4rem;
      position: relative;
      overflow: hidden;
    }
    .pp-banner::before {
      content: '';
      position: absolute; inset: 0;
      background-image: url('https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=1600&q=60&fit=crop');
      background-size: cover; background-position: center;
      opacity: .08;
    }
    .pp-banner-inner {
      position: relative; z-index: 1;
      max-width: 1280px; margin: 0 auto; padding: 0 2rem;
      display: flex; align-items: flex-end; justify-content: space-between;
      flex-wrap: wrap; gap: 1.5rem;
    }
    .pp-banner-left {}
    .pp-banner-eyebrow {
      display: inline-flex; align-items: center; gap: .5rem;
      font-size: .72rem; letter-spacing: .18em; text-transform: uppercase;
      color: var(--fern); margin-bottom: .75rem;
    }
    .pp-banner-h1 {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(2.5rem, 6vw, 4.5rem);
      font-weight: 300; line-height: 1.05;
      color: #fff; margin-bottom: .5rem;
    }
    .pp-banner-h1 em { font-style: italic; color: var(--fern); }
    .pp-banner-sub {
      font-size: .95rem; color: rgba(255,255,255,.55); max-width: 420px; line-height: 1.65;
    }
    .pp-banner-count {
      text-align: right;
    }
    .pp-banner-count-num {
      font-family: 'Cormorant Garamond', serif;
      font-size: 3.5rem; font-weight: 300; color: #fff; line-height: 1;
    }
    .pp-banner-count-label {
      font-size: .72rem; letter-spacing: .12em; text-transform: uppercase;
      color: rgba(255,255,255,.4); margin-top: .25rem;
    }

    /* ── Controls bar ── */
    .pp-controls {
      background: var(--parchment);
      border-bottom: 1px solid rgba(107,143,94,.15);
      position: sticky; top: 1px; z-index: 150;
      padding-bottom: 6px;
    }
    .pp-controls-inner {
      max-width: 1280px; margin: 0 auto; padding: 0 2rem;
      display: flex; align-items: center; gap: 1rem;
      height: 64px; flex-wrap: wrap;
    }
    .pp-search-wrap {
      position: relative; flex: 1; min-width: 200px; max-width: 340px;
    }
    .pp-search-icon {
      position: absolute; left: .85rem; top: 50%; transform: translateY(-50%);
      color: var(--sage); pointer-events: none;
    }
    .pp-search {
      width: 100%; background: var(--cream);
      border: 1px solid rgba(107,143,94,.25); border-radius: 100px;
      padding: .55rem 1rem .55rem 2.4rem;
      font-size: .88rem; font-family: 'DM Sans', sans-serif;
      color: var(--charcoal); outline: none;
      transition: border-color .2s, box-shadow .2s;
    }
    .pp-search:focus {
      border-color: var(--sage);
      box-shadow: 0 0 0 3px rgba(107,143,94,.1);
    }
    .pp-search::placeholder { color: #aaa; }
    .pp-search-clear {
      position: absolute; right: .75rem; top: 50%; transform: translateY(-50%);
      background: none; border: none; cursor: pointer;
      color: var(--muted); padding: 0; display: flex;
      transition: color .2s;
    }
    .pp-search-clear:hover { color: var(--charcoal); }

    /* Category pills */
    .pp-pills {
      display: flex; align-items: center; gap: .5rem;
      overflow-x: auto; flex: 1;
      scrollbar-width: none;
    }
    .pp-pills::-webkit-scrollbar { display: none; }
    .pp-pill {
      white-space: nowrap;
      background: none; border: 1px solid rgba(107,143,94,.25);
      border-radius: 100px; padding: .35rem .9rem;
      font-size: .78rem; font-weight: 500; letter-spacing: .03em;
      color: var(--moss); cursor: pointer;
      transition: background .2s, border-color .2s, color .2s;
    }
    .pp-pill:hover { background: rgba(107,143,94,.1); }
    .pp-pill.active {
      background: var(--forest); border-color: var(--forest); color: var(--cream);
    }

    /* Sort select */
    .pp-sort-wrap { position: relative; flex-shrink: 0; }
    .pp-sort-icon {
      position: absolute; right: .75rem; top: 50%; transform: translateY(-50%);
      color: var(--sage); pointer-events: none;
    }
    .pp-sort {
      appearance: none;
      background: var(--cream);
      border: 1px solid rgba(107,143,94,.25); border-radius: 100px;
      padding: .55rem 2.2rem .55rem 1rem;
      font-size: .82rem; font-family: 'DM Sans', sans-serif;
      color: var(--charcoal); cursor: pointer; outline: none;
      transition: border-color .2s;
    }
    .pp-sort:focus { border-color: var(--sage); }

    /* View toggle */
    .pp-view-toggle {
      display: flex; border: 1px solid rgba(107,143,94,.25); border-radius: 100px;
      overflow: hidden; flex-shrink: 0;
    }
    .pp-view-btn {
      background: none; border: none; cursor: pointer;
      padding: .45rem .65rem; color: var(--muted);
      transition: background .2s, color .2s;
      display: flex; align-items: center;
    }
    .pp-view-btn.active { background: var(--forest); color: var(--cream); }
    .pp-view-btn:not(.active):hover { background: rgba(107,143,94,.08); }

    /* ── Main layout ── */
    .pp-main {
      max-width: 1280px; margin: 0 auto;
      padding: 3rem 2rem 5rem;
    }

    /* ── Category section ── */
    .pp-category { margin-bottom: 4rem; }
    .pp-category-header {
      display: flex; align-items: center; gap: 1.25rem;
      margin-bottom: 1.75rem;
      animation: ppFadeUp .5s both;
    }
    .pp-category-label {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.75rem; font-weight: 400;
      color: var(--forest); white-space: nowrap;
    }
    .pp-category-label em { font-style: italic; color: var(--terracotta); }
    .pp-category-line { flex: 1; height: 1px; background: rgba(107,143,94,.2); }
    .pp-category-count {
      font-size: .75rem; letter-spacing: .1em; text-transform: uppercase;
      color: var(--sage); white-space: nowrap;
    }

    /* ── Product grid ── */
    .pp-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
    }
    .pp-grid.list-view {
      grid-template-columns: 1fr;
    }
    @media (max-width: 1024px) { .pp-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 640px)  { .pp-grid { grid-template-columns: 1fr; } }

    /* ── Product card wrapper (for animation) ── */
    .pp-card-wrap {
      animation: ppFadeUp .45s both;
    }

    /* ── Active filters bar ── */
    .pp-active-filters {
      max-width: 1280px; margin: 0 auto;
      padding: 1rem 2rem 0;
      display: flex; align-items: center; gap: .75rem; flex-wrap: wrap;
    }
    .pp-filter-tag {
      display: inline-flex; align-items: center; gap: .4rem;
      background: rgba(26,46,26,.07); border-radius: 100px;
      padding: .3rem .75rem; font-size: .78rem; color: var(--forest);
    }
    .pp-filter-tag button {
      background: none; border: none; cursor: pointer;
      color: var(--muted); display: flex; padding: 0;
      transition: color .2s;
    }
    .pp-filter-tag button:hover { color: var(--terracotta); }
    .pp-clear-all {
      background: none; border: none; cursor: pointer;
      font-size: .78rem; color: var(--terracotta); font-weight: 500;
      padding: 0; transition: opacity .2s;
    }
    .pp-clear-all:hover { opacity: .7; }

    /* ── Empty state ── */
    .pp-empty {
      text-align: center; padding: 6rem 2rem;
      animation: ppFadeUp .5s both;
    }
    .pp-empty-icon {
      width: 64px; height: 64px; border-radius: 50%;
      background: rgba(107,143,94,.1);
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 1.5rem; color: var(--sage);
    }
    .pp-empty-h2 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.75rem; font-weight: 400; color: var(--forest); margin-bottom: .5rem;
    }
    .pp-empty-p { font-size: .95rem; color: var(--muted); max-width: 360px; margin: 0 auto 1.5rem; line-height: 1.65; }
    .pp-empty-btn {
      background: var(--forest); color: var(--cream);
      border: none; border-radius: 100px;
      padding: .7rem 1.75rem; font-size: .88rem;
      font-family: 'DM Sans', sans-serif; cursor: pointer;
      transition: background .2s;
    }
    .pp-empty-btn:hover { background: var(--moss); }

    /* ── Footer count bar ── */
    .pp-footer-bar {
      border-top: 1px solid rgba(107,143,94,.15);
      margin-top: 2rem; padding-top: 2rem;
      display: flex; align-items: center; justify-content: space-between;
      flex-wrap: wrap; gap: 1rem;
    }
    .pp-footer-bar p { font-size: .85rem; color: var(--muted); }
    .pp-back-top {
      background: none; border: 1px solid rgba(107,143,94,.25);
      border-radius: 100px; padding: .45rem 1.1rem;
      font-size: .78rem; font-family: 'DM Sans', sans-serif;
      color: var(--moss); cursor: pointer; transition: background .2s;
    }
    .pp-back-top:hover { background: rgba(107,143,94,.08); }

    /* ── Animations ── */
    @keyframes ppFadeUp {
      from { opacity: 0; transform: translateY(18px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `}</style>
);

/* ─── Products Page ─────────────────────────────────────────────────── */
const Products = () => {
  const [search, setSearch]           = React.useState('');
  const [sortBy, setSortBy]           = React.useState('featured');
  const [activeCategory, setCategory] = React.useState('All');
  const [viewMode, setViewMode]       = React.useState('grid'); // 'grid' | 'list'

  const normalizedSearch = search.trim().toLowerCase();

  /* Build category list with "All" prepended */
  const allCategories = ['All', ...categories];

  /* Total matching plants across all categories */
  const totalMatching = React.useMemo(() => {
    return plants.filter(p => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch   = !normalizedSearch ||
        p.name.toLowerCase().includes(normalizedSearch) ||
        p.description.toLowerCase().includes(normalizedSearch);
      return matchesCategory && matchesSearch;
    }).length;
  }, [normalizedSearch, activeCategory]);

  /* Sort helper */
  const sortPlants = (arr) => {
    const sorted = [...arr];
    if (sortBy === 'price-asc')  sorted.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') sorted.sort((a, b) => b.price - a.price);
    if (sortBy === 'name-asc')   sorted.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
    return sorted;
  };

  const clearFilters = () => { setSearch(''); setCategory('All'); setSortBy('featured'); };
  const hasFilters   = normalizedSearch || activeCategory !== 'All' || sortBy !== 'featured';

  /* stagger index counter across all visible cards */
  let globalIndex = 0;

  /* Which categories to render */
  const categoriesToRender = activeCategory === 'All' ? categories : [activeCategory];

  return (
    <div className="pp-root">
      <GlobalStyles />
      <Header />

      {/* ── Banner ─────────────────────────────────── */}
      <div className="pp-banner">
        <div className="pp-banner-inner">
          <div className="pp-banner-left">
            <div className="pp-banner-eyebrow">
              <Leaf size={12} />
              Hand-picked collection
            </div>
            <h1 className="pp-banner-h1">
              Our plant<br /><em>collection</em>
            </h1>
            <p className="pp-banner-sub">
              Every plant is individually selected for health and beauty before it reaches your door.
            </p>
          </div>
          <div className="pp-banner-count">
            <div className="pp-banner-count-num">{plants.length}+</div>
            <div className="pp-banner-count-label">Varieties available</div>
          </div>
        </div>
      </div>

      {/* ── Sticky Controls ────────────────────────── */}
      <div className="pp-controls">
        <div className="pp-controls-inner">

          {/* Search */}
          <div className="pp-search-wrap">
            <Search className="pp-search-icon" size={15} />
            <input
              type="text"
              placeholder="Search plants…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pp-search"
            />
            {search && (
              <button className="pp-search-clear" onClick={() => setSearch('')} aria-label="Clear search">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Category pills */}
          <div className="pp-pills">
            {allCategories.map(cat => (
              <button
                key={cat}
                className={`pp-pill${activeCategory === cat ? ' active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="pp-sort-wrap">
            <ChevronDown className="pp-sort-icon" size={14} />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="pp-sort"
              aria-label="Sort plants"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="name-asc">Name: A → Z</option>
            </select>
          </div>

          {/* View toggle */}
          <div className="pp-view-toggle">
            <button
              className={`pp-view-btn${viewMode === 'grid' ? ' active' : ''}`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
            >
              <Grid3X3 size={15} />
            </button>
            <button
              className={`pp-view-btn${viewMode === 'list' ? ' active' : ''}`}
              onClick={() => setViewMode('list')}
              aria-label="List view"
            >
              <LayoutList size={15} />
            </button>
          </div>

        </div>
      </div>

      {/* ── Active filter tags ──────────────────────── */}
      {hasFilters && (
        <div className="pp-active-filters">
          {normalizedSearch && (
            <span className="pp-filter-tag">
              Search: "{search}"
              <button onClick={() => setSearch('')} aria-label="Remove search filter"><X size={11} /></button>
            </span>
          )}
          {activeCategory !== 'All' && (
            <span className="pp-filter-tag">
              {activeCategory}
              <button onClick={() => setCategory('All')} aria-label="Remove category filter"><X size={11} /></button>
            </span>
          )}
          {sortBy !== 'featured' && (
            <span className="pp-filter-tag">
              {sortBy === 'price-asc' ? 'Price ↑' : sortBy === 'price-desc' ? 'Price ↓' : 'A → Z'}
              <button onClick={() => setSortBy('featured')} aria-label="Remove sort filter"><X size={11} /></button>
            </span>
          )}
          <button className="pp-clear-all" onClick={clearFilters}>Clear all</button>
        </div>
      )}

      {/* ── Main content ───────────────────────────── */}
      <main className="pp-main">
        {totalMatching === 0 ? (
          /* Empty state */
          <div className="pp-empty">
            <div className="pp-empty-icon">
              <Leaf size={28} />
            </div>
            <h2 className="pp-empty-h2">No plants found</h2>
            <p className="pp-empty-p">
              Nothing matched your filters. Try a different search term or browse all categories.
            </p>
            <button className="pp-empty-btn" onClick={clearFilters}>
              Clear filters
            </button>
          </div>
        ) : (
          <>
            {categoriesToRender.map((category, catIdx) => {
              /* Filter within this category */
              let filtered = plants.filter(p => p.category === category);

              if (normalizedSearch) {
                filtered = filtered.filter(p =>
                  p.name.toLowerCase().includes(normalizedSearch) ||
                  p.description.toLowerCase().includes(normalizedSearch)
                );
              }

              if (filtered.length === 0) return null;

              const sorted = sortPlants(filtered);

              return (
                <section key={category} className="pp-category">
                  {/* Category header */}
                  <div
                    className="pp-category-header"
                    style={{ animationDelay: `${catIdx * 0.08}s` }}
                  >
                    <h2 className="pp-category-label">{category}</h2>
                    <div className="pp-category-line" />
                    <span className="pp-category-count">
                      {sorted.length} {sorted.length === 1 ? 'plant' : 'plants'}
                    </span>
                  </div>

                  {/* Products grid */}
                  <div className={`pp-grid${viewMode === 'list' ? ' list-view' : ''}`}>
                    {sorted.map(plant => {
                      const idx = globalIndex++;
                      return (
                        <div
                          key={plant.id}
                          className="pp-card-wrap"
                          style={{ animationDelay: `${idx * 0.05}s` }}
                        >
                          <ProductCard plant={plant} index={idx} />
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}

            {/* Footer count bar */}
            <div className="pp-footer-bar">
              <p>
                Showing <strong>{totalMatching}</strong> {totalMatching === 1 ? 'plant' : 'plants'}
                {activeCategory !== 'All' ? ` in ${activeCategory}` : ' across all categories'}
              </p>
              <button
                className="pp-back-top"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                ↑ Back to top
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Products;