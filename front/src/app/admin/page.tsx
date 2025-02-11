import AddAdmin from "./add-admin";
import AddCert from "./add-cert";
import AdminTitle from "./title";

export default function Admin() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="container mx-auto py-8">
        <AdminTitle />
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
