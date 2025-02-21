import React, { useState, useCallback } from "react";
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
      { id: "1", type: "input", data: { label: "Las capitales de los países" }, position: { x: 400, y: 50 } },
      { id: "2", data: { label: "Problematización" }, position: { x: 100, y: 150 } },
      { id: "3", data: { label: "Exploración" }, position: { x: 400, y: 150 } },
      { id: "4", data: { label: "Comprensión" }, position: { x: 700, y: 150 } },
      { id: "5", data: { label: "Creación" }, position: { x: 250, y: 300 } },
      { id: "6", data: { label: "Evaluación" }, position: { x: 550, y: 300 } }
    ],
    edges: [
      { id: "e1-2", source: "1", target: "2", animated: true },
      { id: "e1-3", source: "1", target: "3", animated: true },
      { id: "e1-4", source: "1", target: "4", animated: true },
      { id: "e3-5", source: "3", target: "5", animated: true },
      { id: "e4-6", source: "4", target: "6", animated: true }
    ]
  };
  

const MapaMental = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(data.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

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
    <div style={{ position:'relative', width: "100%", height: "500px" }}>
      <button onClick={addNode} style={{ position: "absolute", zIndex: 10, padding: 10 }}>
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
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default MapaMental;
