import React from 'react';
import DataTable from '../common/DataTable';
import { employees } from '../../data/mockData';
import { Plus, UserCheck, Calendar, Phone } from 'lucide-react';

export default function HR() {
  const columns = [
    { key: 'name', label: 'Employee Name', sortable: true },
    { key: 'position', label: 'Position', sortable: true },
    { key: 'department', label: 'Department', sortable: true },
    { 
      key: 'email', 
      label: 'Email', 
      sortable: true,
      render: (value: string) => (
        <a href={`mailto:${value}`} className="text-blue-600 hover:underline">
          {value}
        </a>
      )
    },
    { 
      key: 'phone', 
      label: 'Phone', 
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center">
          <Phone className="h-4 w-4 text-gray-400 mr-2" />
          {value}
        </div>
      )
    },
    { key: 'hireDate', label: 'Hire Date', sortable: true },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true,
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
          value === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    }
  ];

  const activeEmployees = employees.filter(emp => emp.status === 'active').length;
  const departments = [...new Set(employees.map(emp => emp.department))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Human Resources</h2>
          <p className="text-gray-600 mt-1">Manage employee information and attendance</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          Add Employee
        </button>
      </div>

      {/* HR Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <UserCheck className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{employees.length}</div>
              <div className="text-sm text-gray-600">Total Employees</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-green-600">{activeEmployees}</div>
          <div className="text-sm text-gray-600">Active Employees</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-purple-600">{departments.length}</div>
          <div className="text-sm text-gray-600">Departments</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-yellow-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-yellow-600">95%</div>
              <div className="text-sm text-gray-600">Attendance Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Department Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Department Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {departments.map((department) => {
            const deptEmployees = employees.filter(emp => emp.department === department);
            return (
              <div key={department} className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">{department}</h4>
                <div className="text-2xl font-bold text-blue-600 mb-1">{deptEmployees.length}</div>
                <div className="text-sm text-gray-600">Employees</div>
                <div className="mt-2">
                  {deptEmployees.slice(0, 3).map((emp) => (
                    <div key={emp.id} className="text-xs text-gray-500">
                      {emp.name} - {emp.position}
                    </div>
                  ))}
                  {deptEmployees.length > 3 && (
                    <div className="text-xs text-gray-400">
                      +{deptEmployees.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <DataTable 
        data={employees} 
        columns={columns} 
        searchable={true}
        pagination={true}
        pageSize={10}
      />
    </div>
  );
}