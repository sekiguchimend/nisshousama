'use client';
import React, { useEffect, useRef, useState } from "react";

// --- Types ---
export type GanttTask = {
  id: string;
  title: string;
  start: string; // ISO string
  end: string; // ISO string
  color?: string; // tailwind color or HEX
};

// --- Sample Data ---
const sampleTasks: GanttTask[] = [
  {
    id: "1",
    title: "タスク A",
    start: new Date(new Date().setHours(9, 0, 0, 0)).toISOString(),
    end: new Date(new Date().setHours(11, 0, 0, 0)).toISOString(),
    color: "#60a5fa",
  },
  {
    id: "2",
    title: "タスク B",
    start: new Date(new Date().setHours(10, 30, 0, 0)).toISOString(),
    end: new Date(new Date().setHours(13, 0, 0, 0)).toISOString(),
    color: "#34d399",
  },
  {
    id: "3",
    title: "タスク C",
    start: new Date(new Date().setHours(14, 0, 0, 0)).toISOString(),
    end: new Date(new Date().setHours(16, 0, 0, 0)).toISOString(),
    color: "#f59e0b",
  },
];

type Props = {
  tasks?: GanttTask[];
  rangeStart: string; // ISO
  rangeEnd: string; // ISO
  onChange?: (updated: GanttTask[]) => void;
  height?: number; // px per row
};

// --- Helpers ---
const MS_PER_MIN = 60 * 1000;
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

function isoToMinutes(iso: string) {
  return Math.floor(new Date(iso).getTime() / MS_PER_MIN);
}
function minutesToIso(mins: number) {
  return new Date(mins * MS_PER_MIN).toISOString();
}

function snapToFive(mins: number) {
  return Math.round(mins / 5) * 5;
}

function formatHourLabel(minutes: number) {
  const d = new Date(minutes * MS_PER_MIN);
  const hh = String(d.getHours()).padStart(2, "0");
  return `${hh}:00`;
}

// --- Component ---
export default function GanttChart({
  tasks: initialTasks = sampleTasks, // デフォルトでサンプル表示
  rangeStart = new Date(new Date().setHours(8, 0, 0, 0)).toISOString(),
  rangeEnd = new Date(new Date().setHours(18, 0, 0, 0)).toISOString(),
  onChange,
  height = 48,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(1000);
  const [tasks, setTasks] = useState<GanttTask[]>(initialTasks ?? []);
  const [active, setActive] = useState<{ id: string; mode: "drag" | "resize-left" | "resize-right" } | null>(null);

  useEffect(() => setTasks(initialTasks ?? []), [initialTasks]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setWidth(el.clientWidth);
    });
    ro.observe(el);
    setWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  const startM = isoToMinutes(rangeStart);
  const endM = isoToMinutes(rangeEnd);
  const totalMinutes = Math.max(1, endM - startM);
  const pxPerMin = width / totalMinutes;

  const minutesToX = (m: number) => (m - startM) * pxPerMin;

  const pointerState = useRef<{
    originX: number;
    taskId: string;
    initialStart: number;
    initialEnd: number;
    mode: "drag" | "resize-left" | "resize-right";
  } | null>(null);

  function beginPointer(e: React.PointerEvent, task: GanttTask, mode: "drag" | "resize-left" | "resize-right") {
    (e.target as Element).setPointerCapture(e.pointerId);
    const px = e.clientX - (containerRef.current?.getBoundingClientRect().left ?? 0);
    const initStart = isoToMinutes(task.start);
    const initEnd = isoToMinutes(task.end);
    pointerState.current = {
      originX: px,
      taskId: task.id,
      initialStart: initStart,
      initialEnd: initEnd,
      mode,
    };
    setActive({ id: task.id, mode });
  }

  /* function movePointer(e: PointerEvent) {
    if (!pointerState.current) return;
    const st = pointerState.current;
    const rectLeft = containerRef.current?.getBoundingClientRect().left ?? 0;
    const clientX = e.clientX - rectLeft;
    const dx = clientX - st.originX;
    const dM = dx / pxPerMin;

    setTasks((prev) => {
      if (!prev) return [];
      const idx = prev.findIndex((t) => t.id === st.taskId);
      if (idx === -1) return prev;
      const copy = [...prev];
      const cur = copy[idx];
      let newStart = st.initialStart;
      let newEnd = st.initialEnd;
      if (st.mode === "drag") {
        newStart = st.initialStart + dM;
        newEnd = st.initialEnd + dM;
        const dur = newEnd - newStart;
        if (newStart < startM) {
          newStart = startM;
          newEnd = newStart + dur;
        }
        if (newEnd > endM) {
          newEnd = endM;
          newStart = newEnd - dur;
        }
      } else if (st.mode === "resize-left") {
        newStart = st.initialStart + dM;
        newStart = clamp(newStart, startM, st.initialEnd - 5);
      } else {
        newEnd = st.initialEnd + dM;
        newEnd = clamp(newEnd, st.initialStart + 5, endM);
      }

      newStart = snapToFive(newStart);
      newEnd = snapToFive(newEnd);

      copy[idx] = { ...cur, start: minutesToIso(newStart), end: minutesToIso(newEnd) };
      return copy;
    });
  } */

  function endPointer() {
    if (!pointerState.current) return;
    pointerState.current = null;
    setActive(null);
    onChange?.(tasks ?? []);
  }

  useEffect(() => {
    // const onMove = (e: PointerEvent) => movePointer(e);
    const onUp = () => endPointer();
    // window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      // window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [pxPerMin, startM, endM, tasks]);

  const hourTicks: number[] = [];
  const startDate = new Date(startM * MS_PER_MIN);
  const firstHour = new Date(startDate);
  firstHour.setMinutes(0, 0, 0);
  if (firstHour.getTime() / MS_PER_MIN < startM) firstHour.setTime(firstHour.getTime() + 60 * MS_PER_MIN);
  for (let t = firstHour.getTime() / MS_PER_MIN; t <= endM; t += 60) hourTicks.push(t);

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-2">
        <div className="text-sm text-slate-600">Timeline</div>
        <div className="text-xs text-slate-500">表示単位: 1時間、調整スナップ: 5分</div>
      </div>

      <div ref={containerRef} className="w-full border rounded-lg overflow-hidden select-none">
        <div className="relative h-10 bg-white border-b">
          <div style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: 0 }}>
            {hourTicks.map((m) => {
              const x = minutesToX(m);
              return (
                <div key={m} style={{ position: "absolute", left: x }} className="-translate-x-1/2">
                  <div className="text-xs text-slate-600 font-medium">{formatHourLabel(m)}</div>
                  <div style={{ height: 6 }} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative" style={{ height: (tasks?.length ?? 0) * height }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}>
            {Array.from({ length: Math.ceil(totalMinutes / 30) }).map((_, i) => {
              const m = startM + i * 30;
              const x = minutesToX(m);
              return (
                <div key={i} style={{ position: "absolute", left: x, top: 0, bottom: 0, width: 1 }} className="opacity-10 bg-slate-300" />
              );
            })}
          </div>

          {tasks?.map((task, idx) => {
            const top = idx * height + 8;
            const startMin = isoToMinutes(task.start);
            const endMin = isoToMinutes(task.end);
            const left = minutesToX(startMin);
            const w = Math.max(8, (endMin - startMin) * pxPerMin);
            const bg = task.color ?? "#60a5fa";
            const isActive = active?.id === task.id;

            return (
              <div key={task.id} className="absolute" style={{ left: 0, top }}>
                <div className="absolute -left-36 w-32 text-sm text-slate-700">{task.title}</div>

                <div
                  className={`rounded-md shadow-md cursor-move ${isActive ? "ring-2 ring-offset-1" : ""}`}
                  style={{
                    position: "absolute",
                    left,
                    width: w,
                    height: 32,
                    background: bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 6px",
                    color: "white",
                    userSelect: "none",
                  }}
                  onPointerDown={(e) => beginPointer(e, task, "drag")}
                >
                  <div className="text-xs truncate" style={{ maxWidth: Math.max(50, w - 60) }}>
                    {task.title}
                  </div>

                  <div
                    onPointerDown={(e) => beginPointer(e, task, "resize-right")}
                    style={{ width: 10, height: "100%", cursor: "ew-resize", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <div className="w-1 h-8 rounded bg-white/80" />
                  </div>
                  <div
                    onPointerDown={(e) => beginPointer(e, task, "resize-left")}
                    style={{ position: "absolute", left: -8, top: 0, width: 16, height: "100%", cursor: "ew-resize" }}
                  />
                </div>

                <div className="absolute text-xs text-slate-600 mt-10" style={{ left }}>
                  {new Date(task.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - {new Date(task.end).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
