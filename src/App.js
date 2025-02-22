import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import html2canvas from "html2canvas";

const App = () => {
  const [file, setFile] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Por favor, selecione um arquivo CSV.");
      return;
    }
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://estoque-springboot-production.up.railway.app/api/estoque/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setProdutos(response.data);
    } catch (error) {
      setError("Erro ao enviar o arquivo. Verifique o formato.");
      console.error("Erro ao enviar CSV:", error);
    }
  };

  const downloadImage = () => {
    const tableElement = document.getElementById("produtos-table");
    html2canvas(tableElement).then((canvas) => {
      const image = canvas.toDataURL("image/png"); // Gera a imagem no formato PNG
      const link = document.createElement("a");
      link.href = image;
      link.download = "produtos.png"; // Nome do arquivo
      link.click();
    });
  };

  return (
    <div className="container mt-5 text-center">
      <div className="card p-4 shadow-lg border-0" style={{ backgroundColor: "#989a91" }}>
        <h1 className="mb-4 fw-bold" style={{ color: "#2e2e2e" }}>📊 BLING CSV CONVERTER</h1>
        <input
          type="file"
          className="form-control mb-3"
          onChange={handleFileChange}
          accept=".csv"
        />
        <button
          className="btn btn-primary w-100 text-uppercase fw-bold mb-3"
          style={{ backgroundColor: "#2e2e2e", borderColor: "#ffffff" }}
          onClick={handleUpload}
        >
          Enviar Arquivo
        </button>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
      {produtos.length > 0 && (
        <div className="mt-4">
          <h3 className="text-center" style={{ color: "#211b15" }}>📦 Produtos</h3>
          <table id="produtos-table" className="table table-striped mt-3 shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>Descrição</th>
                <th>Estoque</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto, index) => (
                <tr key={index}>
                  <td className="fw-bold">{produto.descricao}</td>
                  <td>{produto.estoque}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={downloadImage}
            className="btn btn-success w-100 mt-3"
            style={{ backgroundColor: "#28a745", borderColor: "#28a745" }}
          >
            Baixar Como Imagem
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
