import locales from '../content/locales/ru.json'
import { Metadata } from '@google-cloud/common'
import { v2 } from '@google-cloud/translate'
import fs from 'fs'
import path from 'path'

console.log(`>> Hello`)

//
// const currentLanguage = 'ru'
// const keys = Object.keys(locales)
// // @ts-ignore
// const localeStrings = keys.map((key) => locales[key] as string)
// // const languages = ['en'] as const
// const languages = ['en', 'de', 'fr'] as const
// const results = languages.reduce((result, language) => {
//     result[language] = {}
//     return result
// }, {} as Record<typeof languages[number], Record<string, string>>)
//
// const translate = new v2.Translate()
//
// async function translateText() {
//     try {
//         await Promise.all(
//             languages.map(async (language) => {
//                 const [strings] = (await translate.translate(localeStrings, {
//                     from: currentLanguage,
//                     to: language,
//                 })) as [string[], Metadata]
//                 // console.log(`>> get ${JSON.stringify(strings, null, 4)}`)
//                 strings.reduce((result, locale, index) => {
//                     // console.log(`       ${keys[index]} > ${locale}`)
//                     result[keys[index]] = locale
//                     return result
//                 }, results[language])
//             }),
//         )
//     } catch (error) {
//         console.error('>> error', error)
//     }
//     console.log(results)
//
//     await Promise.all(
//         languages.map(async (language) => {
//             const localesPathname = path.join(
//                 __dirname,
//                 '..',
//                 'content',
//                 'locales',
//                 `${language}.json`,
//             )
//
//             // save result data into file
//             await fs.promises.mkdir(path.dirname(localesPathname), { recursive: true })
//             fs.writeFileSync(localesPathname, JSON.stringify(results[language], null, 4))
//         }),
//     )
// }
//
// translateText()
