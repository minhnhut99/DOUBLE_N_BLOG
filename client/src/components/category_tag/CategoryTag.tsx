import React from 'react';
import './CategoryTag.scss';
import { useGetAllCategoryQuery } from '@/api/category';
import { NavLink } from 'react-router-dom';
const CategoryTag = () => {
  const getAllCategory = useGetAllCategoryQuery();
  console.log(getAllCategory.data);
  return (
    <div className="category-tag">
      <div className="container">
        <ul className="tag-list">
          {getAllCategory.data?.map((tag, idx) => (
            <li key={idx}>
              <NavLink to="">{tag.c_name}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryTag;
