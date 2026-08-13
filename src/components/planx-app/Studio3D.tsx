import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Suspense } from "react";
import type { FloorPlan } from "@/lib/planx/types";

/** Simple massing viewer generated from the 2D plan (preliminary volume study). */
export function Studio3D({
  plan,
  night,
  interior,
  showRoof,
}: {
  plan: FloorPlan;
  night: boolean;
  interior: boolean;
  showRoof: boolean;
}) {
  const floors = Math.max(1, new Set(plan.rooms.map((r) => r.floor)).size);
  const cx = plan.width / 2;
  const cz = plan.length / 2;

  return (
    <div className="h-[520px] w-full border border-border bg-secondary">
      <Canvas shadows camera={{ position: interior ? [0, 1.6, 0.1] : [plan.width * 1.4, plan.length * 0.9, plan.length * 1.5], fov: 50 }}>
        <Suspense fallback={null}>
          <color attach="background" args={[night ? "#101211" : "#e8e7e3"]} />
          <hemisphereLight intensity={night ? 0.15 : 0.7} />
          <directionalLight
            position={night ? [-8, 10, -6] : [12, 16, 8]}
            intensity={night ? 0.4 : 2}
            castShadow
          />
          {night && <pointLight position={[cx - cx, 2.4, cz - cz]} intensity={12} color="#ffd9a3" distance={18} />}
          <Environment preset={night ? "night" : "city"} />

          <group position={[-cx, 0, -cz]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[cx, 0, cz]} receiveShadow>
              <planeGeometry args={[plan.width * 2.4, plan.length * 2.4]} />
              <meshStandardMaterial color={night ? "#1b1d1c" : "#d8d6d0"} />
            </mesh>

            {plan.rooms.map((r) => (
              <mesh
                key={r.id}
                position={[r.x + r.w / 2, r.floor * 3 + 1.5, r.y + r.h / 2]}
                castShadow
                receiveShadow
              >
                <boxGeometry args={[r.w, 3, r.h]} />
                <meshStandardMaterial
                  color={r.type === "terrace" || r.type === "pool" ? "#8fa39b" : "#f2f0eb"}
                  transparent={interior}
                  opacity={interior ? 0.25 : 1}
                  roughness={0.7}
                  metalness={0.05}
                />
              </mesh>
            ))}

            {showRoof && (
              <mesh position={[plan.width / 2, floors * 3 + 0.15, plan.length / 2]} castShadow>
                <boxGeometry args={[plan.width + 0.8, 0.3, plan.length + 0.8]} />
                <meshStandardMaterial color="#4a4a4a" roughness={0.8} />
              </mesh>
            )}
          </group>

          <OrbitControls enablePan makeDefault target={[0, 1.5, 0]} />
        </Suspense>
      </Canvas>
    </div>
  );
}
