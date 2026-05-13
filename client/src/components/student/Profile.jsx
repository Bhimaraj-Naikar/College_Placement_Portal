import { useProfile } from "../../hooks/useProfile";

const Profile = () => {
  const { data, isLoading, isError, error } = useProfile();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  if (!data) {
    return <div>No profile data found.</div>;
  }
  const { firstName, email, profilePhotoUrl } = data;

  return (
    <>
      <div className="min-h-screen py-10 bg-white px-2 flex justify-center">
        <div className="w-full max-w-8xl bg-white p-8 md:p-12 ">
          {/* <!-- Header --> */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-10">
            {/* <!-- Avatar --> */}
            <div className="flex-shrink-0 flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-indigo-200 via-blue-200 to-cyan-200 shadow-lg border-4 border-white">
              <span className="text-4xl font-bold text-indigo-700">SC</span>
            </div>
            {/* <!-- Name & Basic Info --> */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-extrabold text-indigo-800 mb-1">
                {`${firstName} ${data.lastName} `}
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 text-gray-600 text-sm">
                <span className="inline-flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-indigo-400"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
                    <path d="M12 14c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4Z" />
                  </svg>{" "}
                  {`${data.branch}`}
                </span>
                <span className="inline-flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-indigo-400"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
                    <path d="M12 14c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4Z" />
                  </svg>{" "}
                  {`${data.usn}`}
                </span>
                <span className="inline-flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-indigo-400"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 10c0 4.418-4.03 8-9 8s-9-3.582-9-8a9 9 0 1 1 18 0Z" />
                  </svg>{" "}
                  {`${data.currentCGPA} CGPA`}
                </span>
              </div>
              <div className="mt-2 text-gray-500 text-sm">
                <span className="font-medium">Email:</span> {`${data.email}`}
              </div>
            </div>
          </div>

          {/* <!-- Divider --> */}
          <div className="border-b border-indigo-100 mb-8"></div>

          {/* <!-- Profile Sections --> */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* <!-- Personal Info Card --> */}
            <section className="bg-white rounded-2xl shadow p-6 flex flex-col gap-2 border-l-4 border-cyan-400">
              <h2 className="text-lg font-bold text-cyan-700 mb-2 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-cyan-400"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4m0 0V8m0 4h4m-4 0H8" />
                </svg>
                Personal Info
              </h2>
              <div className="text-gray-700 text-sm grid grid-cols-1 gap-y-1">
                <span>
                  <b>Gender:</b> {`${data.gender}`}
                </span>
                <span>
                  <b>DOB:</b> {`${data.dateOfBirth}`}
                </span>
                <span>
                  <b>Phone:</b> {`${data.phoneNumber}`}
                </span>
                <span>
                  <b>Branch:</b> {`${data.branch}`}
                </span>
                <span>
                  <b>Languages:</b> {`${data.languagesKnown}`}
                </span>
                <span>
                  <b>Foreign Languages:</b>{" "}
                  {data.foreignLanguagesKnown || "None"}
                </span>
                <span>
                  <b>Permanent Address:</b> {data.permanentAddress}
                </span>
                <span>
                  <b>Current Address:</b>{" "}
                  {data.currentAddress || "Same as Permanent"}
                </span>
                <span>
                  <b>Native:</b> {data.nativeCity}
                  {data.nativeState ? `, ${data.nativeState}` : ""}
                </span>
              </div>
            </section>
            {/* <!-- Academic Info Card --> */}
            <section className="bg-white rounded-2xl shadow p-6 flex flex-col gap-2 border-l-4 border-indigo-400">
              <h2 className="text-lg font-bold text-indigo-700 mb-2 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 20h9" />
                  <path d="M12 4v16m0 0C7.03 20 3 16.418 3 12a9 9 0 1 1 18 0c0 4.418-4.03 8-9 8Z" />
                </svg>
                Academic Info
              </h2>
              <div className="text-gray-700 text-sm grid grid-cols-1 gap-y-1">
                <span>
                  <b>Semester:</b> {data.currentSemester}
                </span>
                <span>
                  <b>CGPA:</b> {data.currentCGPA}
                </span>
                <span>
                  <b>10th:</b>
                  {data.tenthMarks},
                  {` (${data.tenthYearOfPassing}) ,(${data.tenthBoard})`}
                </span>
                <span>
                  <b>12th:</b> {data.twelfthMarks},
                  {` (${data.twelfthYearOfPassing}) ,(${data.twelfthBoard})`}
                </span>
                <span>
                  <b>Diploma:</b> {data.diplomaMarks || "N/A"},
                  {` (${data.diplomaYearOfPassing || "N/A"}) ,(${
                    data.diplomaBoard || "N/A"
                  })`}
                </span>
                <span>
                  <b>UG Year:</b> {data.ugYearOfPassing || "N/A"}
                </span>
                <span>
                  <b>UG Branch:</b>
                  {data.ugBranch || "N/A"}
                </span>
                <span>
                  <b>UG College:</b>
                  {data.ugCollegeName || "N/A"}
                </span>
                <span>
                  <b>UG University:</b>
                  {data.ugUniversityName || "N/A"}
                </span>
              </div>
            </section>
            {/* <!-- Gaps & Backlogs Card --> */}
            <section className="bg-white rounded-2xl shadow p-6 flex flex-col gap-2 border-l-4 border-pink-400">
              <h2 className="text-lg font-bold text-pink-700 mb-2 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-pink-400"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 8a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" />
                  <path d="M12 14v7" />
                </svg>
                Gaps & Backlogs
              </h2>
              <div className="text-gray-700 text-sm grid grid-cols-1 gap-y-1">
                <span>
                  <b>Academic Gaps:</b> {data.academicGapYears || "None"}
                </span>
                <span>
                  <b>Gap After 10th:</b> {data.yearGapAfter10th || "0"}
                </span>
                <span>
                  <b>Gap After 12th:</b> {data.yearGapAfter12th || "0"}
                </span>
                <span>
                  <b>Gap After UG:</b> {data.yearGapAfterUg || "0"}
                </span>
                <span>
                  <b>Active Backlogs:</b> 0
                </span>
                <span>
                  <b>Total Cleared:</b> 0
                </span>
                <span>
                  <b>History:</b> None
                </span>
              </div>
            </section>
            {/* <!-- Family Info Card --> */}
            <section className="bg-white rounded-2xl shadow p-6 flex flex-col gap-2 border-l-4 border-yellow-400">
              <h2 className="text-lg font-bold text-yellow-700 mb-2 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4m0 0V8m0 4h4m-4 0H8" />
                </svg>
                Family Info
              </h2>
              <div className="text-gray-700 text-sm grid grid-cols-1 gap-y-1">
                <span>
                  <b>Father:</b> Rajesh Sharma, Engineer, 9876543211,
                  rajesh.sharma@example.com
                </span>
                <span>
                  <b>Mother:</b> Sunita Sharma, Teacher, 9876543212
                </span>
              </div>
            </section>
            {/* <!-- Placement Info Card --> */}
            <section className="bg-white rounded-2xl shadow p-6 flex flex-col gap-2 border-l-4 border-green-400 md:col-span-2">
              <h2 className="text-lg font-bold text-green-700 mb-2 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
                Placement Info
              </h2>
              <div className="text-gray-700 text-sm grid grid-cols-1 md:grid-cols-2 gap-y-1">
                <span>
                  <b>Interested in Placement:</b> Yes
                </span>
                <span>
                  <b>Status:</b> Not Placed
                </span>
                <span>
                  <b>Company:</b>{" "}
                </span>
                <span>
                  <b>Role:</b>{" "}
                </span>
                <span>
                  <b>Skills:</b> JavaScript, React, Node.js
                </span>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
