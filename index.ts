import { Manifest } from "document-model";
        import manifestJson from "./powerhouse.manifest.json" assert { type: "json" };
        import * as documentModelsExports from './document-models';
        import * as editorsExports from './editors';

        export const manifest: Manifest = manifestJson;
        export const documentModels = Object.values(documentModelsExports);
        export const editors = Object.values(editorsExports);
        