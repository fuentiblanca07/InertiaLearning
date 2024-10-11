import Modal from "@/Components/Modal";
import { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";

export default function UpdateUser({ className = "", btnName, user }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    // console.log(user);
    const { data, setData, put, errors, processing, reset } = useForm({
        name: user.name,
        email: user.email,
    });

    const toggleModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const submit = (e) => {
        e.preventDefault();

        put(route("user.update", [user.id]), {
            onSuccess: () => {
                reset(); // Reset form data
                // alert("User updated successfully!"); // Consider using a notification system
                closeModal(); // Close the modal after successful update
            },
            onError: (errors) => {
                console.error(errors); // Log errors for debugging
            },
        });
    };

    return (
        <section>
            <div className="py-2">
                <a onClick={toggleModal} className={className}>
                    {btnName}
                </a>
            </div>

            <Modal show={isModalOpen}>
                <form onSubmit={submit} aria-labelledby="edit-user-modal">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="d-flex justify-content-center align-items-center position-relative">
                                <h2
                                    id="edit-user-modal"
                                    className="display-6 pt-3 mx-auto"
                                >
                                    Edit User
                                </h2>
                                <button
                                    onClick={closeModal}
                                    className="btn btn-link text-dark ms-auto fs-2 position-absolute end-0"
                                >
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                        </div>

                        <div className="col-md-12 px-4">
                            <InputLabel
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-900"
                                value="Name"
                            />
                            <TextInput
                                id="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="w-full"
                            />
                            <div>
                                {errors.name && (
                                    <div className="text-red-500">
                                        {errors.name}
                                    </div>
                                )}{" "}
                                {/* Error message */}
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-6  px-3 md:grid-cols-1">
                        <div>
                            <InputLabel value="Email" />
                            <TextInput
                                id="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className="w-full"
                            />
                            {errors.email && (
                                <div className="text-red-500">
                                    {errors.email}
                                </div>
                            )}{" "}
                            {/* Error message */}
                        </div>
                    </div>
                    <div className="d-flex justify-content-around py-3">
                        <SecondaryButton
                            className="btn btn-secondary"
                            onClick={closeModal}
                        >
                            Close
                        </SecondaryButton>
                        {/* <div className="mx-auto"> */}
                        <PrimaryButton type="submit" disabled={processing}>
                            {" "}
                            {/* Disable button during processing */}
                            Submit
                        </PrimaryButton>
                        {/* </div> */}
                    </div>
                </form>
            </Modal>
        </section>
    );
}
