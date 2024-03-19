import { ptBR } from "./pt-br";

export const languages = {
  ptBR
}

export type Languages = keyof typeof languages
export type Language = typeof languages[Languages]
export type Key = keyof Language

export const translate = (key: Key, lang: Languages) => {
  return languages[lang][key.toLowerCase() as Key]
}