import React from 'react';
import { Category } from '../types';

interface Props {
  categories: Category[];
  selectedCategories: number[];
  onCategoryChange: (categoryIds: number[]) => void;
}

function CategoryFilter({ categories, selectedCategories, onCategoryChange }: Props) {
  const handleToggle = (categoryId: number) => {
    const isSelected = selectedCategories.includes(categoryId);
    const updated = isSelected
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];
    onCategoryChange(updated);
  };

  return (
    <div
      style={{
        padding: '16px 20px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '1px solid #e0e0e0',
        backgroundColor: '#fff',
      }}
    >
      <span style={{ fontWeight: 700, fontSize: '14px', color: '#555', marginRight: '8px' }}>
        Filter by Category:
      </span>
      {categories.map((cat) => {
        const active = selectedCategories.includes(cat.id);
        return (
          <label
            key={cat.id}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '6px 16px',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 500,
              backgroundColor: active ? '#3b82f6' : '#f3f4f6',
              color: active ? '#fff' : '#374151',
              transition: 'background-color 0.2s, color 0.2s',
              border: active ? '1px solid #3b82f6' : '1px solid #d1d5db',
              userSelect: 'none',
            }}
          >
            <input
              type="checkbox"
              checked={active}
              onChange={() => handleToggle(cat.id)}
              style={{ display: 'none' }}
              aria-label={`Filter by ${cat.name}`}
            />
            {cat.name}
          </label>
        );
      })}
    </div>
  );
}

export default CategoryFilter;
