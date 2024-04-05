'use client';

import Link from "next/link";

const AdminMainPage = () => {

  return (
    <div className="m-3">
      <Link className="p-1 px-2 rounded shadow-md bg-blue-600 text-white" href="/system/admin/blog">Go to blog post creator</Link>
    </div>
  );
}

export default AdminMainPage;
