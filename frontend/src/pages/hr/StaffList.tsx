import React, { useEffect, useState } from 'react';
import apiClient from '../../api/apiClient';
import { useAuth } from '../../providers/AuthProvider';
import { Card } from '../../components/ui/card';

interface StaffUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

const StaffList: React.FC = () => {
  const { user } = useAuth();
  const [staff, setStaff] = useState<StaffUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const { data } = await apiClient.get('/hr/staff');
        setStaff(data);
      } catch (err: unknown) {
        if (typeof err === 'object' && err !== null && 'response' in err && (err as any).response?.data?.message) {
          setError((err as any).response.data.message);
        } else {
          setError('Failed to fetch staff');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchStaff();
  }, []);

  if (!user || (user.role !== 'HR' && user.role !== 'SuperAdmin' && user.role !== 'admin')) {
    return <div className="p-8 text-lg text-red-600">Access denied. Only HR or Admin can view staff list.</div>;
  }

  return (
    <div className="p-8">
      <Card className="max-w-3xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Staff Members</h2>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : staff.length === 0 ? (
          <div>No staff members found.</div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b p-2 text-left">Name</th>
                <th className="border-b p-2 text-left">Email</th>
                <th className="border-b p-2 text-left">Role</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((s) => (
                <tr key={s.id}>
                  <td className="border-b p-2">{s.name}</td>
                  <td className="border-b p-2">{s.email}</td>
                  <td className="border-b p-2">{s.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
};

export default StaffList;
