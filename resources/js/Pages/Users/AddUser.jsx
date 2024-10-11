import Modal from "@/Components/Modal";
import { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { Toast, ToastModal } from "@/Toast";
import Select from "@/Components/Select";

export default function AddUser({ className = "", btnName, userTypes }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, errors, processing, reset } = useForm({
        name: "",
        email: "",
        // password: "",
        userTypeId: "",
    });

    const modalOpen = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const submit = (e) => {
        e.preventDefault();

        ToastModal("Add this user", "Create").then((result) => {
            if (result.isConfirmed) {
                post(route("user.create"), {
                    onSuccess: () => {
                        reset();
                        closeModal();
                        Toast.fire({
                            icon: "success",
                            title: "Signed in successfully",
                        });
                    },
                });
            }
        });

        // put(route("dashboard.update", [user.id]), {
        //     onSuccess: () => {
        //         reset(); // Reset form data
        //         alert("User updated successfully!"); // Consider using a notification system
        //         closeModal(); // Close the modal after successful update
        //     },
        //     onError: (errors) => {
        //         console.error(errors); // Log errors for debugging
        //     },
        // });
    };

    return (
        <section>
            <div className="py-2">
                <button onClick={modalOpen} className={className}>
                    {btnName}
                </button>
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
                                    Add new user
                                </h2>
                                <button
                                    type="button"
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

                        <div className="col-md-12 px-4">
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
                        </div>

                        <div className="col-md-12 px-4 p-3">
                            <Select
                                options={userTypes}
                                onChange={(e) =>
                                    setData("userTypeId", e.target.value)
                                }
                                value={data.userTypeId}
                                placeholder="Select a user type"
                            />
                        </div>
                        <div className="col-md-12 px-4">
                            <div className="d-flex justify-content-around py-3">
                                <SecondaryButton
                                    className="btn btn-secondary"
                                    onClick={closeModal}
                                >
                                    Close
                                </SecondaryButton>
                                {/* <div className="mx-auto"> */}
                                <PrimaryButton
                                    type="submit"
                                    disabled={processing}
                                >
                                    {" "}
                                    {/* Disable button during processing */}
                                    Submit
                                </PrimaryButton>
                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
