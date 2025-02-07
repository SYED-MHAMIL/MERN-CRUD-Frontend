 import axios from 'axios';
import React, { useState } from 'react';
import { ApiRoutes } from '../app/constant/url';
import { toast } from 'react-toastify';
import Link from 'next/link'


export default function EditByAdmin({id}) {
  const [isModalOpen, setIsModalOpen] = useState(false);





  return (
    <>
      {/* Open Modal Button */}
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="py-2 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:bg-red-700 disabled:opacity-50 disabled:pointer-events-none"
      >
        delete
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          role="dialog"
          aria-labelledby="modal-title"
          aria-hidden="true"
        >
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
            {/* Modal Header */}
            <div className="flex justify-between items-center py-3 px-4 border-b">
              <h3 id="modal-title" className="font-bold text-gray-800">
                Delete
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4">
            <h3 className="font-bold text-gray-800">Are you sure you want to edit this user?</h3>
  <p className="text-gray-600 mt-2">
    This action cannot be undone. Once you delete this task, it will be permanently eedited from your list.
  </p>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
                

           <Link href={'/admin/edit-user'}><button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none"
              >
                Edit User
              </button></Link>

              <Link href={'/admin/edit-userHistory'}><button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 focus:outline-none"
                
              >
                Edit User History
              </button></Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
