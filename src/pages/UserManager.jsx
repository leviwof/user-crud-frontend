import { useEffect, useState } from "react";
import UserForm from "../components/UserForm";
import UserTable from "../components/UserCard";
import { getUsers, createUser, updateUser, deleteUser } from "../api/userApi";

export default function UserManager() {

    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState(null);

    const loadUsers = async () => {
        const res = await getUsers();
        setUsers(res.data);
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleSubmit = async (data) => {
        if (editUser) {
            await updateUser(editUser._id, data);
            setEditUser(null);
        } else {
            await createUser(data);
        }
        loadUsers();
    };

    const handleDelete = async (id) => {
        await deleteUser(id);
        loadUsers();
    };

    return (
        <div className="container">
            <h2>User Manager</h2>

            <UserForm onSubmit={handleSubmit} editUser={editUser} />

            <UserTable
                users={users}
                onDelete={handleDelete}
                onEdit={setEditUser}
            />
        </div>
    );
}
