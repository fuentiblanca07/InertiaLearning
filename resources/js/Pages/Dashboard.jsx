import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
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
                <div class="card">
                    <div class="card-body">
                        This is some text within a card body.
                    </div>
                </div>
           </div>
        </AuthenticatedLayout>
    );
}
