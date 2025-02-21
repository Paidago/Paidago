import React, { useState, useEffect } from "react";
import ReactFlow, { MiniMap, Controls, Background } from "reactflow";
import "reactflow/dist/style.css";
import * as d3 from "d3";

function MapaMental () {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

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
  
//   useEffect(() => {
//     if (!data || data.length === 0) return;

//     // 📌 Usar D3.js para calcular posiciones automáticas
//     const width = 800, height = 600;
//     const simulation = d3.forceSimulation(data)
//       .force("charge", d3.forceManyBody().strength(-300))
//       .force("center", d3.forceCenter(width / 2, height / 2))
//       .force("link", d3.forceLink().id((d) => d.id).distance(150))
//       .on("tick", () => {
//         setNodes(data.map((d) => ({
//           id: d.id,
//           position: { x: d.x, y: d.y },
//           data: { label: d.label },
//         })));
//         setEdges(
//           d.links.map((link) => ({
//             id: `e${link.source}-${link.target}`,
//             source: link.source,
//             target: link.target,
//           }))
//         );
//       });

//     return () => simulation.stop();
//   }, [data]);

  return (
    <div className="h-[600px] w-full border p-4">
      <ReactFlow nodes={data.nodes} edges={data.edges}>
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default MapaMental;
