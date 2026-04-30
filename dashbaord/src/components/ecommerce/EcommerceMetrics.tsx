import { BoxIconLine, GroupIcon } from "../../icons";

export default function DashboardCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-6">

      {/* Total Enquiries */}
      <div className="rounded-2xl border  hover:bg-orange-400 bg-orange-200 p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="mt-5">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Total Enquiries
          </span>
          <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            120
          </h4>
        </div>
      </div>

      {/* Pending Cases */}
      <div className="rounded-2xl border border-gray-200 bg-red-200 hover:bg-red-400 p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="mt-5">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Pending Cases
          </span>
          <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            45
          </h4>
        </div>
      </div>

      {/* Completed Cases */}
      <div className="rounded-2xl border border-gray-200 bg-green-200 hover:bg-green-400 p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="mt-5">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Completed Cases
          </span>
          <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            75
          </h4>
        </div>
      </div>

      {/* Total Officers */}
      <div className="rounded-2xl border border-gray-200 bg-blue-200 hover:bg-blue-300 p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="mt-5">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Total Officers
          </span>
          <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            25
          </h4>
        </div>
      </div>

    </div>
  );
}