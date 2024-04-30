import React from "react";
import axiosClient from "../../api/axiosClient";

//importing icons
import { UserIcon } from "../../assets/icons/Icons";

export default function UserTableRow({ student, activity, paymentStatus }) {
  const updateUserPaymentStatus = async (newPaymentStatus) => {
    try {
      const response = await axiosClient.put(
        `activities/admin/${activity._id}/payment`,
        {
          user_id: student._id,
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
              {student?.image ? (
                <img src={student.image.url} alt="user" />
              ) : (
                <UserIcon />
              )}
            </div>
          </div>
          <div>
            <div className="font-bold">{student.firstName}</div>{" "}
            <div className="text-sm opacity-50">{student.lastName}</div>{" "}
          </div>
        </div>
      </td>
      <td>{paymentStatus}</td>
      <td>
        {paymentStatus === "trial" ? (
          <div className="badge badge-success">Probetraining</div>
        ) : (
          <div className="dropdown z-20">
            <div tabIndex={0} role="button" className="btn m-1">
              Zahlung verwalten
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box "
            >
              <li>
                {/* this must have the payment status value paid card */}
                <a
                  onClick={() => updateUserPaymentStatus("paid card")}
                  role="button"
                  tabIndex={0}
                >
                  Karte
                </a>
              </li>
              <li>
                {/* this must have the payment status value paid cash */}
                <a
                  onClick={() => updateUserPaymentStatus("paid cash")}
                  role="button"
                  tabIndex={0}
                >
                  Bar
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
                  10er Karte
                </a>
              </li>
            </ul>
          </div>
        )}
      </td>
    </tr>
  );
}
