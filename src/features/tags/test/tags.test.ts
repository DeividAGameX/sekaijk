import axios, {AxiosError} from "axios";
import {FormInvalidResponse} from "@/features/tags/types/test";
import {Tag} from "@/features/tags/types/tag";

const BASE_URL = "http://localhost:3000/api/v2/dashboard/";

describe("🧪 Endpoints de Etiquetas (Tags)", () => {
    let createdId: number | null = null;
    // ✅ GET /tags
    describe("GET /tags", () => {
        it("debería devolver 200 y un array de etiquetas", async () => {
            const res = await axios.get<Tag[]>(`${BASE_URL}/tags`);
            expect(res.status).toBe(200);
            expect(Array.isArray(res.data)).toBe(true);
        });
    });

    // ✅ POST /tags
    describe("POST /tags", () => {
        it("debería crear una etiqueta válida", async () => {
            const res = await axios.post<Tag>(`${BASE_URL}/tags`, {
                name: "Retro",
                color: "#ff9900",
                description: "Etiqueta para cosas retro",
            });

            expect(res.status).toBe(200);
            expect(res.data).toMatchObject({
                id: expect.any(Number),
                name: "Retro",
                color: "#ff9900",
                description: "Etiqueta para cosas retro",
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
            });

            createdId = res.data.id;
        });

        it("debería devolver 400 si falta un campo", async () => {
            try {
                await axios.post(`${BASE_URL}/tags`, {
                    name: "Falta color y descripción",
                });
            } catch (err) {
                const error = err as AxiosError<FormInvalidResponse>;
                expect(error.response?.status).toBe(400);
                expect(error.response?.data.message).toBe("formInvalid");
                expect(error.response?.data.field).toMatchObject({
                    color: "string",
                    description: "string",
                });
            }
        });

        it("debería devolver 400 por errores de tipo y formato", async () => {
            try {
                await axios.post(`${BASE_URL}/tags`, {
                    name: "x".repeat(151),
                    color: "azulito", // color inválido
                    description: 123, // tipo inválido
                });
            } catch (err) {
                const error = err as AxiosError<FormInvalidResponse>;
                expect(error.response?.status).toBe(400);
                expect(error.response?.data.field).toMatchObject({
                    name: "max150",
                    color: "invalidColor",
                    description: "string",
                });
            }
        });
    });

    // ✅ GET /tags/:id
    describe("GET /tags/:id", () => {
        it("debería devolver la etiqueta creada", async () => {
            const res = await axios.get<Tag>(`${BASE_URL}/tags/${createdId}`);
            expect(res.status).toBe(200);
            expect(res.data.id).toBe(createdId);
        });

        it("debería devolver 404 si no existe", async () => {
            try {
                await axios.get(`${BASE_URL}/tags/9999`);
            } catch (err) {
                const error = err as AxiosError<{message: string}>;
                expect(error.response?.status).toBe(404);
                expect(error.response?.data.message).toBe("notFound");
            }
        });
    });

    // ✅ PUT /tags/:id
    describe("PUT /tags/:id", () => {
        it("debería actualizar la etiqueta correctamente", async () => {
            const res = await axios.put<Tag>(`${BASE_URL}/tags/${createdId}`, {
                name: "Retro Actualizado",
                color: "#00ffcc",
                description: "Etiqueta actualizada",
            });

            expect(res.status).toBe(200);
            expect(res.data.name).toBe("Retro Actualizado");
        });

        it("debería devolver 409 si el ID no existe", async () => {
            try {
                await axios.put(`${BASE_URL}/tags/9999`, {
                    name: "Nada",
                    color: "#123456",
                    description: "No existe",
                });
            } catch (err) {
                const error = err as AxiosError<{message: string}>;
                expect(error.response?.status).toBe(409);
                expect(error.response?.data.message).toBe(
                    "foreignKeyConstraintFailed"
                );
            }
        });

        it("debería devolver 400 por errores de validación", async () => {
            try {
                await axios.put(`${BASE_URL}/tags/${createdId}`, {
                    name: 123,
                    color: "not-a-color",
                    description: "x".repeat(501),
                });
            } catch (err) {
                const error = err as AxiosError<FormInvalidResponse>;
                expect(error.response?.status).toBe(400);
                expect(error.response?.data.field).toMatchObject({
                    name: "string",
                    color: "invalidColor",
                    description: "max500",
                });
            }
        });
    });

    // ✅ DELETE /tags/:id
    describe("DELETE /tags/:id", () => {
        it("debería eliminar la etiqueta creada", async () => {
            const res = await axios.delete<{message: string}>(
                `${BASE_URL}/tags/${createdId}`
            );
            expect(res.status).toBe(200);
            expect(res.data).toEqual({
                id: expect.any(Number),
                name: expect.any(String),
                color: expect.any(String),
                description: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
            });
        });

        it("debería devolver 409 si el ID no existe", async () => {
            try {
                await axios.delete(`${BASE_URL}/tags/9999`);
            } catch (err) {
                const error = err as AxiosError<{message: string}>;
                expect(error.response?.status).toBe(409);
                expect(error.response?.data.message).toBe("foreignKeyConstraintFailed");
            }
        });
    });
});
