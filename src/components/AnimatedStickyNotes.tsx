import React, { useEffect, useState, useRef, useCallback } from 'react';

interface StickyNote {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  scale: number;
  isDragging: boolean;
  lastX: number;
  lastY: number;
  dragStartTime: number;
}

const AnimatedStickyNotes: React.FC = () => {
  const [notes, setNotes] = useState<StickyNote[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  const containerRef = useRef<HTMLDivElement>(null);
  const draggedNoteRef = useRef<number | null>(null);
  const lastMouseRef = useRef({ x: 0, y: 0 });

  // Physics constants
  const FRICTION = 0.98;
  const BOUNCE_DAMPING = 0.7;
  const MIN_VELOCITY = 0.1;
  const NOTE_SIZE = 96; // 24 * 4 (w-24 h-24)

  useEffect(() => {
    const generateNotes = () => {
      const newNotes: StickyNote[] = [];
      const noteCount = 16;

      for (let i = 0; i < noteCount; i++) {
        // Distribute notes avoiding center content area
        let x, y;
        if (i < 6) {
          // Left side - full height
          x = Math.random() * 15;
          y = Math.random() * 100;
        } else if (i < 12) {
          // Right side - full height
          x = 85 + Math.random() * 15;
          y = Math.random() * 100;
        } else {
          // Top and bottom strips only (avoiding center content)
          x = 20 + Math.random() * 60;
          if (Math.random() > 0.5) {
            y = Math.random() * 10; // Top strip
          } else {
            y = 90 + Math.random() * 10; // Bottom strip
          }
        }
        
        newNotes.push({
          id: i,
          x: x,
          y: y,
          vx: 0,
          vy: 0,
          rotation: (Math.random() - 0.5) * 20,
          scale: 0.7 + Math.random() * 0.3,
          isDragging: false,
          lastX: x,
          lastY: y,
          dragStartTime: 0
        });
      }

      setNotes(newNotes);
    };

    generateNotes();
  }, []);

  // Check collision between two notes
  const checkCollision = (note1: StickyNote, note2: StickyNote, containerWidth: number, containerHeight: number) => {
    const x1 = (note1.x / 100) * containerWidth;
    const y1 = (note1.y / 100) * containerHeight;
    const x2 = (note2.x / 100) * containerWidth;
    const y2 = (note2.y / 100) * containerHeight;
    
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const minDistance = NOTE_SIZE * 0.8; // Slightly smaller for more natural feel
    
    return distance < minDistance;
  };

  // Handle collision physics
  const handleCollision = (note1: StickyNote, note2: StickyNote, containerWidth: number, containerHeight: number) => {
    const x1 = (note1.x / 100) * containerWidth;
    const y1 = (note1.y / 100) * containerHeight;
    const x2 = (note2.x / 100) * containerWidth;
    const y2 = (note2.y / 100) * containerHeight;
    
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance === 0) return;
    
    // Normalize collision vector
    const nx = dx / distance;
    const ny = dy / distance;
    
    // Relative velocity
    const dvx = note2.vx - note1.vx;
    const dvy = note2.vy - note1.vy;
    
    // Relative velocity in collision normal direction
    const dvn = dvx * nx + dvy * ny;
    
    // Do not resolve if velocities are separating
    if (dvn > 0) return;
    
    // Collision impulse
    const impulse = 2 * dvn / 2; // Assuming equal mass
    
    // Update velocities
    note1.vx += impulse * nx * BOUNCE_DAMPING;
    note1.vy += impulse * ny * BOUNCE_DAMPING;
    note2.vx -= impulse * nx * BOUNCE_DAMPING;
    note2.vy -= impulse * ny * BOUNCE_DAMPING;
    
    // Separate overlapping notes
    const overlap = NOTE_SIZE * 0.8 - distance;
    const separationX = (overlap / 2) * nx;
    const separationY = (overlap / 2) * ny;
    
    note1.x = Math.max(0, Math.min(100, ((x1 - separationX) / containerWidth) * 100));
    note1.y = Math.max(0, Math.min(100, ((y1 - separationY) / containerHeight) * 100));
    note2.x = Math.max(0, Math.min(100, ((x2 + separationX) / containerWidth) * 100));
    note2.y = Math.max(0, Math.min(100, ((y2 + separationY) / containerHeight) * 100));
  };

  // Physics animation loop
  const animate = useCallback(() => {
    if (!containerRef.current) return;
    
    const containerWidth = containerRef.current.offsetWidth;
    const containerHeight = containerRef.current.offsetHeight;
    
    setNotes(prevNotes => {
      const newNotes = prevNotes.map(note => {
        if (note.isDragging) return note;
        
        // Apply physics
        let newX = note.x + (note.vx / containerWidth) * 100;
        let newY = note.y + (note.vy / containerHeight) * 100;
        let newVx = note.vx * FRICTION;
        let newVy = note.vy * FRICTION;
        
        // Boundary collisions
        if (newX <= 0 || newX >= 100) {
          newVx = -newVx * BOUNCE_DAMPING;
          newX = Math.max(0, Math.min(100, newX));
        }
        if (newY <= 0 || newY >= 100) {
          newVy = -newVy * BOUNCE_DAMPING;
          newY = Math.max(0, Math.min(100, newY));
        }
        
        // Stop very slow movement
        if (Math.abs(newVx) < MIN_VELOCITY) newVx = 0;
        if (Math.abs(newVy) < MIN_VELOCITY) newVy = 0;
        
        return {
          ...note,
          x: newX,
          y: newY,
          vx: newVx,
          vy: newVy
        };
      });
      
      // Check collisions between notes
      for (let i = 0; i < newNotes.length; i++) {
        for (let j = i + 1; j < newNotes.length; j++) {
          if (checkCollision(newNotes[i], newNotes[j], containerWidth, containerHeight)) {
            handleCollision(newNotes[i], newNotes[j], containerWidth, containerHeight);
          }
        }
      }
      
      return newNotes;
    });
    
    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newMousePos = { x: e.clientX, y: e.clientY };
      setMousePosition(newMousePos);
      lastMouseRef.current = newMousePos;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle mouse down on note
  const handleMouseDown = (e: React.MouseEvent, noteId: number) => {
    e.preventDefault();
    draggedNoteRef.current = noteId;
    
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === noteId 
          ? { 
              ...note, 
              isDragging: true, 
              vx: 0, 
              vy: 0,
              lastX: note.x,
              lastY: note.y,
              dragStartTime: Date.now()
            }
          : note
      )
    );
  };

  // Handle mouse up (throwing)
  useEffect(() => {
    const handleMouseUp = () => {
      if (draggedNoteRef.current !== null && containerRef.current) {
        const noteId = draggedNoteRef.current;
        const containerWidth = containerRef.current.offsetWidth;
        const containerHeight = containerRef.current.offsetHeight;
        
        setNotes(prevNotes => 
          prevNotes.map(note => {
            if (note.id === noteId) {
              const dragDuration = Date.now() - note.dragStartTime;
              const deltaX = note.x - note.lastX;
              const deltaY = note.y - note.lastY;
              
              // Calculate throw velocity based on drag movement
              const throwMultiplier = Math.min(dragDuration, 200) / 200; // Faster drags = more power
              const baseVelocity = 15;
              
              return {
                ...note,
                isDragging: false,
                vx: (deltaX / 100) * containerWidth * baseVelocity * throwMultiplier,
                vy: (deltaY / 100) * containerHeight * baseVelocity * throwMultiplier
              };
            }
            return note;
          })
        );
        
        draggedNoteRef.current = null;
      }
    };

    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, []);

  // Handle dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (draggedNoteRef.current !== null && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        setNotes(prevNotes => 
          prevNotes.map(note => 
            note.id === draggedNoteRef.current 
              ? { 
                  ...note, 
                  x: Math.max(0, Math.min(100, x)),
                  y: Math.max(0, Math.min(100, y))
                }
              : note
          )
        );
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Enhanced sunset background with paper texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-orange-50/30 to-amber-50/20"></div>
      
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_1px_1px,_rgba(0,0,0,0.15)_1px,_transparent_0)] bg-[length:20px_20px]"></div>
      
      {/* Main sunset gradient - large central orb */}
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] opacity-40">
        <div className="absolute inset-0 bg-gradient-radial from-orange-400/50 via-orange-500/30 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
      </div>
      
      {/* Secondary sunset layers */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-35">
        <div className="absolute inset-0 bg-gradient-radial from-amber-400/40 via-orange-400/25 to-transparent rounded-full blur-2xl animate-float-slow"></div>
      </div>
      
      {/* Warm accent circles */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-gradient-radial from-red-400/30 via-orange-400/20 to-transparent rounded-full blur-2xl opacity-60 animate-drift"></div>
      <div className="absolute bottom-1/3 left-1/3 w-[450px] h-[450px] bg-gradient-radial from-yellow-400/35 via-amber-400/22 to-transparent rounded-full blur-2xl opacity-50 animate-float-reverse"></div>
      
      {/* Physics-based sticky notes */}
      {notes.map((note) => {
        const distanceFromMouse = Math.sqrt(
          Math.pow((note.x / 100) * window.innerWidth - mousePosition.x, 2) +
          Math.pow((note.y / 100) * window.innerHeight - mousePosition.y, 2)
        );
        const influence = Math.max(0, 200 - distanceFromMouse) / 200;
        const tiltX = (mousePosition.x - (note.x / 100) * window.innerWidth) * influence * 0.01;
        const tiltY = (mousePosition.y - (note.y / 100) * window.innerHeight) * influence * 0.01;

        return (
          <div
            key={note.id}
            className={`absolute w-24 h-24 pointer-events-auto transition-all duration-200 group select-none ${
              note.isDragging ? 'cursor-grabbing z-50 scale-110' : 'cursor-grab hover:scale-105'
            }`}
            style={{
              left: `${note.x}%`,
              top: `${note.y}%`,
              transform: `
                translate(-50%, -50%)
                rotate(${note.rotation + tiltX}deg) 
                scale(${note.scale + influence * 0.1})
                perspective(1000px)
                rotateX(${tiltY}deg)
                rotateY(${tiltX}deg)
              `,
              transformStyle: 'preserve-3d',
              zIndex: note.isDragging ? 1000 : 1
            }}
            onMouseDown={(e) => handleMouseDown(e, note.id)}
          >
            {/* Main sticky note body */}
            <div className={`w-full h-full bg-amber-200 rounded-2xl shadow-lg border-2 border-amber-300 relative overflow-hidden transition-all duration-200 ${
              note.isDragging ? 'shadow-2xl' : 'group-hover:shadow-xl'
            }`}>
              {/* Header area */}
              <div className="h-7 bg-amber-300 rounded-t-2xl flex items-center justify-between px-2">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full opacity-60"></div>
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full opacity-40"></div>
                </div>
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full opacity-60"></div>
              </div>
              
              {/* Content area with lines */}
              <div className="p-2 h-full">
                <div className="w-full h-0.5 bg-amber-400/30 mb-1"></div>
                <div className="w-3/4 h-0.5 bg-amber-400/20 mb-1"></div>
                <div className="w-1/2 h-0.5 bg-amber-400/20"></div>
              </div>
            </div>
            
            {/* Enhanced shadow for 3D effect */}
            <div className={`absolute inset-0 bg-black/10 rounded-2xl transform transition-transform duration-200 -z-10 ${
              note.isDragging 
                ? 'translate-x-3 translate-y-3 blur-sm' 
                : 'translate-x-1 translate-y-1 group-hover:translate-x-2 group-hover:translate-y-2'
            }`}></div>
            
            {/* Easter egg wink on one note */}
            {note.id === 0 && (
              <div className="absolute top-2 right-2 w-2 h-2 bg-accent/60 rounded-full animate-ping"></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AnimatedStickyNotes;