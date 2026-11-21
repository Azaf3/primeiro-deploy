import type { Lesson, Module } from './types'
import { fundamentos } from './m1-fundamentos'
import { ia } from './m2-ia'
import { projeto } from './m3-projeto'
import { js } from './m4-js'
import { guiado } from './m5-guiado'

/** Todos os módulos, com todas as aulas (inclusive as condicionais) */
export const modules: Module[] = [fundamentos, ia, projeto, js, guiado]

export type FlatLesson = Lesson & { moduleId: string; moduleTitle: string; index: number }

export type Track = { modules: Module[]; lessons: FlatLesson[] }

function flatten(mods: Module[]): FlatLesson[] {
  return mods
    .flatMap((m) => m.lessons.map((l) => ({ ...l, moduleId: m.id, moduleTitle: m.title, index: 0 })))
    .map((l, i) => ({ ...l, index: i }))
}

/** Trilha de um usuário: inclui a aula de GitHub só pra quem ainda não tem conta */
export function buildTrack(withoutGithub: boolean): Track {
  const mods = modules
    .map((m) => ({ ...m, lessons: m.lessons.filter((l) => !l.onlyWithoutGithub || withoutGithub) }))
    .filter((m) => m.lessons.length > 0)
  return { modules: mods, lessons: flatten(mods) }
}

/** Todas as aulas existentes (usado em validações) */
export const allLessons: FlatLesson[] = flatten(modules)

/** Trilha padrão, sem aulas condicionais (usada na página inicial) */
export const baseTrack = buildTrack(false)

/** ids de quiz/exercício que precisam passar pra concluir a aula */
export function requiredChecks(lesson: Lesson): string[] {
  return lesson.blocks.flatMap((b) => (b.type === 'quiz' || b.type === 'exercise' ? [b.id] : []))
}
