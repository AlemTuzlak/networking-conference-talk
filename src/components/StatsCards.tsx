/**
 * Stats Cards Component
 */

export type Stats = {
  total: number;
  recent: number;
  categories: number;
};

export function StatsCards({ stats }: { stats: Stats }) {
  return (
    <div className="grid grid-cols-3 gap-3 mb-3">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
        <p className="text-gray-500 dark:text-gray-400 text-xs mb-0.5">Total</p>
        <p className="text-xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
        <p className="text-gray-500 dark:text-gray-400 text-xs mb-0.5">Recent</p>
        <p className="text-xl font-bold text-gray-900 dark:text-white">{stats.recent}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
        <p className="text-gray-500 dark:text-gray-400 text-xs mb-0.5">Categories</p>
        <p className="text-xl font-bold text-gray-900 dark:text-white">{stats.categories}</p>
      </div>
    </div>
  );
}
