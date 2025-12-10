
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Entity, EntityRelationship } from '../types';
import { Users, Building2, Banknote, MapPin, Box, FileText, ShoppingBag, ArrowRight, Share2, ZoomIn, X, Move, RotateCcw } from 'lucide-react';

interface EntityGraphProps {
  entities: Entity[];
  relationships: EntityRelationship[];
}

interface Node extends d3.SimulationNodeDatum {
  id: string;
  type: string;
  details: string;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: string | Node;
  target: string | Node;
  relation: string;
  evidence: string;
}

const EntityGraph: React.FC<EntityGraphProps> = ({ entities, relationships }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gRef = useRef<SVGGElement>(null); // Group for Zooming
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedLink, setSelectedLink] = useState<Link | null>(null);

  // Helper to map type to color
  const getNodeColor = (type: string) => {
    switch (type) {
      case 'Person': return '#B07CFF'; // Neon Purple
      case 'Organization': return '#5AB7FF'; // Neon Blue
      case 'Money': return '#4FF2D8'; // Cyber Mint
      case 'Location': return '#F59E0B'; // Amber
      case 'Document': return '#94a3b8'; // Slate
      default: return '#cbd5e1';
    }
  };

  // Helper to map type to Icon (For Details Panel)
  const NodeIcon = ({ type, size = 16, color = 'white' }: { type: string, size?: number, color?: string }) => {
    switch (type) {
      case 'Person': return <Users size={size} color={color} />;
      case 'Organization': return <Building2 size={size} color={color} />;
      case 'Money': return <Banknote size={size} color={color} />;
      case 'Location': return <MapPin size={size} color={color} />;
      case 'Document': return <FileText size={size} color={color} />;
      case 'Product': return <ShoppingBag size={size} color={color} />;
      default: return <Box size={size} color={color} />;
    }
  };

  const handleResetZoom = () => {
    if (svgRef.current && gRef.current) {
        const svg = d3.select(svgRef.current);
        const width = containerRef.current?.clientWidth || 800;
        const height = 600;
        
        svg.transition().duration(750).call(
            // @ts-ignore
            d3.zoom().transform,
            d3.zoomIdentity.translate(width / 2, height / 2).scale(1).translate(-width/2, -height/2) // Centering approximation
        );
    }
  };

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || !gRef.current) return;
    if (!entities || entities.length === 0) return;

    // 1. Prepare Data
    const uniqueNodesMap = new Map<string, Node>();
    
    // Add explicitly extracted entities
    entities.forEach(e => {
        if (!uniqueNodesMap.has(e.name)) {
            uniqueNodesMap.set(e.name, { id: e.name, type: e.type, details: e.details });
        }
    });
    
    // Add implicit entities from relationships
    relationships?.forEach(r => {
        if (!uniqueNodesMap.has(r.source_entity)) {
            uniqueNodesMap.set(r.source_entity, { id: r.source_entity, type: 'Unknown', details: 'Extracted from relationship' });
        }
        if (!uniqueNodesMap.has(r.target_entity)) {
            uniqueNodesMap.set(r.target_entity, { id: r.target_entity, type: 'Unknown', details: 'Extracted from relationship' });
        }
    });

    const nodes: Node[] = Array.from(uniqueNodesMap.values());
    const links: Link[] = relationships?.map(r => ({
      source: r.source_entity,
      target: r.target_entity,
      relation: r.relationship_type,
      evidence: r.supporting_evidence
    })) || [];

    // 2. Setup SVG Dimensions
    const width = containerRef.current.clientWidth;
    const height = 600;
    const svg = d3.select(svgRef.current);
    const g = d3.select(gRef.current);
    
    g.selectAll("*").remove(); // Clear previous render within the group

    // Define Arrow Marker
    const defs = svg.append("defs");
    defs.append("marker")
        .attr("id", "arrowhead")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 22) // Adjusted for node radius
        .attr("refY", 0)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5")
        .attr("fill", "#94a3b8")
        .style("opacity", 0.6);

    // 3. Zoom Behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.1, 4])
        .on("zoom", (event) => {
            g.attr("transform", event.transform);
        });

    svg.call(zoom);

    // 4. Force Simulation
    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id((d: any) => d.id).distance(150))
        .force("charge", d3.forceManyBody().strength(-500))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collide", d3.forceCollide().radius(40).strength(0.7));

    // 5. Render Elements (Links First)
    const link = g.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(links)
        .enter().append("line")
        .attr("stroke", "#94a3b8")
        .attr("stroke-opacity", 0.4)
        .attr("stroke-width", 1.5)
        .attr("marker-end", "url(#arrowhead)")
        .style("cursor", "pointer")
        .on("click", (event, d) => {
            event.stopPropagation();
            setSelectedLink(d);
            setSelectedNode(null);
        });
    
    // Invisible wide link for easier clicking
    const linkHitArea = g.append("g")
        .attr("class", "link-hit-areas")
        .selectAll("line")
        .data(links)
        .enter().append("line")
        .attr("stroke", "transparent")
        .attr("stroke-width", 10)
        .style("cursor", "pointer")
        .on("click", (event, d) => {
            event.stopPropagation();
            setSelectedLink(d);
            setSelectedNode(null);
        });


    // Render Nodes
    const node = g.append("g")
        .attr("class", "nodes")
        .selectAll("g")
        .data(nodes)
        .enter().append("g")
        .call(d3.drag<SVGGElement, Node>()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    // Node Circle
    node.append("circle")
        .attr("r", 16)
        .attr("fill", (d) => getNodeColor(d.type))
        .attr("stroke", "#fff")
        .attr("stroke-width", 2)
        .style("filter", "drop-shadow(0px 4px 6px rgba(0,0,0,0.15))")
        .style("cursor", "grab")
        .on("click", (event, d) => {
            event.stopPropagation();
            setSelectedNode(d);
            setSelectedLink(null);
        })
        .on("mouseover", function() { d3.select(this).attr("stroke", "#1e293b").attr("stroke-width", 3); })
        .on("mouseout", function() { d3.select(this).attr("stroke", "#fff").attr("stroke-width", 2); });

    // Node Labels
    node.append("text")
        .text((d) => d.id.length > 15 ? d.id.substring(0, 12) + '...' : d.id)
        .attr("dy", 30)
        .attr("text-anchor", "middle")
        .attr("font-size", "10px")
        .attr("fill", "#475569")
        .attr("font-weight", "600")
        .style("pointer-events", "none")
        .style("text-shadow", "0 1px 2px rgba(255,255,255,0.8)");

    // 6. Simulation Ticks
    simulation.on("tick", () => {
        link
            .attr("x1", (d: any) => d.source.x)
            .attr("y1", (d: any) => d.source.y)
            .attr("x2", (d: any) => d.target.x)
            .attr("y2", (d: any) => d.target.y);
        
        linkHitArea
            .attr("x1", (d: any) => d.source.x)
            .attr("y1", (d: any) => d.source.y)
            .attr("x2", (d: any) => d.target.x)
            .attr("y2", (d: any) => d.target.y);

        node
            .attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    // Drag Logic
    function dragstarted(event: any, d: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
        d3.select(this).select("circle").style("cursor", "grabbing");
    }
    function dragged(event: any, d: any) {
        d.fx = event.x;
        d.fy = event.y;
    }
    function dragended(event: any, d: any) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
        d3.select(this).select("circle").style("cursor", "grab");
    }

    // Cleanup
    return () => {
        simulation.stop();
    };

  }, [entities, relationships]);

  return (
    <div className="glass-panel rounded-[2.5rem] p-0 overflow-hidden relative flex flex-col md:flex-row h-[600px] border border-white/50 shadow-xl">
      
      {/* Header Overlay */}
      <div className="absolute top-6 left-8 z-10 pointer-events-none">
          <div className="flex items-center gap-3 mb-1">
             <div className="p-2.5 bg-indigo-100 rounded-xl text-indigo-600 shadow-sm">
                <Share2 size={22} />
             </div>
             <div>
                <h3 className="font-bold text-slate-800 text-lg drop-shadow-sm">Entity Knowledge Graph</h3>
                <p className="text-xs text-slate-500 font-medium">Interactive Forensics</p>
             </div>
          </div>
      </div>

      {/* Controls Overlay */}
      <div className="absolute top-6 right-6 z-10 flex flex-col gap-2">
         <button 
            onClick={handleResetZoom}
            className="p-2 bg-white/80 hover:bg-white border border-slate-200 rounded-xl text-slate-600 shadow-sm transition-all active:scale-95"
            title="Reset View"
         >
            <RotateCcw size={18} />
         </button>
      </div>

      {/* D3 Graph Area */}
      <div className="flex-1 relative bg-gradient-to-br from-slate-50 to-indigo-50/30" ref={containerRef}>
         <svg ref={svgRef} className="w-full h-full cursor-move">
             {/* The Group that gets Transformed */}
             <g ref={gRef} />
         </svg>
         
         <div className="absolute bottom-4 left-4 text-[10px] text-slate-400 font-mono bg-white/60 px-2 py-1 rounded-md pointer-events-none flex items-center gap-2">
             <Move size={10} />
             <span>Pan: Drag background | Zoom: Scroll | Nodes: Drag & Click</span>
         </div>
      </div>

      {/* Interactive Detail Panel */}
      {(selectedNode || selectedLink) && (
          <div className="absolute md:relative bottom-0 left-0 right-0 md:w-80 h-1/2 md:h-full bg-white/80 backdrop-blur-xl border-t md:border-t-0 md:border-l border-white/60 shadow-2xl p-6 overflow-y-auto animate-slide-up z-20">
             <button 
                onClick={() => { setSelectedNode(null); setSelectedLink(null); }}
                className="absolute top-4 right-4 p-1.5 hover:bg-slate-200/50 rounded-full text-slate-400 transition-colors"
             >
                <X size={18} />
             </button>

             {/* Node Details */}
             {selectedNode && (
                 <div className="space-y-4 pt-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                     <div className="flex justify-center mb-4">
                         <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg ring-4 ring-white" style={{ backgroundColor: getNodeColor(selectedNode.type) }}>
                             <NodeIcon type={selectedNode.type} size={40} />
                         </div>
                     </div>
                     <div className="text-center mb-6">
                         <h4 className="text-xl font-bold text-slate-800 leading-tight break-words">{selectedNode.id}</h4>
                         <span className="inline-block mt-2 px-3 py-1 bg-white/60 border border-white rounded-full text-xs font-bold text-slate-500 uppercase tracking-wide shadow-sm">
                             {selectedNode.type}
                         </span>
                     </div>
                     
                     <div className="bg-white/50 p-4 rounded-xl border border-white/60 shadow-sm">
                         <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Metadata</h5>
                         <p className="text-sm text-slate-700 leading-relaxed">{selectedNode.details}</p>
                     </div>

                     <div className="mt-4">
                         <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Connected Relations</h5>
                         <div className="space-y-2">
                             {/* Filter relationships for this node */}
                             {(relationships || []).filter(r => r.source_entity === selectedNode.id || r.target_entity === selectedNode.id).map((r, idx) => (
                                 <div key={idx} className="text-xs p-2.5 bg-white/60 border border-white rounded-lg flex items-center gap-2 text-slate-600 shadow-sm">
                                     <ArrowRight size={10} className="text-slate-400 flex-shrink-0" />
                                     <span className="leading-snug">
                                         <span className="font-bold">{r.relationship_type}</span> 
                                         {' '}{r.target_entity === selectedNode.id ? r.source_entity : r.target_entity}
                                     </span>
                                 </div>
                             ))}
                         </div>
                     </div>
                 </div>
             )}

             {/* Link Details */}
             {selectedLink && (
                 <div className="space-y-4 pt-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                     <div className="flex items-center justify-center gap-4 mb-6 text-slate-400">
                         <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center shadow-inner">
                              {/* @ts-ignore */}
                             <NodeIcon type={selectedLink.source.type || 'Unknown'} size={20} color="#64748b" />
                         </div>
                         <ArrowRight size={20} />
                         <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center shadow-inner">
                             {/* @ts-ignore */}
                             <NodeIcon type={selectedLink.target.type || 'Unknown'} size={20} color="#64748b" />
                         </div>
                     </div>

                     <div className="text-center mb-6">
                         <h4 className="text-lg font-bold text-slate-800">{selectedLink.relation}</h4>
                         <div className="flex flex-col items-center justify-center gap-1 mt-2 text-xs font-medium text-slate-500">
                             {/* @ts-ignore */}
                             <span className="font-bold">{selectedLink.source.id}</span>
                             <span className="text-[10px] text-slate-400">to</span>
                             {/* @ts-ignore */}
                             <span className="font-bold">{selectedLink.target.id}</span>
                         </div>
                     </div>

                     <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100/50 shadow-sm">
                         <div className="flex items-center gap-2 mb-2 text-blue-600">
                             <ZoomIn size={14} />
                             <h5 className="text-xs font-bold uppercase tracking-wider">Evidence</h5>
                         </div>
                         <p className="text-sm text-slate-700 italic leading-relaxed">"{selectedLink.evidence}"</p>
                     </div>
                 </div>
             )}
          </div>
      )}
    </div>
  );
};

export default EntityGraph;
