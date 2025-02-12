import { useState } from "react";
import MainLayout from "../Layout/MainLayout";
import { useAuth } from "../context/AuthContext";

function ProfilePage() {
  const { user } = useAuth()

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUser({ ...user, profilePicture: imageUrl });
    }
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Mi Perfil
        </h2>
        <div className="flex flex-col items-center">
          {/* Imagen de perfil */}
          <div className="w-40 h-40 flex items-center justify-center bg-gray-200 text-gray-500 text-center">
            <img
              src={user.profilePicture}
              className="w-full h-full object-cover"
              onError={(e) => e.target.style.display = 'none'}
            />
            <span className="absolute">Foto de perfil</span>
          </div>


          {/* Datos del usuario */}
          <div className="mt-4 text-center">
            <h3 className="text-xl font-medium text-gray-700">{user.name}</h3>
            <p className="text-gray-500">{user.email}</p>
          </div>

          {/* Botón para editar */}
          <button className="mt-4 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition">
            Editar Perfil
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
