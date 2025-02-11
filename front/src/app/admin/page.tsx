"use client";

import AddAdmin from "./add-admin";
import AddCert from "./add-cert";

export default function Users() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Admin interface</h1>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
          <div className="flex flex-col h-full">
            <AddCert />
          </div>
          <div className="flex flex-col h-full">
            <AddAdmin />
          </div>
        </div>
      </div>
    </div>
  );
}
