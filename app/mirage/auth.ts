import { faker } from "@faker-js/faker"
import { Response, Server } from "miragejs"

function maybeGenerateField(generatorFunction: () => {}, probability = 1) {
  return Math.random() < probability ? generatorFunction() : null
}

export function authRouter(this: Server): void {
  this.post("/auth/login", (_schema, request) => {
    const { email, password } = JSON.parse(request.requestBody)

    if (email === "demo@demo.com" && password === "123456") {
      return new Response(401, {}, { error: "Invalid credentials" })
    }

    return {
      token: "::demo-token::",
      user: {
        name: faker.person.fullName(),
        email,
        type: "Patient",
      },
    }
  })

  this.post("/auth/register", () => {
    return {
      user: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        document: maybeGenerateField(() =>
          faker.helpers.arrayElement(["66379588086", "99024172055", "65769040025", "90934459010"]),
        ),
        phone: faker.random.numeric(11),
        birthdate: maybeGenerateField(() => faker.date.past(20).toISOString().split("T")[0]),
        address: {
          zip_code: faker.address.zipCode(),
          street: faker.address.streetName(),
          number: faker.random.numeric(3),
          complement: faker.random.word(),
          district: faker.address.streetName(),
        },
        type: "Patient",
      },
      token: "::token::",
    }
  })

  this.post("/auth/forgot-password", () => {
    return {}
  })

  this.post("/auth/verify-code", (_schema, request) => {
    const { code } = JSON.parse(request.requestBody)
    console.log(code)

    if (code !== "123456") {
      return new Response(422, {}, { error: "Invalid code" })
    }

    return {
      match: true,
    }
  })

  this.post("/auth/reset-password", () => {
    return {}
  })
}
