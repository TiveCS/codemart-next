import SidebarCategory from './SidebarCategory';

const Sidebar: React.FC = () => {
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
      />

      <SidebarCategory
        title="Database"
        categories={['MySQL', 'PostgreSQL', 'MongoDB', 'Redis']}
      />

      <SidebarCategory
        title="Framework"
        categories={['Laravel', 'Nest.js', 'Next.js', 'Vue', 'React', 'Astro']}
      />

      <SidebarCategory
        title="Architecture"
        categories={['Monorepo', 'Serverless', 'Microservices', 'Monolithic']}
      />
    </div>
  );
};

export default Sidebar;
