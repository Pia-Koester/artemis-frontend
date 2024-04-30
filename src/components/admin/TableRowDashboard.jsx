import React from "react";
import axiosClient from "../../api/axiosClient";
import { useEffect, useState } from "react";
import { format } from "date-fns";

//importing icons
import { UserIcon } from "../../assets/icons/Icons";

export default function TableRowDahboard({ student, pending }) {
  const [filteredMemberships, setFilteredMemberships] = useState([]);

  useEffect(() => {
    const memberships = student.activeMemberships.filter((membership) =>
      pending
        ? membership.membershipStatus === "payment pending"
        : membership.membershipStatus === "active"
    );
    setFilteredMemberships(memberships);
  }, [student.activeMemberships, pending]);

  const updateUserPaymentStatus = async (membershipId, newPaymentStatus) => {
    try {
      const response = await axiosClient.put(
        `usermemberships/admin/${membershipId}/payment`,
        {
          paymentStatus: newPaymentStatus,
        }
      );
      console.log("Payment status updated", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const formattedDOB = format(student.dateOfBirth, "dd.MM.yyyy");
  const formattedDOR = format(student.dateOfRegistration, "dd.MM.yyyy");

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
      <td>{student.email}</td>
      <td>
        <div>{student.address.street}</div>
        <div>
          {student.address.postalCode} {student.address.city}
        </div>
      </td>
      <td>{formattedDOB}</td>
      <td>{formattedDOR}</td>
      <td>
        {filteredMemberships.map((membership) => {
          return (
            <div
              className="flex flex-col w-full rounded-box m-2 "
              key={membership._id}
            >
              <div className="flex-grow rounded-box ">
                {format(membership.purchaseDate, "dd.MM.yyyy")}
              </div>

              <div className="flex-grow  bg-base-300 rounded-box z-20 ">
                {" "}
                <div className="dropdown">
                  <div tabIndex={0} role="button" className="btn m-1">
                    {membership.membershipPlan.title}
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box "
                  >
                    <li>
                      {/* this must have the payment status value paid card */}
                      <a
                        onClick={() =>
                          updateUserPaymentStatus(membership._id, "paid card")
                        }
                        role="button"
                        tabIndex={0}
                      >
                        Kartenzahlung
                      </a>
                    </li>
                    <li>
                      {/* this must have the payment status value paid cash */}
                      <a
                        onClick={() =>
                          updateUserPaymentStatus(membership._id, "paid cash")
                        }
                        role="button"
                        tabIndex={0}
                      >
                        Barzahlung
                      </a>
                    </li>
                  </ul>
                </div>
                <button
                  className="btn btn-ghost btn-xs"
                  key={membership._id}
                ></button>
              </div>
            </div>
          );
        })}
      </td>
    </tr>
  );
}
