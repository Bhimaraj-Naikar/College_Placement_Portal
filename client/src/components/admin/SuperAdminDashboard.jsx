import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const SuperAdminDashboard = () => {
  const [searchUsn, setSearchUsn] = useState("");
  const [searchAdmin, setSearchAdmin] = useState("");

  const { data: students } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const res = await axios.get("/api/superadmin/students");
      return res.data;
    },
  });

  const { data: admins } = useQuery({
    queryKey: ["admins"],
    queryFn: async () => {
      const res = await axios.get("/api/superadmin/admins");
      return res.data;
    },
  });

  const { data: drives } = useQuery({
    queryKey: ["drives"],
    queryFn: async () => {
      const res = await axios.get("/api/superadmin/drives");
      return res.data;
    },
  });

  const filteredStudents = students?.filter((student) =>
    student.usn.toLowerCase().includes(searchUsn.toLowerCase())
  );

  const filteredAdmins = admins?.filter((admin) =>
    admin.email.toLowerCase().includes(searchAdmin.toLowerCase())
  );

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold text-center text-blue-700">
        SuperAdmin Dashboard
      </h1>

      {/* Students Section */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Search Students by USN</h2>
        <input
          type="text"
          value={searchUsn}
          onChange={(e) => setSearchUsn(e.target.value)}
          placeholder="Enter USN"
          className="w-full max-w-md px-3 py-2 border rounded shadow-sm mb-4"
        />
        <ul className="space-y-2">
          {filteredStudents?.map((student) => (
            <li
              key={student._id}
              className="bg-white p-4 shadow rounded border"
            >
              <p>
                <strong>USN:</strong> {student.usn}
              </p>
              <p>
                <strong>Name:</strong> {student.name}
              </p>
              <p>
                <strong>Department:</strong> {student.department}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Admins Section */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Search Admins by Email</h2>
        <input
          type="text"
          value={searchAdmin}
          onChange={(e) => setSearchAdmin(e.target.value)}
          placeholder="Enter Admin Email"
          className="w-full max-w-md px-3 py-2 border rounded shadow-sm mb-4"
        />
        <ul className="space-y-2">
          {filteredAdmins?.map((admin) => (
            <li key={admin._id} className="bg-white p-4 shadow rounded border">
              <p>
                <strong>Email:</strong> {admin.email}
              </p>
              <p>
                <strong>Department:</strong> {admin.department}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Drives Section */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Drives Overview</h2>
        <ul className="space-y-2">
          {drives?.map((drive) => (
            <li key={drive._id} className="bg-white p-4 shadow rounded border">
              <p>
                <strong>Company:</strong> {drive.companyName}
              </p>
              <p>
                <strong>Status:</strong> {drive.status}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(drive.date).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
