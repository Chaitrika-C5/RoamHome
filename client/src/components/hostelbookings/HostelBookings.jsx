import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { hostelLoginContext } from '../../contexts/hostelLoginContext';
import './HostelBookings.css';
import { PropertyContext } from '../../contexts/PropertyContext';

function HostelBookings() {
  const [bookingDetails, setBookingDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const { currentHostelMgmt, hostelAdmins } = useContext(hostelLoginContext);
  const currentHostelMgmtId = currentHostelMgmt ? currentHostelMgmt.id : null;
  const currentHostelMgmtEmail = currentHostelMgmt ? currentHostelMgmt.email : null;

  const fetchBookingDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/hostelMgmt-Api/hostelAdmins/${currentHostelMgmt.username}`);
      if (!response.ok) {
        throw new Error('Failed to fetch hostels');
      }
      const data = await response.json();
    

      const user = hostelAdmins.find(user => user.email === currentHostelMgmtEmail);
      if (user) {
        const bookingDetails = user.hostelBookingDetails;
        setBookingDetails(bookingDetails);
      } else {
        console.error('Hostel not found');
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleViewApplication = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedBooking(null);
  };

  useEffect(() => {
    fetchBookingDetails();
  }, []);

  return (
    <div>
      <h1 className='text-center mt-4'>Hostel Booking Details</h1>
      <table className="booking-table">
        <thead>
          <tr>
            <th>Serial No.</th>
            <th>Applicant Name</th>
            <th>Contact Details</th>
            <th>Hostel name</th>
            <th>Application form</th>
            
          </tr>
        </thead>
        <tbody>
          {bookingDetails.map((booking, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{booking.fullName}</td>
              <td>{booking.primaryPhone} , {booking.altPhone}</td>
              <td>{booking.hostelName}</td>
              <td>
              <div className='btn30 text-center'>
                <button onClick={() => handleViewApplication(booking)} className='btn20 p-2'>View Application</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Booking Details</h5>
                <button type="button" className="btn-close" onClick={handleClose}></button>
              </div>
              <div className="modal-body">
                {selectedBooking && (
                  <div>
                    <p><strong>Full Name:</strong> {selectedBooking.fullName}</p>
                    <p><strong>Email:</strong> {selectedBooking.email}</p>
                    <p><strong>Primary Phone:</strong> {selectedBooking.primaryPhone}</p>
                    <p><strong>Alternate Phone:</strong> {selectedBooking.altPhone}</p>
                    <p><strong>DOB:</strong> {selectedBooking.dob}</p>
                    <p><strong>Gender:</strong> {selectedBooking.gender}</p>
                    <p><strong>Profile:</strong> {selectedBooking.prof}</p>
                    <p><strong>Hostel Name:</strong> {selectedBooking.hostelName}</p>
                    <p><strong>Room Type:</strong> {selectedBooking.roomType}</p>
                    <p><strong>Address:</strong> {selectedBooking.address}</p>
                    <p><strong>Guardian Name:</strong> {selectedBooking.guardianName}</p>
                    <p><strong>Guardian Phone:</strong> {selectedBooking.guardianPhone}</p>
                    <p><strong>Stay:</strong> {selectedBooking.stay}</p>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HostelBookings;