import { useState } from "react";
import MainLayout from "../Layout/MainLayout";
import { useAuth } from "../context/AuthContext";
import { removeUser, updateUser } from "../api/user";


function ProfilePage() {
  const icons = {
    show: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z",
    hide: "M17.94 17.94A10 10 0 0 1 12 20c-7 0-11-8-11-8a19.3 19.3 0 0 1 3.22-4.5M8.53 8.53A3 3 0 0 1 12 9a3 3 0 0 1 3 3c0 .87-.37 1.65-.97 2.22M1 1l22 22"
  }
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [tempUser, setTempUser] = useState({ ...user });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState({ show: false, icon: icons.show });
  const [showNewPassword, setShowNewPassword] = useState({ show: false, icon: icons.show });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setTempUser({ ...tempUser, profilePicture: imageUrl });
    }
  };

  const handleChange = (e) => {
    setTempUser({ ...tempUser, [e.target.name]: e.target.value });
  };

  const handleRemove = async () => {
    await removeUser(user._id);
  }

  const handleSave = async () => {
    // Validación de contraseña
    if (newPassword && newPassword.length < 6) {
      setError("La nueva contraseña debe tener al menos 6 caracteres.");
      return;
    }

    // Aquí puedes agregar lógica para verificar la contraseña actual en el backend
    if (currentPassword && currentPassword !== user.password) {
      setError("La contraseña actual es incorrecta.");
      return;
    }

    // Actualizar datos del usuario
    await updateUser({
      ...tempUser,
      password: newPassword ? newPassword : user.password, // Si hay nueva contraseña, se actualiza
    });

    setIsEditing(false);
    setError("");
    setCurrentPassword("");
    setNewPassword("");
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Mi Perfil
        </h2>
        <div className="flex flex-col items-center">
          {/* Imagen de perfil */}
          <div className="relative w-40 h-40">
            <img
              src={user.profilePicture || "https://via.placeholder.com/150"}
              className="w-full h-full object-cover rounded-full border-4 border-gray-300"
              alt="Foto de perfil"
            />
          </div>

          {/* Datos del usuario */}
          <div className="mt-4 text-center">
            <h3 className="text-xl font-medium text-gray-700">{user.name}</h3>
            <p className="text-gray-500">{user.username}</p>
          </div>

          <div className="flex gap-2">
            {/* Botón para editar */}
            <button
              className="mt-4 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
              onClick={() => setIsEditing(true)}
            >
              Editar Perfil
            </button>

            {/* Botón para eliminar */}
            <button
              className="mt-4 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
              onClick={handleRemove}
            >
              Eliminar Usuario
            </button>
          </div>
        </div>
      </div>

      {/* MODAL PARA EDITAR PERFIL */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Editar Perfil</h3>

            {/* Cambiar Imagen */}
            <div className="flex flex-col items-center mb-4">
              <label htmlFor="profilePicture" className="cursor-pointer">
                <img
                  src={tempUser.profilePicture || "https://via.placeholder.com/150"}
                  className="w-24 h-24 object-cover rounded-full border-2 border-gray-300"
                  alt="Foto de perfil"
                />
              </label>
              <input
                type="file"
                id="profilePicture"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <p className="text-xs text-gray-500 mt-1">Haz clic para cambiar</p>
            </div>

            {/* Campos del usuario */}
            <div className="mb-4">
              <label className="block text-gray-700">Nombre</label>
              <input
                type="text"
                name="username"
                value={tempUser.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-green-300"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={tempUser.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-green-300"
              />
            </div>

            {/* Cambiar contraseña */}
            <div className="mb-4 relative">
              <label className="block text-gray-700">Contraseña actual</label>
              <input
                type={showCurrentPassword.show ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-green-300"
              />
              <button onClick={() => setShowCurrentPassword({ show: !showCurrentPassword.show, icon: !showCurrentPassword.show ? icons.hide : icons.show })}
                className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700 mt-5"
              >
                <svg id="eyeIcon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye">
                  <path d={showCurrentPassword.icon}></path>
                  <circle cx="12" cy="12" r="3">
                  </circle>
                </svg>
              </button>
            </div>

            <div className="mb-4 relative">
              <label className="block text-gray-700">Nueva contraseña</label>
              <input
                type={showNewPassword.show ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-green-300"
              />
              <button onClick={() => setShowNewPassword({ show: !showNewPassword.show, icon: !showNewPassword.show ? icons.hide : icons.show })}
                className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700  mt-5"
              >
                <svg id="eyeIcon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye">
                  <path d={showNewPassword.icon}></path>
                  <circle cx="12" cy="12" r="3">
                  </circle>
                </svg>
              </button>
            </div>

            {/* Mostrar errores */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Botones */}
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                onClick={handleSave}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}

export default ProfilePage;
