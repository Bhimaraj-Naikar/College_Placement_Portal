import { useState } from "react";
import { useDrives } from "../../hooks/useDrives";
import { Dialog, DialogPanel } from "@headlessui/react";

const Drives = () => {
  const { data, isLoading, isError, error } = useDrives();
  const [selectedDrive, setSelectedDrive] = useState(null);

  if (isLoading)
    return <div className="text-center py-10">Loading drives...</div>;
  if (isError)
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );
  if (!data || data.length === 0)
    return <div className="text-center">No drives available.</div>;

  return (
    <section className="px-4 md:px-12 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Eligible Drives
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((drive) => (
          <div
            key={drive._id}
            className="bg-white border border-gray-200 rounded-2xl shadow hover:shadow-lg transition duration-300 p-6 cursor-pointer"
            onClick={() => setSelectedDrive(drive)}
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
              {drive.driveDate && (
                <span className="bg-blue-100 px-2 py-0.5 rounded">
                  Drive: {new Date(drive.driveDate).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Drive Details */}
      <Dialog
        open={!!selectedDrive}
        onClose={() => setSelectedDrive(null)}
        className="fixed z-50 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen px-4">
          <DialogPanel className="bg-white rounded-xl max-w-3xl w-full p-6 shadow-xl relative">
            <button
              onClick={() => setSelectedDrive(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            {selectedDrive && (
              <div>
                <h3 className="text-2xl font-bold mb-2 text-indigo-700">
                  {selectedDrive.company}
                </h3>
                <h4 className="text-lg font-semibold mb-4">
                  {selectedDrive.driveName}
                </h4>
                <p className="mb-4 text-gray-700">
                  {selectedDrive.description}
                </p>

                <div className="mb-4">
                  <h5 className="font-semibold text-gray-800">Job Roles</h5>
                  <ul className="list-disc list-inside text-sm">
                    {selectedDrive.jobRoles.map((role) => (
                      <li key={role._id} className="mb-1">
                        <b>{role.roleName}</b> - {role.location},{" "}
                        {role.salaryPackage} LPA, Bond: {role.bond || "N/A"}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h5 className="font-semibold text-gray-800">Eligibility</h5>
                  <ul className="text-sm list-disc list-inside">
                    <li>CGPA: {selectedDrive.eligibilityCriteria.cgpa}+</li>
                    <li>
                      Branches:{" "}
                      {selectedDrive.eligibilityCriteria.branches.join(", ")}
                    </li>
                    <li>
                      Year:{" "}
                      {selectedDrive.eligibilityCriteria.yearOfPassing.join(
                        ", "
                      )}
                    </li>
                    <li>
                      Backlogs Allowed:{" "}
                      {selectedDrive.eligibilityCriteria.backlogsAllowed
                        ? "Yes"
                        : "No"}
                    </li>
                    <li>
                      Other: {selectedDrive.eligibilityCriteria.otherCriteria}
                    </li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h5 className="font-semibold text-gray-800">
                    Required Documents
                  </h5>
                  <ul className="list-disc list-inside text-sm">
                    {selectedDrive.requiredDocuments.map((doc, i) => (
                      <li key={i}>{doc}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>
                    Deadline:{" "}
                    {new Date(
                      selectedDrive.registrationDeadline
                    ).toLocaleDateString()}
                  </span>
                  <a
                    href={selectedDrive.applicationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            )}
          </DialogPanel>
        </div>
      </Dialog>
    </section>
  );
};

export default Drives;
