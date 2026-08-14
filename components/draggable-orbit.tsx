'use client';
import { PointerEvent, useRef, useState } from 'react';
export default function DraggableOrbit() {
  const [position, setPosition] = useState({ x: 0, y: 0 }); const [dragging, setDragging] = useState(false); const start = useRef({ x: 0, y: 0 });
  function down(event: PointerEvent<HTMLDivElement>) { event.currentTarget.setPointerCapture(event.pointerId); start.current = { x: event.clientX - position.x, y: event.clientY - position.y }; setDragging(true); }
  function move(event: PointerEvent<HTMLDivElement>) { if (!dragging) return; setPosition({ x: Math.max(-110, Math.min(110, event.clientX - start.current.x)), y: Math.max(-110, Math.min(110, event.clientY - start.current.y)) }); }
  function release() { setDragging(false); setPosition({ x: 0, y: 0 }); }
  return <div className={`orbit ${dragging ? 'is-dragging' : ''}`} role="img" aria-label="A draggable Design, Code and Curiosity orbit" onPointerDown={down} onPointerMove={move} onPointerUp={release} onPointerCancel={release} style={{ transform: `translate(${position.x}px, ${position.y}px) rotate(-14deg)` }}><b>Design</b><b>Code</b><b>Curiosity</b><span className="orbit-hint">drag me</span></div>;
}
