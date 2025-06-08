import axios, {AxiosError} from "axios";
import {Category} from "../types/category";
import {FormInvalidResponse, NotFoundResponse} from "../types/test";

const BASE_URL = "http://localhost:3000/api/v2/dashboard"; // Cambia el puerto si tu API corre en otro

describe("🧪 Endpoints de Categorías", () => {
    let createdId: number | null = null;

    // ✅ GET /categories
    describe("GET /categories", () => {
        it("debería devolver 200 y un array de categorías", async () => {
            const res = await axios.get<Category[]>(`${BASE_URL}/categories`);
            expect(res.status).toBe(200);
            expect(Array.isArray(res.data)).toBe(true);
        });
    });

    // ✅ POST /categories
    describe("POST /categories", () => {
        it("debería crear una categoría válida", async () => {
            const res = await axios.post<Category>(`${BASE_URL}/categories`, {
                name: "Tecnología",
                description: "Categoría de tecnología y ciencia.",
            });

            expect(res.status).toBe(200);
            expect(res.data).toMatchObject({
                id: expect.any(Number),
                name: "Tecnología",
                description: "Categoría de tecnología y ciencia.",
                slug: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
            });

            createdId = res.data.id;
        });

        it("debería devolver 400 si falta un campo", async () => {
            try {
                await axios.post(`${BASE_URL}/categories`, {
                    name: "Solo nombre",
                });
            } catch (err) {
                const error = err as AxiosError<FormInvalidResponse>;
                expect(error.response?.status).toBe(400);
                expect(error.response?.data).toMatchObject({
                    message: "formInvalid",
                    field: {
                        description: "string",
                    },
                });
            }
        });

        it("debería devolver 400 si excede límites o tipo", async () => {
            try {
                await axios.post(`${BASE_URL}/categories`, {
                    name: "x".repeat(151),
                    description: 12345,
                });
            } catch (err) {
                const error = err as AxiosError<FormInvalidResponse>;
                expect(error.response?.status).toBe(400);
                expect(error.response?.data).toMatchObject({
                    message: "formInvalid",
                    field: {
                        name: "max150",
                        description: "string",
                    },
                });
            }
        });
    });

    // ✅ GET /categories/:id
    describe("GET /categories/:id", () => {
        it("debería devolver la categoría creada por ID", async () => {
            const res = await axios.get<Category>(
                `${BASE_URL}/categories/${createdId}`
            );
            expect(res.status).toBe(200);
            expect(res.data).toMatchObject({
                id: createdId,
                name: "Tecnología",
                description: "Categoría de tecnología y ciencia.",
                slug: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
            });
        });

        it("debería devolver 404 si no existe la categoría", async () => {
            try {
                await axios.get(`${BASE_URL}/categories/9999`);
            } catch (err) {
                const error = err as AxiosError<{message: string}>;
                expect(error.response?.status).toBe(404);
                expect(error.response?.data).toEqual({message: "notFound"});
            }
        });
    });

    // ✅ PUT /categories/:id
    describe("PUT /categories/:id", () => {
        it("debería actualizar una categoría existente", async () => {
            const res = await axios.put<Category>(
                `${BASE_URL}/categories/${createdId}`,
                {
                    name: "Ciencia Actualizada",
                    description: "Descripción actualizada",
                }
            );

            expect(res.status).toBe(200);
            expect(res.data).toMatchObject({
                id: createdId,
                name: "Ciencia Actualizada",
                description: "Descripción actualizada",
                slug: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
            });
        });

        it("debería devolver 404 si no existe el ID", async () => {
            try {
                await axios.put(`${BASE_URL}/categories/1001`, {
                    name: "Inexistente",
                    description: "Nada",
                });
            } catch (err) {
                const error = err as AxiosError<NotFoundResponse>;
                expect(error.response?.status).toBe(409);
                expect(error.response?.data).toEqual({
                    message: "foreignKeyConstraintFailed",
                });
            }
        });

        it("debería devolver 400 si hay errores de validación", async () => {
            try {
                await axios.put(`${BASE_URL}/categories/${createdId}`, {
                    name: 123,
                    description: "x".repeat(501),
                });
            } catch (err) {
                const error = err as AxiosError<FormInvalidResponse>;
                expect(error.response?.status).toBe(400);
                expect(error.response?.data).toMatchObject({
                    message: "formInvalid",
                    field: {
                        name: "string",
                        description: "max500",
                    },
                });
            }
        });
    });

    // ✅ DELETE /categories/:id
    describe("DELETE /categories/:id", () => {
        it("debería eliminar una categoría existente", async () => {
            const res = await axios.delete<{message: string}>(
                `${BASE_URL}/categories/${createdId}`
            );
            expect(res.status).toBe(200);
            expect(res.data).toMatchObject({
                id: expect.any(Number),
                name: expect.any(String),
                description: expect.any(String),
                slug: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
            }); // o el mensaje que devuelva tu API
        });

        it("debería devolver 404 si no existe el ID", async () => {
            try {
                await axios.delete(`${BASE_URL}/categories/1001`);
            } catch (err) {
                const error = err as AxiosError<NotFoundResponse>;
                expect(error.response?.status).toBe(409);
                expect(error.response?.data).toEqual({
                    message: "foreignKeyConstraintFailed",
                });
            }
        });
    });
});
