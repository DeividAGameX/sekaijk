import {redirect} from "next/navigation";

function AdminPage() {
    return redirect("/dashboard/posts");
}

export default AdminPage;
