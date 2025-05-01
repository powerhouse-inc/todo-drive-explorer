## Notes

This guide assumes you already have `pnpm` installed in your environment.

## Prerequisites

- Install `ph-cmd` globally:

  ```bash
  pnpm install -g ph-cmd@staging
  ```

- Ensure you have an updated global project set up:

  - If you have an old `.ph` folder in your home directory, remove it:

    ```bash
    rm -rf .ph
    ```

    (If you don’t have it, you can skip this step.)

  - Create a new global project:

    ```bash
    ph setup-globals
    ph use staging
    ```

    This will create a default global project and set it to use staging dependencies.

## Create a New Todo Project

- Initialize a new project:

  ```bash
  ph init my-todo-project --staging
  ```

- Copy the todo model ZIP file to the root of the project directory.

- Generate the reducers:

  ```bash
  ph generate todo.phdm.zip
  ```

- Copy and paste the generated reducers code into your project.

- Generate a document editor:

  ```bash
  ph generate --editor ToDoList --document-types powerhouse/todo
  ```

- Copy and paste the document editor code.

- Generate the drive explorer:

  ```bash
  ph generate --drive-editor todo-drive-explorer
  ```

- Copy and paste the drive editor code.

- Update the `powerhouse.manifest.json` file by adding the app info.

- Run connect:

  ```bash
  ph connect
  ```

## Test Subgraphs

- Start the reactor:

  ```bash
  ph reactor
  ```

- Open the GraphQL editor in your browser:

  ```
  http://localhost:4001/graphql
  ```

- Create a todo document in the `powerhouse` drive using the `ToDo_createDocument` mutation.
  ![ToDo_createDocument](https://i.ibb.co/GQTZr7Wk/Screenshot-2025-05-01-at-1-22-23-PM.png)

- Get the document state using the `GetDocument` query.
  ![GetDocument](https://i.ibb.co/v47cj4Q4/Screenshot-2025-05-01-at-1-22-41-PM.png)

- In a different terminal, start connect:

  ```bash
  ph connect
  ```

- Open Connect and add the `powerhouse` drive:

  ```
  http://localhost:4001/d/powerhouse
  ```

- You should see the todo document created earlier.

- Edit the todo document with the document editor and add a few tasks.

- Go back to the GraphQL explorer and use the `GetDocument` query again — you should see the updated state.

## Publish the Package to npm

- Commit your changes:

  ```bash
  git add -A
  git commit -m "commit message"
  ```

- Publish to npm:

  ```bash
  pnpm publish
  ```

Your package should now be published under your npm account.

## Test the Published Package

- Initialize a new project for testing:

  ```bash
  ph init test-pkg-install --staging
  ```

- Inside the new project, install your published package:

  ```bash
  ph install my-package-name
  ```

- Run connect:

  ```bash
  ph connect
  ```

You should see Connect running with the todo document available alongside the drive app.

## Run the Example on an EC2 Instance

- Follow the same prerequisites on the EC2 instance (see **Prerequisites** section).

- Initialize a new project:

  ```bash
  ph init test-pkg-install --staging
  ```

- Inside the new project, install your published package:

  ```bash
  ph install my-package-name
  ```

- Run connect with HTTPS and a custom port:

  ```bash
  ph connect --port 8442 --https
  ```

- Access the EC2 instance in your browser, adding the port at the end of the URL:

  ```
  https://my-ec2-instance:8442
  ```

You should see Connect running with the todo document available along with the todo drive explorer.
