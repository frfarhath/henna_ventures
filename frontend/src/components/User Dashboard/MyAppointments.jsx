import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEye, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const UserAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }
  
        const config = {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        };
        const response = await axios.get(
          'http://localhost:8000/api/v1/individual/getUserAppointments',
          config
        );
  
        if (response.data?.appointments) {
          setAppointments(response.data.appointments);
          setError(null);
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setError(error.response?.data?.message || error.message);
        
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/signin');
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchAppointments();
    
    const interval = setInterval(() => {
      if (!localStorage.getItem('token')) {
        clearInterval(interval);
        return;
      }
      fetchAppointments();
    }, 30000);
  
    return () => clearInterval(interval);
  }, [navigate]);
  

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case 'ACCEPTED':
        return 'text-green-600';
      case 'DECLINED':
        return 'text-red-600';
      case 'COMPLETED':
        return 'text-blue-600';
      default:
        return 'text-yellow-600';
    }
  };

 
  const AppointmentModal = ({ appointment, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mx-4">
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <h3 className="text-2xl font-semibold text-[#804f0e]">Appointment Details</h3>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Close modal"
          >
            <FaTimes size={24} />
          </button>
        </div>
  
        <table className="min-w-full border border-[#804f0e]">
          <thead className="bg-[#f5f0eb]">
            <tr>
              <th className="py-3 px-4 text-left text-[#804f0e]">Detail</th>
              <th className="py-3 px-4 text-left text-[#804f0e]">Info</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="py-2 px-4 font-semibold">Date</td>
              <td className="py-2 px-4">{appointment.wedding}</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-semibold">Time</td>
              <td className="py-2 px-4">{appointment.time}</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-semibold">Client Name</td>
              <td className="py-2 px-4">{`${appointment.firstname || ''} ${appointment.lastname || ''}`.trim() || 'N/A'}</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-semibold">Status</td>
              <td className={`py-2 px-4 ${getStatusColor(appointment.status)}`}>{appointment.status}</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-semibold">Type</td>
              <td className="py-2 px-4">{appointment.appointment_type}</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-semibold">District</td>
              <td className="py-2 px-4">{appointment.district}</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-semibold">Address</td>
              <td className="py-2 px-4">
                {appointment.appointment_type === "individual"
                  ? [appointment.address1, appointment.address2, appointment.city].filter(Boolean).join(', ')
                  : appointment.address}
              </td>
            </tr>
            {appointment.appointment_type === "individual" && (
              <>
                <tr>
                  <td className="py-2 px-4 font-semibold">Mehendi Type</td>
                  <td className="py-2 px-4">{appointment.type_mehendi}</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 font-semibold">Mehendi For</td>
                  <td className="py-2 px-4">{appointment.mehendi_for}</td>
                </tr>
              </>
            )}
            {appointment.appointment_type === "package" && (
              <>
                <tr>
                  <td className="py-2 px-4 font-semibold">Package Type</td>
                  <td className="py-2 px-4">{appointment.package_type}</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 font-semibold">Design Coverage</td>
                  <td className="py-2 px-4">{appointment.design}</td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#804f0e]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-[#804f0e]">My Appointments</h2>
      
      {appointments.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No appointments found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg border border-[#804f0e]">
          <table className="min-w-full bg-white border border-[#804f0e] rounded-lg">
            <thead className="bg-[#f5f0eb]">
              <tr>
                <th className="py-3 px-6 text-[#804f0e] text-left">Date</th>
                <th className="py-3 px-6 text-[#804f0e] text-left">Time</th>
                <th className="py-3 px-6 text-[#804f0e] text-left">Status</th>
                <th className="py-3 px-6 text-[#804f0e] text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment._id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6 text-center">{appointment.wedding}</td>
                  <td className="py-4 px-6 text-center">{appointment.time}</td>
                  <td className={`py-4 px-6 text-center ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => {
                        setSelectedAppointment(appointment);
                        setShowModal(true);
                      }}
                      className="bg-[#804f0e] text-white py-2 px-4 rounded hover:bg-[#663b0b] transition-colors duration-300"
                      aria-label="View appointment details"
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && selectedAppointment && (
        <AppointmentModal
          appointment={selectedAppointment}
          onClose={() => {
            setShowModal(false);
            setSelectedAppointment(null);
          }}
        />
      )}
    </div>
  );
};

export default UserAppointments;
