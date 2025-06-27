import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { useToast } from "../../components/ui/useToast";
import {
  useAddAdvance,
  useAddAttendance,
  useAddEmployee,
  useGetAdvances,
  useGetAttendance,
  useGetEmployees,
} from "../../hooks/useHR";

const HR = () => {
  const toast = useToast();
  // Employees
  const {
    data: employees,
    isLoading: loadingEmp,
    isError: errorEmp,
  } = useGetEmployees();
  const addEmployee = useAddEmployee();
  const [empForm, setEmpForm] = useState({ name: "", email: "", role: "" });
  const [showEmpForm, setShowEmpForm] = useState(false);
  // Attendance
  const {
    data: attendance,
    isLoading: loadingAtt,
    isError: errorAtt,
  } = useGetAttendance();
  const addAttendance = useAddAttendance();
  const [attForm, setAttForm] = useState({
    employeeId: "",
    date: "",
    status: "Present",
  });
  const [showAttForm, setShowAttForm] = useState(false);
  // Advances
  const {
    data: advances,
    isLoading: loadingAdv,
    isError: errorAdv,
  } = useGetAdvances();
  const addAdvance = useAddAdvance();
  const [advForm, setAdvForm] = useState({
    employeeId: "",
    amount: 0,
    date: "",
  });
  const [showAdvForm, setShowAdvForm] = useState(false);

  // Handlers for forms
  const handleEmpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEmployee.mutate(empForm, {
      onSuccess: () => {
        setShowEmpForm(false);
        setEmpForm({ name: "", email: "", role: "" });
        toast("Employee added", "success");
      },
      onError: () => toast("Failed to add employee", "error"),
    });
  };
  const handleAttSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAttendance.mutate(attForm, {
      onSuccess: () => {
        setShowAttForm(false);
        setAttForm({ employeeId: "", date: "", status: "Present" });
        toast("Attendance marked", "success");
      },
      onError: () => toast("Failed to mark attendance", "error"),
    });
  };
  const handleAdvSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAdvance.mutate(advForm, {
      onSuccess: () => {
        setShowAdvForm(false);
        setAdvForm({ employeeId: "", amount: 0, date: "" });
        toast("Advance added", "success");
      },
      onError: () => toast("Failed to add advance", "error"),
    });
  };

  return (
    <Tabs defaultValue="employees" className="w-full">
      <TabsList>
        <TabsTrigger value="employees">Employees</TabsTrigger>
        <TabsTrigger value="attendance">Attendance</TabsTrigger>
        <TabsTrigger value="advances">Salary Advances</TabsTrigger>
      </TabsList>
      {/* Employees Tab */}
      <TabsContent value="employees">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Employees</h2>
          <Button onClick={() => setShowEmpForm(true)}>Add Employee</Button>
        </div>
        {showEmpForm && (
          <Card className="mb-6 p-6 max-w-xl">
            <form onSubmit={handleEmpSubmit} className="space-y-4">
              <div className="flex gap-4 flex-wrap">
                <Input
                  name="name"
                  label="Name"
                  placeholder="Name"
                  value={empForm.name}
                  onChange={(e) =>
                    setEmpForm({ ...empForm, name: e.target.value })
                  }
                  required
                  className="flex-1"
                />
                <Input
                  name="email"
                  label="Email"
                  placeholder="Email"
                  value={empForm.email}
                  onChange={(e) =>
                    setEmpForm({ ...empForm, email: e.target.value })
                  }
                  required
                  className="flex-1"
                />
                <Input
                  name="role"
                  label="Role"
                  placeholder="Role"
                  value={empForm.role}
                  onChange={(e) =>
                    setEmpForm({ ...empForm, role: e.target.value })
                  }
                  required
                  className="flex-1"
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">Save</Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowEmpForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}
        <Card className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Role</th>
              </tr>
            </thead>
            <tbody>
              {employees?.map((emp: any) => (
                <tr key={emp.id}>
                  <td className="p-2">{emp.name}</td>
                  <td className="p-2">{emp.email}</td>
                  <td className="p-2">{emp.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </TabsContent>
      {/* Attendance Tab */}
      <TabsContent value="attendance">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Attendance</h2>
          <Button onClick={() => setShowAttForm(true)}>Mark Attendance</Button>
        </div>
        {showAttForm && (
          <Card className="mb-6 p-6 max-w-xl">
            <form onSubmit={handleAttSubmit} className="space-y-4">
              <div className="flex gap-4 flex-wrap">
                <Input
                  name="employeeId"
                  label="Employee ID"
                  placeholder="Employee ID"
                  value={attForm.employeeId}
                  onChange={(e) =>
                    setAttForm({ ...attForm, employeeId: e.target.value })
                  }
                  required
                  className="flex-1"
                />
                <Input
                  name="date"
                  label="Date"
                  type="date"
                  value={attForm.date}
                  onChange={(e) =>
                    setAttForm({ ...attForm, date: e.target.value })
                  }
                  required
                  className="flex-1"
                />
                <Input
                  name="status"
                  label="Status"
                  value={attForm.status}
                  onChange={(e) =>
                    setAttForm({ ...attForm, status: e.target.value })
                  }
                  required
                  className="flex-1"
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </Input>
              </div>
              <div className="flex gap-2">
                <Button type="submit">Save</Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowAttForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}
        <Card className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="p-2 text-left">Employee ID</th>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance?.map((att: any) => (
                <tr key={att.id}>
                  <td className="p-2">{att.employeeId}</td>
                  <td className="p-2">{att.date}</td>
                  <td className="p-2">{att.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </TabsContent>
      {/* Advances Tab */}
      <TabsContent value="advances">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Salary Advances</h2>
          <Button onClick={() => setShowAdvForm(true)}>Add Advance</Button>
        </div>
        {showAdvForm && (
          <Card className="mb-6 p-6 max-w-xl">
            <form onSubmit={handleAdvSubmit} className="space-y-4">
              <div className="flex gap-4 flex-wrap">
                <Input
                  name="employeeId"
                  label="Employee ID"
                  placeholder="Employee ID"
                  value={advForm.employeeId}
                  onChange={(e) =>
                    setAdvForm({ ...advForm, employeeId: e.target.value })
                  }
                  required
                  className="flex-1"
                />
                <Input
                  name="amount"
                  label="Amount"
                  type="number"
                  placeholder="Amount"
                  value={advForm.amount}
                  onChange={(e) =>
                    setAdvForm({ ...advForm, amount: Number(e.target.value) })
                  }
                  required
                  className="flex-1"
                />
                <Input
                  name="date"
                  label="Date"
                  type="date"
                  value={advForm.date}
                  onChange={(e) =>
                    setAdvForm({ ...advForm, date: e.target.value })
                  }
                  required
                  className="flex-1"
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">Save</Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowAdvForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}
        <Card className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="p-2 text-left">Employee ID</th>
                <th className="p-2 text-left">Amount</th>
                <th className="p-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {advances?.map((adv: any) => (
                <tr key={adv.id}>
                  <td className="p-2">{adv.employeeId}</td>
                  <td className="p-2">{adv.amount}</td>
                  <td className="p-2">{adv.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default HR;
