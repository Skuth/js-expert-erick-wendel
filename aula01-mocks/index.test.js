const { rejects, deepStrictEqual } = require("assert")

const { error } = require("./src/constants")
const File = require("./src/file")

;(async () => {
  {
    const filePath = "./mocks/emptyFile-invalid.csv"
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }

  {
    const filePath = "./mocks/fourItems-invalid.csv"
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }

  {
    const filePath = "./mocks/invalid-header.csv"
    const rejection = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }

  {
    const filePath = "./mocks/threeItems-valid.csv"
    const result = await File.csvToJson(filePath)

    const expected = [
      {
        "name": "Erick Wendel",
        "id": 123,
        "profession": "Javascript Instructor",
        "birthDay": new Date().getFullYear() - 25
      },
      {
        "name": "Xuxa da Silva",
        "id": 321,
        "profession": "Javascript Specialist",
        "birthDay": new Date().getFullYear() - 80
      },
      {
        "name": "Joaozinho",
        "id": 231,
        "profession": "Java Developer",
        "birthDay": new Date().getFullYear() - 30
      }
    ]

    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
  }
})()