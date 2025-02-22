import { useState } from "react";
import api from "../services/api";

const UploadCSV = ({ setEstoque }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Por favor, selecione um arquivo CSV.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setEstoque(response.data);
      alert("Arquivo enviado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar CSV:", error);
      alert("Erro ao enviar arquivo. Verifique o console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
        Upload de CSV
      </h2>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="w-full border rounded p-2 mb-4"
      />
      <button
        onClick={handleUpload}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? "Enviando..." : "Enviar Arquivo"}
      </button>
    </div>
  );
};