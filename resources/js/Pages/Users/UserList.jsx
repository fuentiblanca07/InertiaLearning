import { Head, Link, useForm } from "@inertiajs/react";
import Table from "@/Components/Table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import UpdateUser from "@/Pages/Users/UpdateUser";
import AddUser from "@/Pages/Users/AddUser";
import ButtonLayout from "@/Layouts/ButtonLayout";
import { Toast, ToastModal } from "@/Toast";
export default function UserList({ userList, userTypes }) {
    // const data = userList;

    const {
        data,
        setData,
        get,
        delete: destroy,
        processing,
        reset,
        error,
    } = useForm();

    const info = Array.isArray(userList.data)
        ? userList.data.map((user) => ({
              name: user.name,
              email: user.email,
              action: (
                  <ButtonLayout className="d-flex">
                      <button
                          className="btn btn-sm my-2 btn-link text-primary"
                          onClick={() => {
                              viewDetails(user.id);
                          }}
                      >
                          <i className="fa-solid fa-eye"></i>
                      </button>
                      <UpdateUser
                          className="text-success btn btn-link"
                          user={user}
                          btnName=<i className="fa-solid fa-user-pen"></i>
                      />

                      <button
                          className="btn btn-sm my-2 btn-link text-danger"
                          onClick={() => {
                              ToastModal(
                                  "You want to Delete this user",
                                  "Yes, Delete it!"
                              ).then((result) => {
                                  if (result.isConfirmed) {
                                      destroy(route("user.destroy", user.id), {
                                          onSuccess: () => {
                                              Toast.fire({
                                                  icon: "success",
                                                  title: "Successfully deleted user",
                                              });
                                          },
                                      });
                                  }
                              });
                          }}
                      >
                          <i className="fa-solid fa-trash"></i>
                      </button>
                  </ButtonLayout>
              ),
          }))
        : [];

    const showAllTypes = userTypes.map((type) => ({
        value: type.id,
        label: type.desc,
    }));

    function viewDetails(id) {
        console.log(id);
    }

    const currentPage = userList.current_page; // Current page number
    const totalPages = userList.last_page; // Total number of pages

    return (
        <AuthenticatedLayout>
            <div className="container">
                <div className="p-2 bg-secondary">
                    <AddUser
                        className="btn btn-success"
                        btnName="Add User"
                        userTypes={showAllTypes}
                    />
                    <Table
                        className="table table-hover table-striped-columns"
                        data={info}
                    />

                    <div className="d-flex ">
                        <div className="pagination-info mt-3 flex-grow-1">
                            <p>
                                Page {currentPage} of {totalPages}
                            </p>
                        </div>
                        <div className="page pagination mt-0 p-">
                            {userList.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || "#"}
                                    className={`btn ${
                                        link.active
                                            ? "btn-primary"
                                            : "btn-secondary"
                                    } mx-1`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
