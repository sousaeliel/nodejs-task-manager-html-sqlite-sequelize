define({ "api": [
  {
    "type": " post ",
    "url": "/token",
    "title": "Gerar token de usuário",
    "group": "Autenticação",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>E-mail do usuário</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Senha do usuário</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Requisição",
          "content": "{\n    \"email\": \"usuario@usuario.com\",\n    \"password\": \"minha_senha\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token do usuário autenticado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\n    \"token\": \"abcd.efgh.ijklm.nopq.1234\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Erro de autenticação",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/tokens.js",
    "groupTitle": "Autenticação",
    "name": " post Token"
  },
  {
    "type": " get ",
    "url": "/",
    "title": "Obter status da api",
    "group": "Status",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>mensagem de status da API</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{ \n    \"status\": \"OK\" \n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/index.js",
    "groupTitle": "Status",
    "name": " get "
  },
  {
    "type": " delete ",
    "url": "/tasks/:id",
    "title": "Excluir tarefa do usuário",
    "group": "Tarefas",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token do usuário autenticado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{\n    \"Authorization\": \"Bearer abcd.efgh.ijklm.nopq.1234\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id da tarefa</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Erro ao excluir as tarefas",
          "content": "HTTP/1.1 412 Precondition Failed",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/tasks.js",
    "groupTitle": "Tarefas",
    "name": " delete TasksId"
  },
  {
    "type": " get ",
    "url": "/tasks",
    "title": "Listar tarefas do usuário",
    "group": "Tarefas",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token do usuário autenticado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{\n    \"Authorization\": \"Bearer abcd.efgh.ijklm.nopq.1234\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "tasks",
            "description": "<p>Lista de tarefas do usuário</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "tasks.id",
            "description": "<p>Id da tarefa</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tasks.title",
            "description": "<p>Título da tarefa</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "tasks.done",
            "description": "<p>Indica se a tarefa foi concluída</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "tasks.user_id",
            "description": "<p>Id do usuário</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "tasks.updated_at",
            "description": "<p>Data da última atualização da tarefa</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "tasks.created_at",
            "description": "<p>Data de criação da tarefa</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\n    \"tasks\": [{\n        \"id\": 1,\n        \"title\": \"Fazer algo\",\n        \"done\": false,\n        \"user_id\": 999,\n        \"updated_at\": \"2000-01-01T00:00:00.0000Z\",\n        \"created_at\": \"2000-01-01T00:00:00.0000Z\"\n    }]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Erro ao consultar as tarefas",
          "content": "HTTP/1.1 412 Precondition Failed",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/tasks.js",
    "groupTitle": "Tarefas",
    "name": " get Tasks"
  },
  {
    "type": " get ",
    "url": "/tasks/:id",
    "title": "Obter tarefa do usuário",
    "group": "Tarefas",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token do usuário autenticado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{\n    \"Authorization\": \"Bearer abcd.efgh.ijklm.nopq.1234\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id da tarefa</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id da tarefa</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Título da tarefa</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "done",
            "description": "<p>Indica se a tarefa foi concluída</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>Id do usuário</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updated_at",
            "description": "<p>Data da última atualização da tarefa</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "created_at",
            "description": "<p>Data de criação da tarefa</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\n    \"id\": 1,\n    \"title\": \"Fazer algo\",\n    \"done\": false,\n    \"user_id\": 999,\n    \"updated_at\": \"2000-01-01T00:00:00.0000Z\",\n    \"created_at\": \"2000-01-01T00:00:00.0000Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Tarefa não existe",
          "content": "HTTP/1.1 404 Not Found",
          "type": "json"
        },
        {
          "title": "Erro ao consultar as tarefas",
          "content": "HTTP/1.1 412 Precondition Failed",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/tasks.js",
    "groupTitle": "Tarefas",
    "name": " get TasksId"
  },
  {
    "type": " post ",
    "url": "/tasks",
    "title": "Cadastrar nova tarefa",
    "group": "Tarefas",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token do usuário autenticado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{\n    \"Authorization\": \"Bearer abcd.efgh.ijklm.nopq.1234\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Título da tarefa</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "done",
            "description": "<p>Indica se a tarefa foi concluída</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Requisição",
          "content": "{\n    \"title\": \"Fazer algo\",\n    \"done\": false\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id da tarefa</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Título da tarefa</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "done",
            "description": "<p>Indica se a tarefa foi concluída</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>Id do usuário</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updated_at",
            "description": "<p>Data da última atualização da tarefa</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "created_at",
            "description": "<p>Data de criação da tarefa</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\n    \"id\": 1,\n    \"title\": \"Fazer algo\",\n    \"done\": false,\n    \"user_id\": 999,\n    \"updated_at\": \"2000-01-01T00:00:00.0000Z\",\n    \"created_at\": \"2000-01-01T00:00:00.0000Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Erro ao criar a tarefa",
          "content": "HTTP/1.1 412 Precondition Failed",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/tasks.js",
    "groupTitle": "Tarefas",
    "name": " post Tasks"
  },
  {
    "type": " put ",
    "url": "/tasks/:id",
    "title": "Alterar tarefa do usuário",
    "group": "Tarefas",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token do usuário autenticado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{\n    \"Authorization\": \"Bearer abcd.efgh.ijklm.nopq.1234\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id da tarefa</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Título da tarefa</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "done",
            "description": "<p>Indica se a tarefa foi concluída</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Requisição",
          "content": "{\n    \"title\": \"Fazer algo\",\n    \"done\": true\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Erro ao alterar as tarefas",
          "content": "HTTP/1.1 412 Precondition Failed",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/tasks.js",
    "groupTitle": "Tarefas",
    "name": " put TasksId"
  },
  {
    "type": " delete ",
    "url": "/users",
    "title": "Excluir usuário autenticado",
    "group": "Usuários",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token do usuário autenticado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{\n    \"Authorization\": \"Bearer abcd.efgh.ijklm.nopq.1234\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Erro ao excluir o usuário",
          "content": "HTTP/1.1 412 Precondition Failed",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "Usuários",
    "name": " delete Users"
  },
  {
    "type": " get ",
    "url": "/users",
    "title": "Obter usuário autenticado",
    "group": "Usuários",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token do usuário autenticado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{\n    \"Authorization\": \"Bearer abcd.efgh.ijklm.nopq.1234\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id do usuário</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Nome do usuário</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>E-mail do usuário</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\n    \"id\": 1,\n    \"name\": \"Usuário\",\n    \"email\": \"usuario@usuario.com\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Erro ao consultar o usuário",
          "content": "HTTP/1.1 412 Precondition Failed",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "Usuários",
    "name": " get Users"
  },
  {
    "type": " post ",
    "url": "/users",
    "title": "Cadastrar novo usuário",
    "group": "Usuários",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Nome do usuário</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>E-mail do usuário</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Senha do usuário</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Requisição",
          "content": "{\n    \"name\": \"Usuário\",\n    \"email\": \"usuario@usuario.com\"\n    \"password\": \"minha_senha\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id do usuário</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Nome do usuário</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>E-mail do usuário</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updated_at",
            "description": "<p>Data da última atualização do usuário</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "created_at",
            "description": "<p>Data de criação do usuário</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\n    \"id\": 1,\n    \"name\": \"Usuário\",\n    \"email\": \"usuario@usuario.com\",\n    \"updated_at\": \"2000-01-01T00:00:00.0000Z\",\n    \"created_at\": \"2000-01-01T00:00:00.0000Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Erro ao criar o usuário",
          "content": "HTTP/1.1 412 Precondition Failed",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "Usuários",
    "name": " post Users"
  }
] });
