import React from "react";
import { useAllDrives } from "../../hooks/useAllDrives";

const Eligible = () => {
  const { data, isLoading, isError, error } = useAllDrives();
  if (isLoading)
    return <div className="text-center py-10">Loading drives...</div>;
  if (isError)
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );
  if (!data || data.length === 0)
    return <div className="text-center">No drives available.</div>;

  return (
    <>
      <section className="px-4 md:px-12 py-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          All Drives
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((drive) => (
            <div
              key={drive._id}
              className="bg-white border border-gray-200 rounded-2xl shadow hover:shadow-lg transition duration-300 p-6 cursor-pointer"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg shadow">
                  {drive.company?.[0] || "🏢"}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {drive.company}
                  </h3>
                  <p className="text-sm text-gray-700">{drive.driveName}</p>
                </div>
              </div>

              <div className="text-sm text-gray-600 mb-4">
                <p>
                  <b>Role:</b> {drive.jobRoles?.[0]?.roleName || "N/A"}
                </p>
                <p>
                  <b>Package:</b> {drive.jobRoles?.[0]?.salaryPackage} LPA
                </p>
                <p>
                  <b>Location:</b> {drive.jobRoles?.[0]?.location}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                {drive.createdAt && (
                  <span className="bg-gray-100 px-2 py-0.5 rounded">
                    Posted: {new Date(drive.createdAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="text-center py-4">
        <p className="text-gray-500">
          Total Drives: <span className="font-semibold">{data.length}</span>
        </p>
      </div>
    </>
  );
};

export default Eligible;
