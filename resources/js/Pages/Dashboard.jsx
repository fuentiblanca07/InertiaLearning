import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Card from "@/Components/Card";
// import { , usePage } from "@inertiajs/react"
import { Link, Head } from "@inertiajs/react";

export default function Dashboard({ userCount }) {
    return (
        <AuthenticatedLayout
        // header={
        //     <h4 className="text-lg font-semibold leading-tight text-gray-800">
        //         Dashboard
        //     </h4>
        // }
        >
            <Head title="Dashboard" />

            <div className="container p-2">
                <div className="row">
                    <div className="col-md-4">
                        <Card className="bg-info">
                            <div className="d-flex justify-content-between p-2">
                                <h2 className="text-lg font-semibold">
                                    <i class="fa-solid fa-user fa-beat-fade"></i>
                                    &nbsp; Users
                                </h2>
                                {/* <a
                                    href={route("userList")}
                                    className="btn btn-primary"
                                ></a> */}
                                <h1>{userCount}</h1>
                            </div>
                            <p className="text-gray-600">
                                This is some content inside the card.
                            </p>
                        </Card>
                    </div>
                    <div className="col-md-4">
                        <Card>
                            <h2 className="text-lg font-semibold">
                                Card Title
                            </h2>
                            <p className="text-gray-600">
                                This is some content inside the card.
                            </p>
                            <button className="btn btn-primary">View</button>
                        </Card>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
