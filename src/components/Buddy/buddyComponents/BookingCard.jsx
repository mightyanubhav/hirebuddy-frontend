import { backend_url } from "../../../context/HardCodedValues";
import { useAuth } from "../../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faMapMarkerAlt,
  faUser,
  faCheck,
  faTimes,
  faComment,
  faCommentDots,
  faClock,
  faCircle,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const BookingCard = ({ booking, onOpenChatTab }) => {
  const { user } = useAuth();

  const updateBookingStatus = async (status) => {
    try {
      const token = user?.token;
      const response = await fetch(
        `${backend_url}/buddy/booking/${booking._id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );
      if (response.ok) window.location.reload();
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-500 text-white";
      case "Pending":
        return "bg-yellow-500 text-white";
      case "Declined":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-sm mx-auto sm:mx-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-2 border-b border-gray-200 bg-gray-50 rounded-t-2xl gap-2 sm:gap-0">
        {/* Booking ID */}
        <div className="flex items-center gap-2">
          <FontAwesomeIcon
            icon={faCircle}
            className="text-green-500 text-xs animate-pulse"
          />
          <span className="text-sm font-medium text-gray-700">
            Booking #{booking._id?.slice(-6)}
          </span>
        </div>

        {/* Status Badge + Message Buttons */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          {(booking.status === "Confirmed" ||
            booking.status === "Declined" ||
            booking.status === "Pending") && (
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                booking.status
              )}`}
            >
              {booking.status}
            </span>
          )}

          <button
            onClick={() => {
              onOpenChatTab(booking._id, "history");
            }}
            className="p-1.5 bg-white border border-gray-300 hover:bg-blue-50 hover:border-blue-300 text-gray-600 hover:text-blue-600 rounded-md transition"
            title="Message History"
          >
            <FontAwesomeIcon icon={faComment} className="text-xs" />
          </button>

          <button
            onClick={() => {
              onOpenChatTab(booking._id, "live");
            }}
            className="p-1.5 bg-white border border-gray-300 hover:bg-purple-50 hover:border-purple-300 text-gray-600 hover:text-purple-600 rounded-md transition"
            title="Live Chat"
          >
            <FontAwesomeIcon icon={faCommentDots} className="text-xs" />
          </button>
        </div>
      </div>

      {/* Customer Info */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 m-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center">
            <FontAwesomeIcon icon={faUser} className="text-white text-sm" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">
              {booking.customer?.name || "Customer"}
            </h3>
            <div className="flex items-center gap-1 text-gray-600 mt-1">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-gray-400 text-xs flex-shrink-0"
              />
              <span className="text-xs truncate block">
                {booking.customer?.email || "No email"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 m-3">
        <div className="grid grid-cols-1 gap-2 text-sm">
          <div className="flex justify-between items-center text-gray-600">
            <div className="flex items-center gap-1">
              <FontAwesomeIcon
                icon={faCalendar}
                className="text-blue-500 w-3"
              />{" "}
              Date
            </div>
            <span className="font-medium text-gray-900">
              {new Date(booking.date).toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between items-center text-gray-600">
            <div className="flex items-center gap-1">
              <FontAwesomeIcon icon={faClock} className="text-purple-500 w-3" />{" "}
              Time
            </div>
            <span className="font-medium text-gray-900">
              {booking.time || "Flexible"}
            </span>
          </div>
          <div className="flex justify-between items-center text-gray-600">
            <div className="flex items-center gap-1">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="text-red-500 w-3"
              />{" "}
              Location
            </div>
            <span className="font-medium text-gray-900 truncate max-w-[120px]">
              {booking.location}
            </span>
          </div>
        </div>
      </div>

      {/* Service */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 m-3">
        <h4 className="text-sm font-medium text-gray-900 mb-1">Service</h4>
        <p className="text-gray-700 text-sm">{booking.serviceName}</p>
        {booking.serviceDescription && (
          <p className="text-gray-500 text-xs mt-1">
            {booking.serviceDescription}
          </p>
        )}
      </div>

      {/* Actions */}
      {(booking.status === "Pending" || booking.status === "Confirmed") && (
        <div className="flex gap-2 p-3 m-3 flex-wrap">
          {booking.status === "Pending" && (
            <>
              <button
                onClick={() => updateBookingStatus("Confirmed")}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm flex items-center justify-center gap-1"
              >
                <FontAwesomeIcon icon={faCheck} /> Accept
              </button>
              <button
                onClick={() => updateBookingStatus("Declined")}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-md text-sm flex items-center justify-center gap-1"
              >
                <FontAwesomeIcon icon={faTimes} /> Decline
              </button>
            </>
          )}
          {booking.status === "Confirmed" && (
            <button
              onClick={() => updateBookingStatus("Completed")}
              className="flex-1 bg-stone-600 hover:bg-stone-500 text-white py-2 rounded-md text-sm flex items-center justify-center gap-1"
            >
              <FontAwesomeIcon icon={faCheck} /> Mark as Completed
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingCard;
