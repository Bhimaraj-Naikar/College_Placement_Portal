import beach from "../../assets/beach.jpeg"; // use a local beach image or set default
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStudentProfile } from "../../hooks/useStudentProfile";
import {
  Card,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Skeleton,
} from "../ui"; // adjust path as needed

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useStudentProfile();

  const [tab, setTab] = useState("academic");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => setMobileSidebarOpen((prev) => !prev);

  useEffect(() => {
    if (!isLoading && (!data || error?.response?.status === 404)) {
      navigate("/createProfile", { replace: true });
    }
  }, [isLoading, data, error, navigate]);

  if (isLoading || (!data && !isError)) {
    return (
      <div className="p-8">
        <Skeleton className="h-56 w-full mb-6" />
        <Skeleton className="h-6 w-1/2 mb-4" />
        <Skeleton className="h-6 w-1/3 mb-4" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8">
        <h2 className="text-red-600 text-lg font-semibold mb-4">
          Error loading profile
        </h2>
        <p className="text-gray-600">
          {error?.response?.data?.message || "An unexpected error occurred."}
        </p>
      </div>
    );
  }

  const student = data;

  return (
    <div>
      {/* Optional Sidebar can go here */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <Card className="w-full mx-auto shadow-lg relative mb-8">
          <div
            className="w-full h-32 md:h-40 rounded-t-lg"
            style={{
              backgroundImage: `url(${beach})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="flex flex-col md:flex-row items-center md:items-start px-6 pb-6 -mt-12 gap-4 md:gap-8">
            <div className="flex-shrink-0">
              <Avatar className="w-24 h-24 border-4 border-white shadow-md bg-white">
                <AvatarImage
                  src={
                    student.profilePhotoUrl ||
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=student"
                  }
                  alt="Profile"
                />
                <AvatarFallback>
                  {student.firstName?.[0]}
                  {student.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1 text-center md:text-left mt-5">
              <h2 className="pb-2 text-2xl font-semibold text-gray-800 mt-2 md:mt-4">
                {student?.firstName} {student?.lastName}
              </h2>
              <p className="text-sm pb-2 text-gray-600">{student.email}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1 text-sm mt-1 text-gray-700">
                <div>
                  <span className="font-medium">USN:</span> {student?.usn}
                </div>
                <div>
                  <span className="font-medium">Degree:</span> {student?.degree}
                </div>
                <div>
                  <span className="font-medium">Branch:</span> {student?.branch}
                </div>
                <div>
                  <span className="font-medium">CGPA:</span>{" "}
                  {student.currentCGPA}
                </div>
                <div>
                  <span className="font-medium">Batch:</span>{" "}
                  {student.ugYearOfPassing}
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger className="cursor-pointer" value="academic">
              Academic Info
            </TabsTrigger>
            <TabsTrigger value="additional" className="cursor-pointer">
              Additional Info
            </TabsTrigger>
          </TabsList>

          <TabsContent value="academic">
            <SectionTitle>Academic Information</SectionTitle>
            <div className="w-full border rounded-md divide-y text-sm overflow-hidden">
              <TableRow label="Branch" value={student.branch} />
              <TableRow label="Semester" value={student.currentSemester} />
              <TableRow label="CGPA" value={student.currentCGPA} />
              <TableRow label="10th Marks" value={student.tenthMarks} />
              <TableRow label="12th Marks" value={student.twelfthMarks} />
              <TableRow label="Diploma Marks" value={student.diplomaMarks} />
              <TableRow
                label="Academic Gap Years"
                value={student.academicGapYears}
              />
              <TableRow
                label="Active Backlogs"
                value={student.activeBacklogs}
              />
              <TableRow
                label="Total Backlogs Cleared"
                value={student.totalBacklogsCleared}
              />
            </div>
          </TabsContent>

          <TabsContent value="additional">
            <SectionTitle>Additional Information</SectionTitle>
            <div className="w-full border rounded-md divide-y text-sm overflow-hidden">
              <TableRow
                label="Languages Known"
                value={student.languagesKnown?.join(", ")}
              />
              <TableRow
                label="Foreign Languages"
                value={student.foreignLanguagesKnown?.join(", ")}
              />
              <TableRow
                label="Permanent Address"
                value={student.permanentAddress}
              />
              <TableRow
                label="Current Address"
                value={student.currentAddress}
              />
              <TableRow label="Native City" value={student.nativeCity} />
              <TableRow label="Native State" value={student.nativeState} />
              <TableRow label="PAN Number" value={student.panNumber} />
              <TableRow label="Aadhaar Number" value={student.aadhaarNumber} />
              <TableRow
                label="Interested in Placement"
                value={student.interestedInPlacement ? "Yes" : "No"}
              />
              <TableRow
                label="OK for Shifts"
                value={student.okForShifts ? "Yes" : "No"}
              />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function TableRow({ label, value }) {
  return (
    <div className="flex px-4 py-2 bg-white hover:bg-gray-50">
      <span className="text-gray-700 font-medium flex-1 text-left">
        {label}
      </span>
      <span className="text-gray-600 flex-1 text-left break-words">
        {value !== undefined && value !== "" ? value : "-"}
      </span>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <div className="font-semibold text-blue-700 mb-2 mt-1 text-base">
      {children}
    </div>
  );
}
