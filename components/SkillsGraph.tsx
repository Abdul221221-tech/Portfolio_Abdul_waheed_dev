"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface SkillNode extends d3.SimulationNodeDatum {
    id: string;
    group: number;
    radius: number;
    color: string;
    description: string;
}

interface SkillLink extends d3.SimulationLinkDatum<SkillNode> {
    source: string | SkillNode;
    target: string | SkillNode;
}

const initialNodes: SkillNode[] = [
    { id: "Abdul Waheed", group: 0, radius: 50, color: "var(--color-neon-blue)", description: "Full Stack & AI Developer" },

    // Categories
    { id: "Frontend", group: 1, radius: 35, color: "var(--color-neon-purple)", description: "User Interface & Experience" },
    { id: "Backend", group: 2, radius: 35, color: "var(--color-neon-cyan)", description: "Server Logic & Architecture" },
    { id: "Database", group: 3, radius: 35, color: "#22c55e", description: "Data Storage & Management" },
    { id: "Other Skills", group: 4, radius: 35, color: "#facc15", description: "AI, Marketing & Growth" },

    // Frontend
    { id: "React", group: 1, radius: 25, color: "var(--color-neon-purple)", description: "UI Library" },
    { id: "HTML", group: 1, radius: 25, color: "var(--color-neon-purple)", description: "Markup" },
    { id: "CSS", group: 1, radius: 25, color: "var(--color-neon-purple)", description: "Styling" },
    { id: "JavaScript", group: 1, radius: 25, color: "var(--color-neon-purple)", description: "Logic" },

    // Backend
    { id: "Python", group: 2, radius: 25, color: "var(--color-neon-cyan)", description: "General Purpose & AI" },
    { id: "Django", group: 2, radius: 25, color: "var(--color-neon-cyan)", description: "Web Framework" },
    { id: "Node.js", group: 2, radius: 25, color: "var(--color-neon-cyan)", description: "JavaScript Runtime" },

    // Database
    { id: "MongoDB", group: 3, radius: 25, color: "#22c55e", description: "NoSQL DB" },
    { id: "Firebase", group: 3, radius: 25, color: "#22c55e", description: "BaaS & Realtime DB" },
    { id: "SQL", group: 3, radius: 25, color: "#22c55e", description: "Relational DB" },

    // Other Skills
    { id: "SEO", group: 4, radius: 25, color: "#facc15", description: "Search Optimization" },
    { id: "Marketing", group: 4, radius: 25, color: "#facc15", description: "Digital Growth" },
    { id: "Machine Learning", group: 4, radius: 25, color: "#facc15", description: "Predictive Models" },
    { id: "AI Tools", group: 4, radius: 25, color: "#facc15", description: "LLMs & Automation" },
];

const initialLinks: SkillLink[] = [
    { source: "Abdul Waheed", target: "Frontend" },
    { source: "Abdul Waheed", target: "Backend" },
    { source: "Abdul Waheed", target: "Database" },
    { source: "Abdul Waheed", target: "Other Skills" },

    { source: "Frontend", target: "React" },
    { source: "Frontend", target: "HTML" },
    { source: "Frontend", target: "CSS" },
    { source: "Frontend", target: "JavaScript" },

    { source: "Backend", target: "Python" },
    { source: "Backend", target: "Django" },
    { source: "Backend", target: "Node.js" },

    { source: "Database", target: "MongoDB" },
    { source: "Database", target: "Firebase" },
    { source: "Database", target: "SQL" },

    { source: "Other Skills", target: "SEO" },
    { source: "Other Skills", target: "Marketing" },
    { source: "Other Skills", target: "Machine Learning" },
    { source: "Other Skills", target: "AI Tools" },
];

export default function SkillsGraph() {
    const svgRef = useRef<SVGSVGElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [tooltip, setTooltip] = useState<{ visible: boolean; x: number; y: number; text: string; subtext: string; color: string }>({
        visible: false,
        x: 0,
        y: 0,
        text: "",
        subtext: "",
        color: ""
    });

    useEffect(() => {
        if (!svgRef.current || !containerRef.current) return;

        const container = containerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight || 600;

        // Clear previous SVG contents on re-render to avoid duplicates
        d3.select(svgRef.current).selectAll("*").remove();

        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [0, 0, width, height]);

        // Define glow filter
        const defs = svg.append("defs");
        const filter = defs.append("filter")
            .attr("id", "glow");
        filter.append("feGaussianBlur")
            .attr("stdDeviation", "4")
            .attr("result", "coloredBlur");
        const feMerge = filter.append("feMerge");
        feMerge.append("feMergeNode").attr("in", "coloredBlur");
        feMerge.append("feMergeNode").attr("in", "SourceGraphic");

        const isMobile = width < 768;
        const radiusScale = isMobile ? 0.6 : 1;
        const linkDistance = isMobile ? 50 : 120;
        const chargeStrength = isMobile ? -120 : -300;

        // Clone arrays so D3 doesn't mutate our initial state across hot reloads
        const nodes = initialNodes.map(d => ({ ...d, radius: d.radius * radiusScale }));
        const links = initialLinks.map(d => ({ ...d }));

        const simulation = d3.forceSimulation(nodes as d3.SimulationNodeDatum[])
            .force("link", d3.forceLink(links).id((d: any) => d.id).distance(linkDistance))
            .force("charge", d3.forceManyBody().strength(chargeStrength))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("radial", d3.forceRadial(isMobile ? Math.min(width, height) / 3 : 200, width / 2, height / 2).strength(0.8)) // Pull nodes into a visible circle
            .force("collide", d3.forceCollide().radius((d: any) => d.radius + (isMobile ? 5 : 15)).strength(1)); // Strong overlap prevention

        const link = svg.append("g")
            .attr("stroke-opacity", 0.3)
            .selectAll("line")
            .data(links)
            .join("line")
            .attr("stroke", (d: any) => d.target.color)
            .attr("stroke-width", 2);

        const nodeGroup = svg.append("g")
            .selectAll("g")
            .data(nodes)
            .join("g")
            .call(drag(simulation) as any);

        // Append glowing circles
        nodeGroup.append("circle")
            .attr("r", (d) => d.radius)
            .attr("fill", "#0a0a1e") // Dark fill
            .attr("stroke", (d) => d.color)
            .attr("stroke-width", 3)
            .style("filter", "url(#glow)")
            .style("cursor", "pointer")
            .on("mouseover", function (event, d: any) {
                d3.select(this)
                    .transition().duration(200)
                    .attr("r", d.radius + 5)
                    .attr("stroke-width", 5);

                // Highlight lines
                link.attr("stroke-opacity", (l: any) => (l.source.id === d.id || l.target.id === d.id) ? 1 : 0.1);

                // Pause simulation subtly
                simulation.alphaTarget(0.1).restart();

                setTooltip({
                    visible: true,
                    x: event.pageX,
                    y: event.pageY - 50,
                    text: d.id,
                    subtext: d.description,
                    color: d.color
                });
            })
            .on("mousemove", (event) => {
                setTooltip(prev => ({
                    ...prev,
                    x: event.pageX,
                    y: event.pageY - 80,
                }));
            })
            .on("mouseout", function (event, d: any) {
                d3.select(this)
                    .transition().duration(200)
                    .attr("r", d.radius)
                    .attr("stroke-width", 3);

                link.attr("stroke-opacity", 0.3);
                simulation.alphaTarget(0);
                setTooltip(prev => ({ ...prev, visible: false }));
            })
            // Add click interaction
            .on("click", (event, d: any) => {
                setTooltip({
                    visible: true,
                    x: event.pageX,
                    y: event.pageY - 80,
                    text: d.id,
                    subtext: d.description,
                    color: d.color
                });
                simulation.alpha(0.3).restart(); // gentle nudge
            });

        // Add text labels
        nodeGroup.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", ".35em")
            .text((d) => d.group === 0 ? "Abdul Waheed" : d.id)
            .style("fill", "#ffffff")
            .style("font-size", (d) => d.group === 0 ? "14px" : "12px")
            .style("font-family", "monospace")
            .style("pointer-events", "none")
            .style("text-shadow", "0px 2px 4px rgba(0,0,0,0.8)");

        simulation.on("tick", () => {
            link
                .attr("x1", (d: any) => d.source.x)
                .attr("y1", (d: any) => d.source.y)
                .attr("x2", (d: any) => d.target.x)
                .attr("y2", (d: any) => d.target.y);

            nodeGroup
                .attr("transform", (d: any) => {
                    // Strict circular boundary constraints to keep nodes inside the SVG safely
                    const padding = d.radius + 5;
                    const maxRadius = Math.min(width, height) / 2 - padding;
                    const centerX = width / 2;
                    const centerY = height / 2;

                    const dx = d.x - centerX;
                    const dy = d.y - centerY;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance > maxRadius) {
                        const ratio = maxRadius / distance;
                        d.x = centerX + dx * ratio;
                        d.y = centerY + dy * ratio;
                        // dampen velocity to prevent erratic bouncing on walls
                        if (d.vx) d.vx *= 0.5;
                        if (d.vy) d.vy *= 0.5;
                    } else {
                        // Standard rectangular fallback constraints
                        d.x = Math.max(padding, Math.min(width - padding, d.x));
                        d.y = Math.max(padding, Math.min(height - padding, d.y));
                    }

                    return `translate(${d.x},${d.y})`;
                });
        });

        // Handle window resize
        const handleResize = () => {
            const newWidth = container.clientWidth;
            const newHeight = container.clientHeight || 600;
            svg.attr("width", newWidth).attr("height", newHeight)
                .attr("viewBox", [0, 0, newWidth, newHeight]);
            simulation.force("center", d3.forceCenter(newWidth / 2, newHeight / 2));
            simulation.alpha(0.3).restart();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            simulation.stop();
        };

    }, []);

    // Helper syntax for D3 drag behavior
    function drag(simulation: d3.Simulation<d3.SimulationNodeDatum, undefined>) {
        function dragstarted(event: any, d: any) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event: any, d: any) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragended(event: any, d: any) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    }

    return (
        <div className="relative w-full h-[400px] md:h-[600px] lg:h-[700px] bg-[#030014]/50 rounded-3xl border border-gray-800 overflow-hidden" ref={containerRef}>
            <svg ref={svgRef} className="w-full h-full"></svg>

            {/* Custom Tooltip */}
            <div
                className={`fixed pointer-events-none z-50 glass-panel px-4 py-3 rounded-lg border transition-opacity duration-200 shadow-2xl ${tooltip.visible ? 'opacity-100' : 'opacity-0'}`}
                style={{
                    left: `${tooltip.x}px`,
                    top: `${tooltip.y}px`,
                    transform: 'translate(-50%, -100%)',
                    borderColor: tooltip.color,
                    boxShadow: `0 0 20px ${tooltip.color}40, inset 0 0 10px ${tooltip.color}20`
                }}
            >
                <h4 className="font-bold text-white text-base mb-1" style={{ textShadow: `0 0 10px ${tooltip.color}` }}>{tooltip.text}</h4>
                <p className="text-gray-300 text-xs">{tooltip.subtext}</p>
            </div>
        </div>
    );
}
