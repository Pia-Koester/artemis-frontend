import React from "react";
//importing icons
import { UserIcon } from "../../assets/icons/Icons";

export default function UserTableRow({ student }) {
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
        <button className="btn btn-ghost btn-xs">Zahlung verwalten</button>
      </td>
    </tr>
  );
}
