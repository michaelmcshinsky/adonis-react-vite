import vine from '@vinejs/vine'

export const createTodoValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(1).maxLength(200),
  })
)