// config/users.swagger.js
const userSwagger = {
  "/api/users": {
    get: {
      summary: "Obtiene todos los usuarios",
      tags: ["Usuarios"],
      responses: {
        200: {
          description: "Lista de usuarios"
        }
      }
    },
    post: {
      summary: "Crea un nuevo usuario",
      tags: ["Usuarios"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["nickName"],
              properties: {
                nickName: { type: "string", example: "juan123" }
              }
            }
          }
        }
      },
      responses: {
        201: {
          description: "Usuario creado exitosamente",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: { type: "integer", example: 1 },
                  nickName: { type: "string", example: "juan123" }
                }
              }
            }
          }
        },
        400: { description: "Error de validación o nickName duplicado" },
        500: { description: "Error interno del servidor" }
      }
    }
  },
  "/api/users/{id}": {
    get: {
      summary: "Obtiene un usuario por ID",
      tags: ["Usuarios"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "integer" },
          description: "ID del usuario a obtener"
        }
      ],
      responses: {
        200: { description: "Información del usuario" },
        404: { description: "Usuario no encontrado" }
      }
    },
    put: {
      summary: "Actualiza un usuario por ID",
      tags: ["Usuarios"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "integer", example: 1 },
          description: "ID del usuario a actualizar"
        }
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["nickName"],
              properties: { nickName: { type: "string", example: "nuevoNick" } }
            }
          }
        }
      },
      responses: {
        200: { description: "Usuario actualizado exitosamente" },
        400: { description: "nickName duplicado o inválido" },
        404: { description: "Usuario no encontrado" },
        500: { description: "Error interno del servidor" }
      }
    },
      delete: {
      summary: "Elimina un usuario por ID",
      tags: ["Usuarios"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "integer" },
          description: "ID del usuario a eliminar",
        },
      ],
      responses: {
        200: {
          description: "Usuario eliminado exitosamente",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Usuario eliminado",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Usuario no encontrado",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    example: "Usuario no encontrado",
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Error interno del servidor",
        },
      },
    },
  },
  "/api/users/{id}/follow": {
    post: {
      summary: "Hace que un usuario siga a otro",
      tags: ["Usuarios"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "integer",
          },
          description: "ID del usuario que va a realizar la acción de seguir (follower).",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["followedId"],
              properties: {
                followedId: {
                  type: "integer",
                  description: "ID del usuario que va a ser seguido (followed).",
                  example: 2,
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "El usuario ahora sigue al otro usuario exitosamente.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Usuario seguido",
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Solicitud inválida, no puede seguir a uno mismo.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    example: "No puedes seguirte a ti mismo",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "No se encontró al usuario seguidor o al seguido.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    example: "Usuario seguidor no encontrado",
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Error interno del servidor.",
        },
      },
    },
  },
  "/api/users/{id}/unfollow/{followedId}": {
    delete: {
      summary: "Deja de seguir a un usuario",
      tags: ["Usuarios"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "integer",
          },
          description: "ID del usuario que deja de seguir (follower).",
        },
        {
          in: "path",
          name: "followedId",
          required: true,
          schema: {
            type: "integer",
          },
          description: "ID del usuario que será dejado de seguir (followed).",
        },
      ],
      responses: {
        200: {
          description: "Usuario dejado de seguir exitosamente.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Usuario dejado de seguir",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "No se encontró al usuario seguidor o al seguido.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    example: "Usuario seguidor no encontrado",
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Error interno del servidor.",
        },
      },
    },
  },
};

module.exports = userSwagger;