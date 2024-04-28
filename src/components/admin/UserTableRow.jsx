import React from "react";
import axiosClient from "../../api/axiosClient";

//importing icons
import { UserIcon } from "../../assets/icons/Icons";

export default function UserTableRow({ student, activity }) {
  const updateUserPaymentStatus = async (newPaymentStatus) => {
    try {
      const response = await axiosClient.put(
        `activities/admin/${activity._id}/payment`,
        {
          user_id: student.user._id,
          paymentStatus: newPaymentStatus,
        }
      );
      console.log("Payment status updated", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <tr>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              {student.user?.image ? (
                <img src={student.user.image.url} alt="user" />
              ) : (
                <UserIcon />
              )}
            </div>
          </div>
          <div>
            <div className="font-bold">{student.user.firstName}</div>{" "}
            <div className="text-sm opacity-50">{student.user.lastName}</div>{" "}
          </div>
        </div>
      </td>
      <td>{student.paymentStatus}</td>
      <td>
        {student.paymentStatus === "trial" ? (
          <div className="badge badge-success">Probetraining</div>
        ) : (
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn m-1">
              Zahlung verwalten
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                {/* this must have the payment status value paid card */}
                <a
                  onClick={() => updateUserPaymentStatus("paid card")}
                  role="button"
                  tabIndex={0}
                >
                  mit Karte gezahlt
                </a>
              </li>
              <li>
                {/* this must have the payment status value paid cash */}
                <a
                  onClick={() => updateUserPaymentStatus("paid cash")}
                  role="button"
                  tabIndex={0}
                >
                  Bar gezahlt
                </a>
              </li>
              <li>
                {/* this must have the payment status value paid cash */}
                <a
                  onClick={() =>
                    updateUserPaymentStatus("paid paid membership")
                  }
                  role="button"
                  tabIndex={0}
                >
                  mit 10er Karte gezahlt
                </a>
              </li>
            </ul>
          </div>
        )}
      </td>
    </tr>
  );
}
