function createSlug(texto: string): string {
  // Remover acentos e caracteres especiais
  // biome-ignore lint/suspicious/noMisleadingCharacterClass: <explanation>
  let textoNomalize = texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  // Converter para minúsculas
  textoNomalize = textoNomalize.toLowerCase()

  // Remover caracteres não alfanuméricos (exceto espaços)
  textoNomalize = textoNomalize.replace(/[^a-z0-9\s-]/g, '')

  // Substituir espaços por hífens
  textoNomalize = textoNomalize.replace(/\s+/g, '-')

  // Remover hífens duplicados
  textoNomalize = textoNomalize.replace(/-+/g, '-')

  // Remover hífen no início ou no final, se houver
  textoNomalize = textoNomalize.replace(/^-+|-+$/g, '')

  return textoNomalize
}
