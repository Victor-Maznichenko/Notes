/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
require = require("esm")(module);
const { AVIABLE_COLORS } = require('./src/utils/constants.ts');

module.exports = () => {
    const data = {
        themes: [
            {
                id: 0,
                title: "Матан",
                aviableColors: AVIABLE_COLORS,
                activeColor: AVIABLE_COLORS[0]
            }
        ],
        notes: [
            {
                themeId: 0,
                id: 0,
                title: "Лекция 1",
                aviableColors: AVIABLE_COLORS,
                activeColor: AVIABLE_COLORS[0],
                textHTML: ""
            },
            {
                themeId: 0,
                id: 1,
                title: "Лекция 2",
                aviableColors: AVIABLE_COLORS,
                activeColor: AVIABLE_COLORS[1],
                textHTML: ""
            },
            {
                themeId: 0,
                id: 1,
                title: "Лекция 3",
                aviableColors: AVIABLE_COLORS,
                activeColor: AVIABLE_COLORS[1],
                textHTML: ""
            }
        ]
    }

    return data
}