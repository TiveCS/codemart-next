export interface Props {
  title: string;
  categories: string[];
}

const SidebarCategory: React.FC<Props> = ({ title, categories }) => {
  return (
    <div className="pt-4 mt-4 mb-8 border-t-2 border-r-recandy-gray-50">
      <h6>{title}</h6>

      <div className="flex flex-col mt-2 space-y-4">
        {categories.map((category) => {
          return (
            <label key={category} className="inline-flex items-center mt-3">
              <input
                type="checkbox"
                className="w-5 h-5 form-checkbox text-recandy-blue-500"
              />
              <span className="ml-2 text-sm text-recandy-black-700">
                {category}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarCategory;
