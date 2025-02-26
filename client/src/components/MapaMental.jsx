import React, { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { v4 as uuidv4 } from "uuid";
import { generateMindMap } from "../api/activity";

const initialNodes = [
  {
    id: "1",
    data: { label: "Idea Principal" },
    position: { x: 250, y: 5 },
    style: { backgroundColor: "#f0f0f0", padding: 10, borderRadius: 5 },
  },
];

const data = {
    nodes: [
      { id: "supraordinada", type: "input", data: { label: "Las capitales de los países" }, position: { x: 400, y: 50 } },
      { id: "concepto", data: { label: "Problematización" }, position: { x: 400, y: 150 } },
      { id: "exclusora", data: { label: "Exploración" }, position: { x: 700, y: 150 } },
      { id: "criterio", data: { label: "Comprensión" }, position: { x: 400, y: 250 } },
      { id: "infra1", data: { label: "Creación" }, position: { x: 250, y: 350 } },
      { id: "infra2", data: { label: "Evaluación" }, position: { x: 550, y: 350 } }
    ],
    edges: [
      { id: "e1-2", source: "supraordinada", target: "concepto", animated: true },
      { id: "e1-3", source: "concepto", target: "exclusora", animated: true },
      { id: "e1-4", source: "concepto", target: "criterio", animated: true },
      { id: "e3-5", source: "criterio", target: "infra1", animated: true },
      { id: "e4-6", source: "criterio", target: "infra2", animated: true },
      { id: "e5-6", source: "1000", target: "infra2", animated: true }
    ]
  };
  

function MapaMental ({ topic }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const generatednodesAndEdges = async () =>{
    const { data: { nodes, edges }} = await generateMindMap({ topic, token: window.localStorage.getItem('token')  });
    setNodes([...nodes,
      { id: "10000", data: { label: topic }, position: { x: 0, y: 0 }, 
      style: { backgroundColor: "#ef441f ", padding: 10, borderRadius: 5, margin: 10 } }]);
    setEdges(edges);
    console.log(edges)
  }

  useEffect(() => {
    generatednodesAndEdges();
  }, [topic]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNode = () => {
    const newNode = {
      id: uuidv4(),
      data: { label: "Nuevo Nodo" },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      style: { backgroundColor: "#a0d2eb", padding: 10, borderRadius: 5 },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const onNodeDoubleClick = (event, node) => {
    const newLabel = prompt("Editar texto del nodo:", node.data.label);
    if (newLabel !== null) {
      setNodes((nds) =>
        nds.map((n) => (n.id === node.id ? { ...n, data: { label: newLabel } } : n))
      );
    }
  };

  return (
    <div style={{ position:'relative', width: "100%", height: "500px" }} className="bg-#34 text-white py-2 px-4 rounded-md mt-4">
      <button onClick={addNode} className="bg-blue-500 text-white py-2 px-4 rounded-md" style={{ position: "absolute", zIndex: 10, padding: 10 }}>
        Añadir Nodo
      </button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDoubleClick={onNodeDoubleClick}
        fitView
      >
        <MiniMap />
        <Controls className="bg-white text-white py-2 px-4 rounded-md" />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default MapaMental;
