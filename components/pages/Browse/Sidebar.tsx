import { useEffect, useState } from 'react';
import SidebarCategory from './SidebarCategory';

interface Props {
  onChange: (categories: string[]) => void;
}

const Sidebar: React.FC<Props>  = ({onChange}) => {
  const [categories, setCategories] = useState<string[]>([]);

  const handleCategoryChange = (category: string) => {
    if(categories.includes(category)) {
      setCategories(categories.filter((c) => c !== category));
    } else {
      setCategories([...categories, category]);
    }
  };
  useEffect(() => {
    onChange(categories);
  }, [categories, onChange]);

  
  return (
    <div className="hidden w-1/5 h-auto px-4 shadow-xl md:block bg-recandy-white-0">
      <div className="mt-4">
        <h6 className="text-xl font-medium text-recandy-black-700">
          Filter by
        </h6>
      </div>

      <SidebarCategory
        title="Language"
        categories={['JavaScript', 'Rust', 'PHP', 'Kotlin']}
        onClick={handleCategoryChange}
      />

      <SidebarCategory
        title="Database"
        categories={['MySQL', 'PostgreSQL', 'MongoDB', 'Redis']}
        onClick={handleCategoryChange}
      />

      <SidebarCategory
        title="Framework"
        categories={['Laravel', 'Nest.js', 'Next.js', 'Vue', 'React', 'Astro']}
        onClick={handleCategoryChange}
      />

      <SidebarCategory
        title="Architecture"
        categories={['Monorepo', 'Serverless', 'Microservices', 'Monolithic']}
        onClick={handleCategoryChange}
      />
    </div>
  );
};

export default Sidebar;
