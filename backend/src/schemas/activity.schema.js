import { z } from 'zod'

export const createActivitySchema = z.object({
    methodology: z.string({
        required_error: 'Metodologia requerida'
    }),
    topic: z.string({
        required_error: 'Tema requerido'
    }),
    competence: z.string({
        required_error: 'Competencia requerida'
    }),
    tools: z.string().optional(),
    subject: z.string({
        required_error: 'Asignatura requerida'
    })
})