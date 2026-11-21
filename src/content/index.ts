import type { Lesson, Module } from './types'
import { fundamentos } from './m1-fundamentos'
import { ia } from './m2-ia'
import { projeto } from './m3-projeto'
import { js } from './m4-js'
import { guiado } from './m5-guiado'

export const modules: Module[] = [fundamentos, ia, projeto, js, guiado]

export type FlatLesson = Lesson & { moduleId: string; moduleTitle: string; index: number }

export const allLessons: FlatLesson[] = modules.flatMap((m) =>
  m.lessons.map((l) => ({ ...l, moduleId: m.id, moduleTitle: m.title, index: 0 })),
).map((l, i) => ({ ...l, index: i }))

export function findLesson(id: string) {
  return allLessons.find((l) => l.id === id)
}

/** ids de quiz/exercício que precisam passar pra concluir a aula */
export function requiredChecks(lesson: Lesson): string[] {
  return lesson.blocks.flatMap((b) => (b.type === 'quiz' || b.type === 'exercise' ? [b.id] : []))
}
