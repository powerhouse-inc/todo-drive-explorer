/**
 * Factory methods for creating ToDoListDocument instances
 */
import type { PHAuthState, PHDocumentState, PHBaseState } from "document-model";
import { createBaseState, defaultBaseState } from "document-model";
import type {
  ToDoListDocument,
  ToDoListLocalState,
  ToDoListGlobalState,
  ToDoListPHState,
} from "./types.js";
import { createDocument } from "./utils.js";

export function defaultGlobalState(): ToDoListGlobalState {
  return {
    items: [],
    stats: {
      total: 0,
      checked: 0,
      unchecked: 0,
    },
  };
}

export function defaultLocalState(): ToDoListLocalState {
  return {};
}

export function defaultPHState(): ToDoListPHState {
  return {
    ...defaultBaseState(),
    global: defaultGlobalState(),
    local: defaultLocalState(),
  };
}

export function createGlobalState(
  state?: Partial<ToDoListGlobalState>,
): ToDoListGlobalState {
  return {
    ...defaultGlobalState(),
    ...(state || {}),
  } as ToDoListGlobalState;
}

export function createLocalState(
  state?: Partial<ToDoListLocalState>,
): ToDoListLocalState {
  return {
    ...defaultLocalState(),
    ...(state || {}),
  } as ToDoListLocalState;
}

export function createState(
  baseState?: Partial<PHBaseState>,
  globalState?: Partial<ToDoListGlobalState>,
  localState?: Partial<ToDoListLocalState>,
): ToDoListPHState {
  return {
    ...createBaseState(baseState?.auth, baseState?.document),
    global: createGlobalState(globalState),
    local: createLocalState(localState),
  };
}

/**
 * Creates a ToDoListDocument with custom global and local state
 * This properly handles the PHBaseState requirements while allowing
 * document-specific state to be set.
 */
export function createToDoListDocument(
  state?: Partial<{
    auth?: Partial<PHAuthState>;
    document?: Partial<PHDocumentState>;
    global?: Partial<ToDoListGlobalState>;
    local?: Partial<ToDoListLocalState>;
  }>,
): ToDoListDocument {
  const document = createDocument(
    state
      ? createState(
          createBaseState(state.auth, state.document),
          state.global,
          state.local,
        )
      : undefined,
  );

  return document;
}
