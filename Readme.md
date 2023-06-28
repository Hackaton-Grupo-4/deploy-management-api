1. Instalar dependencias
```
 npm i
```
2. Criar arquivo local.env na raiz com o conteúdo
```
DATABASE_URL=mysql://root:rootpassword@mysql:3306/deploymanagement
ACCESS_TOKEN='Bearer X'
  ```
  - Alterar o "X" por um token valido
3. Iniciar o projeto
```
 npm run dev
```

4. Execute o seguinte comando para atualizar a cada alteração: 
```
npm run watch
```